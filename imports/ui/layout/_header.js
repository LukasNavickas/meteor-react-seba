import './_header.html';
  
  Template._header.events({
  'click .create-event'(e) {
    Session.set('isCreateEvent', true);
  }
  
});