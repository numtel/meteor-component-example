# Meteor Component Example

This example recreates the default Meteor "Hello" counter except with the templates loaded on-demand using `iron:router` and ES6.

## Explanation

Meteor provides a great system for building templates with Blaze and Spacebars but large applications suffer because every template is loaded with the initial page load.

Instead of loading all templates on initial page load, it is possible to load templates as-needed using `iron:router` with a few supporting packages.

By placing the Spacebars HTML code inside of the Javascript using the new [`Template.fromString()` method](https://github.com/numtel/meteor-template-from-string), your template becomes more componentized because it no longer relies on an extra `.html` file.

Javascript, until ES6, is unable to accept pre-formatted multi-line strings. With the polyfill provided by [6to5](http://6to5.org), this is no longer a limitation. ECMAScript 6 allows multi-line template strings to be specified using back-ticks.

`6to5` can be used with Meteor using the [`sharlon:6to5` package](https://github.com/sbalbalosa/meteor-6to5) for standard application source files and using the [`numtel:es6-proxy` package](https://github.com/numtel/meteor-es6-proxy) for source files loaded over AJAX.

By combining these techniques with the [`manuelschoebel:wait-on-lib` package](https://github.com/DerMambo/wait-on-lib), templates can be loaded "on-demand" when the browser route changes.

## View Source

Specify your routes with the components loaded using the `IRLibLoader` from `manuelschoebel:wait-on-lib`.

From [`client/main.js`](client/main.js):
```javascript
Router.route('/', function () {
  this.render('hello');
}, {
  waitOn: function(){
    return [ IRLibLoader.load('_6to5?path=hello.es6') ];
  }
});
```

Start the `es6-proxy` in [`server/main.js`](server/main.js):
```javascript
Router.plugin('es6Proxy', { path: 'components', debug: true });
```

Create a template in the `private/components` directory.

From [`private/components/hello.es6`](private/components/hello.es6):
```javascript
// counter starts at 0
Session.setDefault("counter", 0);

Template.hello = Template.fromString(`
  <button>Click Me</button>
  <p>You've pressed the button {{counter}} times.</p>
`);

Template.hello.helpers({
  counter: function () {
    return Session.get("counter");
  }
});

Template.hello.events({
  'click button': function () {
    // increment the counter when button is clicked
    Session.set("counter", Session.get("counter") + 1);
  }
});
```

## Packages Used

* [`iron:router`](https://github.com/EventedMind/iron-router) - Standard routing package
* [`manuelschoebel:wait-on-lib`](https://github.com/DerMambo/wait-on-lib) - Load Javascript resources on specific routes
* [`numtel:es6-proxy`](https://github.com/numtel/meteor-es6-proxy) - `iron:router` plugin for sending transpiled ES6 -> ES5 source to the client
* [`numtel:template-from-string`](https://github.com/numtel/meteor-template-from-string) - Create Blaze templates from a string of Spacebars HTML

## Installation

```bash
# Install Meteor
$ curl https://install.meteor.com/ | sh
# Clone Repo
$ git clone https://github.com/numtel/meteor-component-example.git
$ cd meteor-component-example
# Start Meteor
$ meteor
```

## License

[Unlicense](http://unlicense.org/)
