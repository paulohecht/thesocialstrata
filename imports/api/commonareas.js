import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Buildings } from './buildings';

export const CommonAreas = new Mongo.Collection('commonareas');
export const CommonAreasSchedules = new Mongo.Collection('commonareas_schedules');

if (Meteor.isServer) {
  Meteor.publish("commonareas", function() {
    if (!this.userId) return null;
    let user = Meteor.users.findOne(this.userId);
    return CommonAreas.find({buildingId: user.buildingId, status: "open"});
  });
  Meteor.publish("commonareas.details", function(commonareaId) {
    if (!this.userId) return null;
    let user = Meteor.users.findOne(this.userId);
    return [
      CommonAreas.find(commonareaId),
      CommonAreasSchedules.find({commonareaId: commonareaId, status: "open"}),
      Meteor.users.find({buildingId: user.buildingId}),
    ];
  });
}

Meteor.methods({
  'commonareas.create'(name) {
    check(name, String);
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    const user = Meteor.users.findOne(this.userId);
    const building = Buildings.findOne(user.buildingId);
    if (this.userId != building.landlordId) {
      throw new Meteor.Error('not-landlord');
    }
    CommonAreas.insert({
      name: name,
      status: "open",
      createdAt: new Date(),
      buildingId: user.buildingId,
      userId: this.userId
    });
  },
  'commonareas.delete'(commonareaId) {
    check(commonareaId, String);
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    const user = Meteor.users.findOne(this.userId);
    const building = Buildings.findOne(user.buildingId);
    if (this.userId != building.landlordId) {
      throw new Meteor.Error('not-landlord');
    }
    CommonAreas.update({
      _id: commonareaId,
      buildingId: user.buildingId
    }, {
      $set: {
        status: "closed",
      }
    });
  },
  'commonareas.book'(commonareaId, date) {
    check(commonareaId, String);
    check(date, String);
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    const user = Meteor.users.findOne(this.userId);

    CommonAreasSchedules.insert({
      date: date,
      status: "open",
      createdAt: new Date(),
      commonareaId: commonareaId,
      buildingId: user.buildingId,
      userId: this.userId
    });
  },
  'commonareas.cancelschedule'(commonareaScheduleId) {
    // check(message, String);
    // if (!this.userId) {
    //   throw new Meteor.Error('not-authorized');
    // }
    // const user = Meteor.users.findOne(this.userId);
    // CommonAreas.insert({
    //   message: message,
    //   status: "open",
    //   createdAt: new Date(),
    //   buildingId: user.buildingId,
    //   userId: this.userId
    // });
  },
});
