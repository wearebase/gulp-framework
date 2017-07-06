# [Base Gulp Framework](https://www.npmjs.com/package/base-gulp-framework)
This package moves common gulp build steps into a single package, allowing it to be shared across projects.

This requires node v6 or newer.

Inspired by [this StackOverflow reply](https://stackoverflow.com/a/37317351).

This package is provided as is by [the Base team](https://wearebase.com) and we offer no support. Use it at your own risk.

## Getting started
To install:

    npm i base-gulp-framework --save

or

    yarn add base-gulp-framework

Then create a `gulpfile.js`, requiring the framework and initialising it with `configure`:

    var gulp = require('gulp'),
        baseGulpFramework = require('base-gulp-framework');

    baseGulpFramework.configure(gulp, require('config.json'));

And create a `config.json`. Modify the example (`example-config.json`) included in this repo. *Top tip:* You can also use arrays for src files if you wish.

Build commands are inside arrays, so you can add multiple 'groups' to allow the builds to run multiple times in different parts of your app.

## Adding your own tasks
Then you can add your own tasks at the bottom of your `gulpfile.js` if you need them. If you add a task that is named the same as one already in this module, gulp will use _your_ task only.

## Run in production mode
Each of the Gulp tasks in this framework can toggle elements off if you're building in production. For example, CSS and JS sourcemaps will not generate when in production mode.

To build with production enabled:

    gulp assets --production

## Running local gulp
Add this to your `package.json`:

    "scripts": {
        "gulp": "gulp"
    }

If you're using yarn, it won't be automatically added to the `node_modules/.bin` folder as it's a sub-dependency, so also run `yarn add gulp`.

Now you can run `npm run gulp` (or `yarn run gulp`). To pass flags through, add an extra double dash: `yarn run gulp -- --production`.

## Older npm versions
This framework is designed to work with npm v5 or yarn, where the dependencies form a flat structure.

If you have trouble calling gulp (see "Running local gulp"), then add gulp to your dependencies in your project.

    npm install gulp --save

or

    yarn add gulp
