'use strict';

describe('Inflector', function() {

  var Inflector;
  beforeEach(function() {
    Inflector = require('../../lib/inflector/inflector');
  });

  describe('String#sub', function() {
    it('is different from String#replace because it returns undefined if no match is found', function() {
      expect('hello'.replace('hi', 'hello')).toEqual('hello');
      expect('hello'.sub('hi', 'hello')).toEqual(undefined);
    });
  });

  describe('String#isEmpty', function() {
    it('returns true if the string has a length of zero', function() {
      expect('hi'.isEmpty()).toEqual(false);
      expect(''.isEmpty()).toEqual(true);
    });
  });

  describe('String#pluralize', function() {

    it('pluralizes words', function() {
      expect('post'.pluralize()).toEqual('posts');
      expect('greens'.pluralize()).toEqual('greens');
      expect('axis'.pluralize()).toEqual('axes');
      expect('testis'.pluralize()).toEqual('testes');
      expect('octopus'.pluralize()).toEqual('octopi');
      expect('diagnosis'.pluralize()).toEqual('diagnoses');
      expect('analysis'.pluralize()).toEqual('analyses');
      expect('virus'.pluralize()).toEqual('viruses');
      expect('status'.pluralize()).toEqual('statuses');
      expect('alias'.pluralize()).toEqual('aliases');
      expect('bus'.pluralize()).toEqual('buses');
      expect('buffalo'.pluralize()).toEqual('buffaloes');
      expect('tomato'.pluralize()).toEqual('tomatoes');
      expect('tium'.pluralize()).toEqual('tia');
      expect('tia'.pluralize()).toEqual('tia');
      expect('fife'.pluralize()).toEqual('fives');
      expect('hive'.pluralize()).toEqual('hives');
      expect('soliloquy'.pluralize()).toEqual('soliloquies');
      expect('ex'.pluralize()).toEqual('exes');
      expect('matrix'.pluralize()).toEqual('matrices');
      expect('vertex'.pluralize()).toEqual('vertices');
      expect('index'.pluralize()).toEqual('indices');
      expect('mouse'.pluralize()).toEqual('mice');
      expect('louse'.pluralize()).toEqual('lice');
      expect('ox'.pluralize()).toEqual('oxen');
      expect('oxen'.pluralize()).toEqual('oxen');
      expect('quiz'.pluralize()).toEqual('quizzes');
      expect('person'.pluralize()).toEqual('people');
      expect('man'.pluralize()).toEqual('men');
      expect('woman'.pluralize()).toEqual('women');
      expect('child'.pluralize()).toEqual('children');
      expect('sex'.pluralize()).toEqual('sexes');
      expect('move'.pluralize()).toEqual('moves');
      expect('cow'.pluralize()).toEqual('cows');
      expect('zombie'.pluralize()).toEqual('zombies');
      expect('equipment'.pluralize()).toEqual('equipment');
      expect('information'.pluralize()).toEqual('information');
      expect('rice'.pluralize()).toEqual('rice');
      expect('money'.pluralize()).toEqual('money');
      expect('species'.pluralize()).toEqual('species');
      expect('series'.pluralize()).toEqual('series');
      expect('sheep'.pluralize()).toEqual('sheep');
      expect('jeans'.pluralize()).toEqual('jeans');
      expect('police'.pluralize()).toEqual('police')
    });

  });

  describe('String#singularize', function() {

    it('singularizes words', function() {
      expect('posts'.singularize()).toEqual('post');
      expect('sweetness'.singularize()).toEqual('sweetness');
      expect('sweetnesses'.singularize()).toEqual('sweetness');
      expect('news'.singularize()).toEqual('news');
      expect('tia'.singularize()).toEqual('tium');
      expect('analyses'.singularize()).toEqual('analysis');
      expect('diagnoses'.singularize()).toEqual('diagnosis');
      expect('parantheses'.singularize()).toEqual('paranthesis');
      expect('prognoses'.singularize()).toEqual('prognosis');
      expect('synopses'.singularize()).toEqual('synopsis');
      expect('theses'.singularize()).toEqual('thesis');
      expect('fives'.singularize()).toEqual('fife');
      expect('hives'.singularize()).toEqual('hive');
      expect('tives'.singularize()).toEqual('tive');
      expect('cloves'.singularize()).toEqual('clove');
      expect('soliloquies'.singularize()).toEqual('soliloquy');
      expect('series'.singularize()).toEqual('series');
      expect('movies'.singularize()).toEqual('movie');
      expect('fishes'.singularize()).toEqual('fish');
      expect('lice'.singularize()).toEqual('louse');
      expect('oreos'.singularize()).toEqual('oreo');
      expect('toes'.singularize()).toEqual('toe');
      expect('potatoes'.singularize()).toEqual('potato');
      expect('shoes'.singularize()).toEqual('shoe');
      expect('crises'.singularize()).toEqual('crisis');
      expect('testes'.singularize()).toEqual('testis');
      expect('axes'.singularize()).toEqual('axis');
      expect('octopi'.singularize()).toEqual('octopus');
      expect('aliases'.singularize()).toEqual('alias');
      expect('oxen'.singularize()).toEqual('ox');
      expect('vertices'.singularize()).toEqual('vertex');
      expect('matrices'.singularize()).toEqual('matrix');
      expect('quizzes'.singularize()).toEqual('quiz');
      expect('databases'.singularize()).toEqual('database');
      expect('people'.singularize()).toEqual('person');
      expect('men'.singularize()).toEqual('man');
      expect('women'.singularize()).toEqual('woman');
      expect('children'.singularize()).toEqual('child');
      expect('sexes'.singularize()).toEqual('sex');
      expect('moves'.singularize()).toEqual('move');
      expect('cows'.singularize()).toEqual('cow');
      expect('zombies'.singularize()).toEqual('zombie');
      expect('equipment'.singularize()).toEqual('equipment');
      expect('information'.singularize()).toEqual('information');
      expect('rice'.singularize()).toEqual('rice');
      expect('money'.singularize()).toEqual('money');
      expect('species'.singularize()).toEqual('species');
      expect('series'.singularize()).toEqual('series');
      expect('sheep'.singularize()).toEqual('sheep');
      expect('jeans'.singularize()).toEqual('jeans');
      expect('police'.singularize()).toEqual('police');
    });

  });

  describe('String#camelize', function() {
    it('changes a string to camelcase', function() {
      expect('active_model'.camelize()).toEqual('ActiveModel');
      expect('active_model_party'.camelize()).toEqual('ActiveModelParty');
    });

    it('leaves acronyms uppercase', function() {
      expect('HTML_parser'.camelize()).toEqual('HTMLParser');
    });
  });

  describe('String#underscore', function() {
    it('changes a string to underscore case', function() {
      expect('ActiveModel'.underscore()).toEqual('active_model');
      expect('SuperDuperClass'.underscore()).toEqual('super_duper_class');
      expect('SuperHTMLParser'.underscore()).toEqual('super_html_parser');
    });
  });

  // Capitalizes the first word and turns underscores into spaces and strips a
  // trailing "_id", if any. Like +titleize+, this is meant for creating pretty
  // output.
  //
  //   'employee_salary'.humanize # => "Employee salary"
  //   'author_id'.humanize       # => "Author"
  describe('String#humanize', function() {
    it('humanizes a phrase', function() {
      expect('employee_salary'.humanize()).toEqual('Employee salary');
      expect('author_id'.humanize()).toEqual('Author');
      expect('AuthorComments'.humanize()).toEqual('Author comments');
    });
  });

  // # Capitalizes all the words and replaces some characters in the string to
  // # create a nicer looking title. +titleize+ is meant for creating pretty
  // # output.
  // #
  // #
  // #   'man from the boondocks'.titleize   # => "Man From The Boondocks"
  // #   'x-men: the last stand'.titleize    # => "X-Men: The Last Stand"
  // #   'TheManWithoutAPast'.titleize       # => "The Man Without A Past"
  // #   'raiders_of_the_lost_ark'.titleize  # => "Raiders Of The Lost Ark"
  describe('String#titleize', function() {
    it('turns a phrase into a title', function() {
      expect('man from the boondocks'.titleize()).toEqual('Man From The Boondocks');
      expect('x-men: the last stand'.titleize()).toEqual('X-Men: The Last Stand');
      expect('TheManWithoutAPast'.titleize()).toEqual('The Man Without A Past');
      expect('raiders_of_the_lost_ark'.titleize()).toEqual('Raiders Of The Lost Ark');
    });
  });

  describe('String#titlecase', function() {
    it('is an alias for titleize', function() {
      expect('man from the boondocks'.titlecase()).toEqual('Man From The Boondocks');
    })
  });

  describe('String#classify', function() {
    it('creates a class name for a plural entity', function() {
      expect('posts'.classify()).toEqual('Post');
      expect('sensors'.classify()).toEqual('Sensor');
      expect('systems'.classify()).toEqual('System');
      expect('user_projects'.classify()).toEqual('UserProject');
    });
  });

  describe('String#toForeignKey', function() {
    it('creates the name of a foreign key', function() {
      expect('post'.toForeignKey()).toEqual('post_id');
      expect('Sensor'.toForeignKey()).toEqual('sensor_id');
    });
  });

  describe('String#ordinalize', function() {
    it('ordindalizes a number', function() {
      expect('1'.ordinalize()).toEqual('1st');
      expect('202'.ordinalize()).toEqual('202nd');
      expect('4003'.ordinalize()).toEqual('4003rd');
      expect('5004'.ordinalize()).toEqual('5004th');
      expect('15'.ordinalize()).toEqual('15th');
      expect('16'.ordinalize()).toEqual('16th');
      expect('17'.ordinalize()).toEqual('17th');
      expect('18'.ordinalize()).toEqual('18th');
      expect('19'.ordinalize()).toEqual('19th');
      expect('20'.ordinalize()).toEqual('20th');
    });
  });

});
