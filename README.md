# Meteor Component Example

This example recreates the default Meteor "Hello" counter except with the templates loaded on-demand using [`miro:preloader`](https://github.com/MiroHibler/meteor-preloader) and [`numtel:publicsources`](https://github.com/numtel/meteor-publicsources).

## Explanation

Meteor provides a great system for building templates with Blaze and Spacebars but large applications suffer because every template is loaded with the initial page load.

Instead of loading all templates on initial page load, it is possible to load templates as-needed using `iron:router` with a few supporting packages.

With `numtel:publicsources`, source files inside the `public` directory can be processed using the same packages that process all other source files.

See [`publicsources.json`](publicsources.json) for the configuration of the lazy-loaded bundle.

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
