'use strict';

var _ = require('lodash');
var English = require('./english');

module.exports = (function() {

  var STRPROTO = String.prototype;

  function isRegExp(test) {
    return test instanceof RegExp;
  };

  STRPROTO.gsub = function(regex, w) {
    var r = regex.toString().replace(/^\//, '').replace(/\/$/, '');
    return this.replace(new RegExp(r, 'g'), w);
  }

  STRPROTO.sub = function(test, rep) {
    var regex;
    if (isRegExp(test))    regex = test;
    if (!isRegExp(test))   regex = new RegExp(test);
    if (this.match(regex)) return this.replace(regex, rep);
  };

  STRPROTO.isEmpty = function() { return this.length === 0; };

  STRPROTO.pluralize = function() {
    return applyInflections(this, English.inflections.plurals);
  };

  STRPROTO.singularize = function() {
    return applyInflections(this, English.inflections.singulars);
  };

  function applyInflections(word, rules) {
    var returner, result = _.clone(word.toString());
    if (result.isEmpty() || _.include(English.inflections.uncountables, result.toLowerCase())) return result;
    for (var i in rules) {
      var rule        = rules[i][0];
      var replacement = rules[i][1];
      if (result.sub(rule, replacement)) {
        returner = result.sub(rule, replacement);
        break;
      }
    }
    return returner;
  };

  STRPROTO.capitalize = function() {
    return this[0].toUpperCase() + this.slice(1).toLowerCase();
  };

  STRPROTO.camelize = function() {
    var string = _.clone(this);
    string = string.replace(/[a-z\d]+/g, function(t) { return t.capitalize(); });
    string = string.replace(/(?:_|(\/))([a-z\d]*)/gi, "$1" + (English.inflections.acronyms["$2"] || "$2".capitalize()));
    return string;
  };

  STRPROTO.underscore = function() {
    var word  = _.clone(this);
    var regex = new RegExp('(?:([A-Za-z\d])|^)' + English.inflections.acronymRegex + '(?=\b|[^a-z])', 'g');
    word = word.replace(regex, '$1$1_$2');
    word = word.replace(/([A-Z\d]+)([A-Z][a-z])/g,'$1_$2');
    word = word.replace(/([a-z\d])([A-Z])/g,'$1_$2');
    word = word.toLowerCase();
    return word;
  };

  // Capitalizes the first word and turns underscores into spaces and strips a
  // trailing "_id", if any. Like +titleize+, this is meant for creating pretty
  // output.
  //
  //   'employee_salary'.humanize # => "Employee salary"
  //   'author_id'.humanize       # => "Author"
  STRPROTO.humanize = function() {
    var word = _.clone(this);
    word     = word.underscore();
    word     = word.gsub(/_id$/, '');
    word     = word.gsub(/\_/, ' ');
    word     = word.gsub(/([a-z\d])*/i, function(t) {
      return English.inflections.acronyms[t] || t.toLowerCase();
    });
    word     = word.replace(/^\w/, function(t) { return t.capitalize(); });
    return word;
  };

  // # Capitalizes all the words and replaces some characters in the string to
  // # create a nicer looking title. +titleize+ is meant for creating pretty
  // # output. It is not used in the Rails internals.
  // #
  // # +titleize+ is also aliased as +titlecase+.
  // #
  // #   'man from the boondocks'.titleize   # => "Man From The Boondocks"
  // #   'x-men: the last stand'.titleize    # => "X Men: The Last Stand"
  // #   'TheManWithoutAPast'.titleize       # => "The Man Without A Past"
  // #   'raiders_of_the_lost_ark'.titleize  # => "Raiders Of The Lost Ark"
  STRPROTO.titleize  = function() {
    return this.humanize().replace(/\b(\w+)/g, function(a) { return a.capitalize(); })
  };

  STRPROTO.titlecase = function() { return this.titleize(); };

  STRPROTO.classify  = function() {
    return this.singularize().camelize().replace(/.*\./, '');
  };

  STRPROTO.toForeignKey = function() {
    return this.underscore() + '_id';
  };

  STRPROTO.ordinalize = function() {
    var number = Number(this);

    if (_.include([11, 12, 13], number % 100)) {
      return number + 'th';
    } else {
      var remain = number % 10;
      if (remain == 1) return number + 'st';
      if (remain == 2) return number + 'nd';
      if (remain == 3) return number + 'rd';
      return number + 'th';
    }
  };
  
}).call(this);
