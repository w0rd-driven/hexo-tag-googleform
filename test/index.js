'use strict';

var should = require('chai').should(); // eslint-disable-line
var cheerio = require('cheerio');
var Promise = require('bluebird');

var Hexo = require('hexo');
var hexo = new Hexo(__dirname, { silent: true });

var tag = Promise.method(require('../lib/tag')).bind(hexo);

describe('hexo-tag-googleform', function() {
  function getTag(args) {
    return tag(args);
  }

  it('formkey', function() {
    var expected = 'https://docs.google.com/forms/d/1LWfLc4G7JghaNn4ljMPl0WJZ-KnYgxXPxKZmKhTbbXY/formResponse?embedded=true';
    return getTag(['1LWfLc4G7JghaNn4ljMPl0WJZ-KnYgxXPxKZmKhTbbXY']).then(function(result) {
      var $ = cheerio.load(result);
      var action = $('#ss-form').attr('action');
      action.should.equal(expected);
    });
  });

  it('message', function() {
    var expectedAction = 'https://docs.google.com/forms/d/1LWfLc4G7JghaNn4ljMPl0WJZ-KnYgxXPxKZmKhTbbXY/formResponse?embedded=true';
    var expectedMessage = '<p class="success-msg">Thank you. I&apos;ll get back to you shortly</p>';
    return getTag(['1LWfLc4G7JghaNn4ljMPl0WJZ-KnYgxXPxKZmKhTbbXY', 'Thank', 'you.', 'I\'ll', 'get', 'back', 'to', 'you', 'shortly'])
      .then(function(result) {
        var $ = cheerio.load(result);
        var action = $('#ss-form').attr('action');
        var message = $('<div />').append($('p.success-msg').clone()).html();
        action.should.equal(expectedAction);
        message.should.equal(expectedMessage);
    });
  });

  it('error', function() {
    var expected = 'Error fetching form, expected syntax: {% googleform formkey [message] %}';
    return getTag(['dGVfY3MwcklDcjVrZERGYlRoZWdJQnc6MQ']).then(function(result) {
      result.should.equal(expected);
    });
  });
});
