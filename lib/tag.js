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

var request = require('request');
var cheerio = require('cheerio');

module.exports = function(context) {
  return function googleFormTag(args) {
    var result = '';
    var formKey = args.shift();
    var message = args.length ? args[0] : '';
    var url = 'https://docs.google.com/forms/d/' + formKey + '/viewform?embedded=true';

    request(url, function(error, response, data) {
      if (!error && response.statusCode === 200) {
        var $ = cheerio.load(data);
        var formHtml = $('form').first().parent();

        result += '<div class="google-form-wrapper">';
        result += '<p class="success-msg">' + message + '</p>';
        result += formHtml.html();
        result += '</div>';

        return result;
      }
    });
  };
};
