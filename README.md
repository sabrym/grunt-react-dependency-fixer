# grunt-requirejs-dependency-fixer

> This is a plugin that checks for requireJs dependencies in javascript files and updates them if their case does not match the defined

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-requirejs-dependency-fixer --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-requirejs-dependency-fixer');
```

## The "requirejs_dependency_fixer" task

### Overview
In your project's Gruntfile, add a section named `requirejs_dependency_fixer` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  requirejs_dependency_fixer: {
    options: {
      // Task-specific options go here.
    },
    criteria: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options


### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
   requirejs_dependency_fixer: {
            options: {
                'requireDependencies': ['Core/util', 'Core/Config']
            },
            criteria: {
                files: {
                    'tmp': ['test/fixtures/*.js']
                }
            }
        }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
