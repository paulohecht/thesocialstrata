import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Buildings } from './buildings';

export const Maintenances = new Mongo.Collection('maintenances');

if (Meteor.isServer) {
  Meteor.publish("maintenances", function() {
    if (!this.userId) return null;
    let user = Meteor.users.findOne(this.userId);
    return Maintenances.find({buildingId: user.buildingId, status: "open"});
  });
}

Meteor.methods({
  'maintenances.request'(message) {
    check(message, String);
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    const user = Meteor.users.findOne(this.userId);
    Maintenances.insert({
      message: message,
      status: "open",
      createdAt: new Date(),
      buildingId: user.buildingId,
      userId: this.userId
    });
  },
  'maintenances.solve'(lostandfoundId) {
    check(lostandfoundId, String);
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    const user = Meteor.users.findOne(this.userId);
    const building = Buildings.findOne(user.buildingId);
    if (this.userId != building.landlordId) {
      throw new Meteor.Error('not-landlord');
    }
    Maintenances.update({
      _id: lostandfoundId,
      buildingId: user.buildingId
    }, {
      $set: {
        status: "closed",
      }
    });
  }
});
