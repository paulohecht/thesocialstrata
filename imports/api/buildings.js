import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Buildings = new Mongo.Collection('buildings');


if (Meteor.isServer) {
  Meteor.publish(null, function() {
    if (!this.userId) return null;
    let user = Meteor.users.findOne(this.userId);
    return [
      Buildings.find(user.buildingId),
      Meteor.users.find(this.userId, {fields: {buildingId: 1}})
    ];
  });

  Meteor.publish('buildings.byZip', function(zip) {
    if (!this.userId) return null;
    let user = Meteor.users.findOne(this.userId);
    return Buildings.find({zip: zip})
  });
}

Meteor.methods({
  'buildings.create'(name, zip) {
    check(name, String);
    check(zip, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const buildingId = Buildings.insert({
      name: name,
      zip: zip,
      createdAt: new Date(),
      landlordId: this.userId,
    });

    Meteor.users.update(this.userId, {
      $set: {
        buildingId: buildingId
      }
    })
  },

  'buildings.set'(buildingId) {
    check(buildingId, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Meteor.users.update(this.userId, {
      $set: {
        buildingId: buildingId
      }
    })
  },
});
