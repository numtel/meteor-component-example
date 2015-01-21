
Router.route('/', function () {
  this.render('hello');
}, {
  controller: 'PreloadController',
  preload: {
    styles: 'hello.css',
    sync: 'hello.js'
  }
});

