import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Chats = new Mongo.Collection('chats');


if (Meteor.isServer) {
  Meteor.publish("chat.neighbors", function() {
    if (!this.userId) return null;
    let user = Meteor.users.findOne(this.userId);
    return Meteor.users.find({buildingId: user.buildingId});
  });

  Meteor.publish("chat.messages", function(userId) {
    if (!this.userId) return null;
    let user = Meteor.users.findOne(this.userId);
    return [
      Meteor.users.find(userId),
      Chats.find({$or: [
        {fromId: user._id, toId: userId},
        {fromId: userId, toId: user._id},
      ]})
    ]
  });
}

Meteor.methods({
  'chat.send'(toId, message) {
    check(toId, String);
    check(message, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const chatId = Chats.insert({
      fromId: this.userId,
      toId: toId,
      message: message,
      createdAt: new Date(),
    });
  },
});
