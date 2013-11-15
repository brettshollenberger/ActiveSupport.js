'use strict';

var _ = require('lodash');
var Inflections = require('./Inflections');

var Inflector = {};

Inflector.inflections = new Inflections();

Inflector.inflections.plural(/$/, 's');
Inflector.inflections.plural(/s$/i, 's');
Inflector.inflections.plural(/^(ax|test)is$/i, '$1es');
Inflector.inflections.plural(/(octop)us$/i, '$1i');
Inflector.inflections.plural(/(vir)us$/i, '$1uses');
Inflector.inflections.plural(/(alias|status)$/, '$1es');
Inflector.inflections.plural(/(bu)s$/i, '$1ses');
Inflector.inflections.plural(/(buffal|tomat)o$/i, '$1oes');
Inflector.inflections.plural(/([ti])um$/i, '$1a');
Inflector.inflections.plural(/([ti])a$/i, '$1a');
Inflector.inflections.plural(/sis$/i, 'ses');
Inflector.inflections.plural(/(?:([^f])fe|([lr])f)$/i, '$1$2ves');
Inflector.inflections.plural(/(hive)$/i, '$1s');
Inflector.inflections.plural(/([^aeiouy]|qu)y$/i, '$1ies');
Inflector.inflections.plural(/(x|ch|ss|sh)$/i, '$1es');
Inflector.inflections.plural(/(matr|vert|ind)(?:ix|ex)$/i, '$1ices');
Inflector.inflections.plural(/^(m|l)ouse$/i, '$1ice');
Inflector.inflections.plural(/^(m|l)ice$/i, '$1ice');
Inflector.inflections.plural(/^(ox)$/i, '$1en');
Inflector.inflections.plural(/^(oxen)$/i, '$1');
Inflector.inflections.plural(/(quiz)$/i, '$1zes');

Inflector.inflections.singular(/s$/i, '');
Inflector.inflections.singular(/(ss)$/i, '$1');
Inflector.inflections.singular(/(n)ews$/i, '$1ews');
Inflector.inflections.singular(/([ti])a$/i, '$1um');
Inflector.inflections.singular(/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)(sis|ses)$/i, '$1sis');
Inflector.inflections.singular(/(^analy)(sis|ses)$/i, '$1sis');
Inflector.inflections.singular(/([^f])ves$/i, '$1fe');
Inflector.inflections.singular(/(hive)s$/i, '$1');
Inflector.inflections.singular(/(tive)s$/i, '$1');
Inflector.inflections.singular(/([lr])ves$/i, '$1f');
Inflector.inflections.singular(/(c[lr])oves$/i, '$1ove');
Inflector.inflections.singular(/([^aeiouy]|qu)ies$/i, '$1y');
Inflector.inflections.singular(/(s)eries$/i, '$1eries');
Inflector.inflections.singular(/(m)ovies$/i, '$1ovie');
Inflector.inflections.singular(/(x|ch|ss|sh)es$/i, '$1');
Inflector.inflections.singular(/^(m|l)ice$/i, '$1ouse');
Inflector.inflections.singular(/(bus)(es)?$/i, '$1');
Inflector.inflections.singular(/(o)es$/i, '$1');
Inflector.inflections.singular(/^(toe)s$/i, '$1');
Inflector.inflections.singular(/(shoe)s$/i, '$1');
Inflector.inflections.singular(/(cris|test)(is|es)$/i, '$1is');
Inflector.inflections.singular(/^(a)x[ie]s$/i, '$1xis');
Inflector.inflections.singular(/(octop|vir)(us|i)$/i, '$1us');
Inflector.inflections.singular(/(alias|status)(es)?$/i, '$1');
Inflector.inflections.singular(/^(ox)en/i, '$1');
Inflector.inflections.singular(/(vert|ind)ices$/i, '$1ex');
Inflector.inflections.singular(/(matr)ices$/i, '$1ix');
Inflector.inflections.singular(/(quiz)zes$/i, '$1');
Inflector.inflections.singular(/(database)s$/i, '$1');

Inflector.inflections.irregular('person', 'people');
Inflector.inflections.irregular('man', 'men');
Inflector.inflections.irregular('child', 'children');
Inflector.inflections.irregular('sex', 'sexes');
Inflector.inflections.irregular('move', 'moves');
Inflector.inflections.irregular('zombie', 'zombies');

Inflector.inflections.acronym('HTML');

Inflector.inflections.uncountable('equipment',
  'information', 'rice', 'money', 'species', 'series', 'fish',
  'sheep', 'jeans', 'police');

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
    return applyInflections(this, Inflector.inflections.plurals);
  };

  STRPROTO.singularize = function() {
    return applyInflections(this, Inflector.inflections.singulars);
  };

  STRPROTO.capitalize = function() {
    return this[0].toUpperCase() + this.slice(1).toLowerCase();
  };

  STRPROTO.camelize = function() {
    var string = _.clone(this);
    string = string.replace(/[a-z\d]+/g, function(t) { return t.capitalize(); });
    string = string.replace(/(?:_|(\/))([a-z\d]*)/gi, "$1" + (Inflector.inflections.acronyms["$2"] || "$2".capitalize()));
    return string;
  };

  STRPROTO.underscore = function() {
    var word  = _.clone(this);
    var regex = new RegExp('(?:([A-Za-z\d])|^)' + Inflector.inflections.acronymRegex + '(?=\b|[^a-z])', 'g');
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
      return Inflector.inflections.acronyms[t] || t.toLowerCase();
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

  function applyInflections(word, rules) {
    var returner, result = _.clone(word.toString());
    if (result.isEmpty() || _.include(Inflector.inflections.uncountables, result.toLowerCase())) return result;
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
  
}).call(this);
