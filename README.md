## Introduction

[Hexo](http://hexo.io) tag plugin to embed Google Forms.

Inspired by [https://github.com/arshad/Google-Form-Octopress](https://github.com/arshad/Google-Form-Octopress)

Note: This works with the current iteration of Google Forms. [This article](https://support.google.com/docs/answer/6281888?hl=en)
explains how to switch back via the `Opt out of the new Forms` section. I would like to support both versions at some point.

## Installation

Run the following command in the root directory of hexo:

    npm install hexo-tag-googleform --save

Copy the following files into your theme folders:

* **dist/google-form.css** goes in *source/css*
* **dist/google-form.js** goes in *source/js*

Add the following to the header:

    <link rel="stylesheet" href="<%- config.root %>css/google-form.css" media="screen" type="text/css">

Add the following to the footer (or wherever your preferred javascript declarations are):

    <!-- jQuery Form Plugin -->  
    <script src="http://malsup.github.com/jquery.form.js"></script>  
    <!-- jQuery Form Validation Plugin -->  
    <script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.13.1/jquery.validate.min.js"></script>  
    <script src="<%- config.root %>js/google-form.js"></script>  

## Usage

    {% google-form formkey [message] %}

Example :

    {% google-form dGVfY3MwcklDcjVrZERGYlRoZWdJQnc6MQ Thank you. I'll get back to you shortly %}
