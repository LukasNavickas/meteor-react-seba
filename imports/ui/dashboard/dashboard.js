import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Events } from '../../api/events.js';

import './dashboard.html';

Template.dashboard.helpers({
  'myevents': function () {
    return Events.find({owner:Meteor.userId()});
  }
})