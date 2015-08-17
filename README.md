# Angular Js Mini Zork Game

A mini clone of ZORK game written in Angular Js.

### TODO:

* A couple of known bugs
* Unit test and end-to-end test coverage needs improving
* Improve styles
* Game data is very limited. It only has 3 locations defined. Needs improving.

### Prerequisites

You need git to clone the repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

This project uses a number of node.js tools to initialize and test. You must have node.js and
its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).

### Clone Project

Clone the repository using [git][git]:

```
cd /path/to/source
git init
git remote add origin https://bitbucket.org/yigiterol/angular-mini-zork.git
```

### Install Dependencies

There are two kinds of dependencies in this project: tools and angular framework code.  The tools help
manage and test the application.

* Get the tools we depend upon via `npm`, the [node package manager][npm].
* Get the angular code via `bower`, a [client-side code package manager][bower].

`npm` is preconfigured to automatically run `bower` so you can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools needed
* `app/bower_components` - contains all 3rd party dependencies

### Run the Application

The project is preconfigured to run with a simple development web server.  The simplest way to start
this server is:

```
grunt start
```

Now browse to the app at `http://localhost:9000`.

## Directory Layout

```
app/                       --> all of the source files for the application
  css/                     --> All app css and less files
    app.css                --> default stylesheet
  data/                    --> game data files
    game-data.json         --> json file that contains all game data
  img/                     --> app images
    zork_logo.jpeg         --> game logo
  js/                      --> app js files
    app.js                 --> main application module
  modules/                 --> contains all app modules
    game/                  --> contains game module
      game.html            --> the partial template
      game-controller.js   --> the controller logic
      game-directive.js    --> the directive that handles keyboard events and binds the controller
      game-factory         --> the factory that contains all controller helper methods
      game-service         --> the service responsible from downloading the game data
  index.html               --> app layout file (the main html template file of the app)
  test/                    --> contains unit and protractor tests as well as test helpers
    e2e-tests/             --> end-to-end tests
      protractor-conf.js   --> Protractor config file
      scenarios.js         --> end-to-end scenarios to be run by Protractor
    helpers/jscs           --> helpers for coverage reporter
    unit/                  --> Jasmine unit tests
      modules/             --> unit tests for modules
        game/              --> unit tests for game module
          game_spec.js     --> game module unit test spec file
  .bowerrc                 --> holds bower folder location
  .jscsrc                  --> jscs configuration
  .jshintrc                --> jshint configuration
  bower.json               --> bower configuration
  Gruntfile.js             --> config file for grunt task runner
  karma.conf.auto.js       --> karma autotest configuration
  karma.conf.js            --> config file for running unit tests with Karma
  karma.conf.shared.js     --> shared config file for karma
  package.json             --> npm package configuration
```

## Testing

There are two kinds of tests in this application: Unit tests and End to End tests.

### Running Unit Tests

The app comes preconfigured with unit tests. These are written in
[Jasmine][jasmine], which we run with the [Karma Test Runner][karma]. We provide a Karma
configuration file to run them.

* the configuration files are `karma.conf.js`, `karma.conf.auto.js` and `karma.conf.shared.js`
* the unit tests are found in test folder replicating the exact folder structure of the app and are named as `..._spec.js`.

The easiest way to run the unit tests is to use the supplied grunt task:

```
grunt autotest
```

This script will start the Karma test runner to execute the unit tests. Moreover, Karma will sit and
watch the source and test files for changes and then re-run the tests whenever any of them change.
This is the recommended strategy; if your unit tests are being run every time you save a file then
you receive instant feedback on any changes that break the expected code functionality.

You can also ask Karma to do a single run of the tests and then exit.  This is useful if you want to
check that a particular version of the code is operating as expected.  The project contains a
predefined script to do this:

```
grunt test
```

### End to end testing

The app also comes with end-to-end tests, again written in [Jasmine][jasmine]. These tests
are run with the [Protractor][protractor] End-to-End test runner.  It uses native events and has
special features for Angular applications.

* the configuration is found at `test/e2e-tests/protractor-conf.js`
* the end-to-end tests are found in `test/e2e-tests/scenarios.js`

Protractor simulates interaction with our web app and verifies that the application responds
correctly. Therefore, our web server needs to be serving up the application, so that Protractor
can interact with it.

You can run the end-to-end tests using the supplied script:

```
grunt e2e
```

This script will execute the end-to-end tests against the application being hosted on the
development server.


## Updating Dependencies

The angular framework library code and tools are acquired through package managers (npm and
bower) you can use these tools instead to update the dependencies.

You can update the tool dependencies by running:

```
npm update
```

This will find the latest versions that match the version ranges specified in the `package.json` file.

You can update the all dependencies by running:

```
bower update
```

This will find the latest versions of all dependencies that match the version ranges specified in the `bower.json` file.


### Running the App during Development 

You can start this webserver with the supplied script: 

```
grunt start
```
