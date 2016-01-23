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

var rp = require('request-promise');
var cheerio = require('cheerio');

module.exports = function(ctx) {
  return function googleFormTag(args) {
    var result = '';
    var formKey = args.shift();
    var message = args.length ? args[0] : '';
    var url = 'https://docs.google.com/forms/d/' + formKey + '/viewform?embedded=true';
    var options = {
      uri: url,
      transform: function(body) {
        return cheerio.load(body);
      }
    };

    rp(options)
      .then(function($) {
        var formHtml = $('form').first().parent();

        result += '<div class="google-form-wrapper">';
        result += '<p class="success-msg">' + message + '</p>';
        result += formHtml.html();
        result += '</div>';

        return result;
      })
      .catch(function(err) {
        return 'Error fetching form: ' + err.message;
      });
  };
};
