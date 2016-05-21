import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Events } from '../../api/events.js';

import './home.html';

Template.home.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const name = target.text.value;
 
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 
    Events.insert({
      name,
      createdAt: new Date(),
      owner: Meteor.userId()
    });
 
    // Clear form
    target.text.value = '';
  }
});