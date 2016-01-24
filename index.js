/* global hexo */

'use strict';

hexo.extend.tag.register('google-form', require('./lib/tag'), { async: true });
