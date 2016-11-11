'use strict';

var grunt = require('grunt');
var _ = require('lodash');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.require_dependency_fixer = {
    setUp: function(done) {
        // setup here if necessary
        done();
    },
    function(test) {
        var resultantPair = [];

        grunt.file.recurse('test/fixtures', function(abspath, rootdir, subdir, filename) {
            var pair = {
                fileName: filename,
                content: grunt.file.read(abspath)
            };

            resultantPair.push(pair);
        });

        test.expect(resultantPair.length);

        grunt.file.recurse('test/expected', function(abspath, rootdir, subdir, filename) {
            var fromFixture = _.find(resultantPair, function(item) {
                return item.fileName === filename;
            });

            var isEq = _.isEqual(fromFixture.content, grunt.file.read(abspath));
            test.ok(isEq, 'Equal');
        });

        test.done();
    }
};