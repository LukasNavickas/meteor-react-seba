Router.route('/', function() {
  this.layout('appLayout');
  this.render('home');
});

Router.route('/dashboard', function() {
  this.layout('appLayout');
  this.render('dashboard');
});