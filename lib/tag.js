/* global hexo */

'use strict';

/**
 * Google Form tag
 *
 * Syntax:
 *   {% googleform formkey [message] %}
 *
 * Examples:
 *   {% googleform dGVfY3MwcklDcjVrZERGYlRoZWdnpm JQnc6MQ Thank you. I'll get back to you shortly %}
 */

var requestPromise = require('request-promise');
var cheerio = require('cheerio');

function googleFormTag(args) {
  var result = '';
  var formKey = args.shift();
  var message = args.length ? args.join(' ') : '';
  var url = 'https://docs.google.com/forms/d/' + formKey + '/viewform?embedded=true';
  var options = {
    uri: url,
    transform: function(body) {
      return cheerio.load(body);
    }
  };

  return requestPromise(options)
    .then(function($) {
      var formHtml = $('form').first().parent();

      result += '<div class="google-form-wrapper">';
      result += '<p class="success-msg">' + message + '</p>';
      result += formHtml.html();
      result += '</div>';

      return result;
    })
    .catch(function(err) {
      hexo.log.err(err);
    });
}

module.exports = googleFormTag;
