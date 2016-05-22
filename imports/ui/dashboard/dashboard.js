import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Events } from '../../api/events.js';

import './dashboard.html';


Template.dashboard.destroyed = function(){
        Session.set('isCreateEvent', false);
        //Session.set('playerWeapon', '');
    }

Template.dashboard.helpers({
  'myevents': function () {
    return Events.find({owner:Meteor.userId()});
  },
  isCreateEvent: function() { // USER WANTS TO CREATE NEW GAME
            var show = Session.get('isCreateEvent');
            if(show === true) {
                return true;
            } else {
                return false;
            }
        },
})



Template.dashboard.events({
  'submit .new-event'(event) {
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
    Session.set('isCreateEvent', false);
  },
  
});