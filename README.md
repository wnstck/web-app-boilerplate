# Web Application Boilerplate

### Stack

+ Tools
	+ [Grunt](http://gruntjs.com/) for task running
	+ [Browserify](http://browserify.org/) for js modularity with dependencies
	+ [Mocha](https://mochajs.org/) for tests
	+ [Bower](http://bower.io/) for package management
+ JS
	+ [Backbone](http://backbonejs.org/) for app structure
	+ [Marionette](http://marionettejs.com/) for adding power to Backbone
+ CSS
	+ [SASS](http://sass-lang.com/)
	+ [Bitters](http://bitters.bourbon.io/) for base styles 
	+ [Bourbon](http://bourbon.io/) for mixin library
	+ [Neat](http://neat.bourbon.io/) for grids
	+ [Font Awesome](https://fortawesome.github.io/Font-Awesome/) for icons

### Install

+ Install [node & npm](http://nodejs.org/download/)
+ `$ sudo npm install -g grunt-cli` for global install of [Grunt](http://gruntjs.com/getting-started)
+ `$ sudo npm install -g bower` for global install of [Bower](http://bower.io/)
+ `$ ruby -v` to make sure you have Ruby installed. If not, figure out how to install Ruby.
+ `$ sudo gem install sass` to install [SASS](http://sass-lang.com/)
+ `$ git clone git@github.com:wnstck/web-app-boilerplate.git` if you haven't already
+ `$ cd web-app-boilerplate/`
+ `$ npm install` to download node dependencies to `node_modules/` (might take a while)
+ `$ bower install` to download dependencies to `bower_components/`

### Build for Development

+ `$ grunt`
+ Open `localhost:8000` in browser to view
+ Compiles to `public/`
+ Watcher tasks will listen to changes in `styles/` and `app/` and automatically recompile to `public/`
+ `ctrl+c` in the console will stop tasks

### Build for Production

+ Update version in `package.json` (if needed). This version number will automatically append to dist build css and js files.
+ `$ grunt dist`
+ Open `localhost:8000` in browser to view
+ Compiles to `public/`

### Run Tests

BDD tests with [Mocha](https://mochajs.org/)

+ `$ grunt test`

### Static Code Analysis

`$ grunt jshint` will run a JSHint on all application code.

`$ grunt` and `$ grunt dist` have JSHint included in the task runner pipeline.

### Build Tools

_TODO_
