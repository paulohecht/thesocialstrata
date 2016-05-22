import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const LostAndFounds = new Mongo.Collection('lostandfounds');

if (Meteor.isServer) {
  Meteor.publish("lostandfounds", function() {
    if (!this.userId) return null;
    let user = Meteor.users.findOne(this.userId);
    return LostAndFounds.find({buildingId: user.buildingId, status: "open"});
  });
}

Meteor.methods({
  'lostandfounds.report'(type, message) {
    check(type, String);
    check(message, String);
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    const user = Meteor.users.findOne(this.userId);
    LostAndFounds.insert({
      message: message,
      type: type,
      status: "open",
      createdAt: new Date(),
      buildingId: user.buildingId,
      userId: this.userId
    });
  },
  'lostandfounds.solve'(lostandfoundId) {
    check(lostandfoundId, String);
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    const user = Meteor.users.findOne(this.userId);
    LostAndFounds.update({
      _id: lostandfoundId,
      buildingId: user.buildingId
    }, {
      $set: {
        status: "closed",
      }
    });
  }
});
