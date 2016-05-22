import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Providers = new Mongo.Collection('providers');

if (Meteor.isServer) {
  // This code only runs on the server
}