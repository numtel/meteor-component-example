
Router.route('/', function () {
  this.render('hello');
}, {
  waitOn: function(){
    return [ IRLibLoader.load('_6to5?path=hello.es6') ];
  }
});

