import { Events } from '../../imports/api/events.js';

Router.route('/', function() {
  this.layout('appLayout');
  this.render('home');
});

Router.route('/dashboard', function() {
  this.layout('appLayout');
  this.render('dashboard');
});

Router.route('/register-provider', function() {
  this.layout('appLayout');
  this.render('addProvider');
});

Router.route('/event/:_id', function () {
  this.render('event', {
    data: function () {
      return Events.findOne({_id: this.params._id});
    }
  });
});