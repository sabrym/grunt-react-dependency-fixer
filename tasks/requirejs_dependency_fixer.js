/*
 * grunt-requirejs-dependency-fixer
 * https://github.com/sabrym/grunt-requirejs-dependency-fixer
 *
 * Copyright (c) 2016 sabrym
 * Licensed under the MIT license.
 */

'use strict';


var _ = require('lodash');

function captureStringAfterSlash(completeString) {
    return completeString.substr(completeString.lastIndexOf('/') + 1);
}

function combineString(completeString, post) {
    return completeString.substr(0, completeString.lastIndexOf('/') + 1) + post;
}

module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('requirejs_dependency_fixer', 'This is a plugin that checks for requireJs dependencies in javascript files and updates them if their case does not match the defined', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options();

        // Iterate over all specified file groups.
        this.files.forEach(function(f) {

            var src = f.src.filter(function(filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function(filepath) {
                var fileSource = grunt.file.read(filepath);
                if (_.isEmpty(fileSource)) {
                    grunt.log.writeln('The file : ' + filepath + ' is empty');
                    return;
                }

                // iterate through each of the dependencies we need to check
                // check if this is a lowercase or upper case first, i.e. element
                // if element is lower => upper and match
                // if element is upper => lower and match
                // if result exists, then replace with the original string
                options.requireDependencies.forEach(function(element) {
                    var stringAfterSlash = captureStringAfterSlash(element),
                        lowerFirst = _.lowerFirst(stringAfterSlash),
                        completeString = combineString(element, (lowerFirst === stringAfterSlash) ? _.upperFirst(lowerFirst) : lowerFirst),
                        contains = _.includes(fileSource, completeString);

                    if (contains) {
                        grunt.log.writeln('The file : ' + filepath + ' contains mismatch for ' + element);
                        grunt.log.writeln('Replacing..');
                        fileSource = fileSource.replace(completeString, element);
                        grunt.file.write(filepath, fileSource);
                        grunt.log.writeln('Operation complete');
                    }

                }, this);
            })
        });
    });

};