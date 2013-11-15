jsActiveSupport
===============

Active Support for Javascript

#### String#singularize

```
expect('cloves'.singularize()).toEqual('clove');
expect('soliloquies'.singularize()).toEqual('soliloquy');
expect('series'.singularize()).toEqual('series');
```

#### String#pluralize
  
```
expect('post'.pluralize()).toEqual('posts');
expect('person'.pluralize()).toEqual('people');
expect('man'.pluralize()).toEqual('men');
```

#### String#camelize
  
```
it('changes a string to camelcase', function() {
  expect('active_model'.camelize()).toEqual('ActiveModel');
  expect('active_model_party'.camelize()).toEqual('ActiveModelParty');
});

it('leaves acronyms uppercase', function() {
  expect('HTML_parser'.camelize()).toEqual('HTMLParser');
});
```

#### String#underscore

```
expect('ActiveModel'.underscore()).toEqual('active_model');
expect('SuperDuperClass'.underscore()).toEqual('super_duper_class');
expect('SuperHTMLParser'.underscore()).toEqual('super_html_parser');
```

#### String#humanize

```
expect('employee_salary'.humanize()).toEqual('Employee salary');
expect('author_id'.humanize()).toEqual('Author');
expect('AuthorComments'.humanize()).toEqual('Author comments');
```

#### String#titleize

```
expect('man from the boondocks'.titleize()).toEqual('Man From The Boondocks');
expect('x-men: the last stand'.titleize()).toEqual('X-Men: The Last Stand');
expect('TheManWithoutAPast'.titleize()).toEqual('The Man Without A Past');
expect('raiders_of_the_lost_ark'.titleize()).toEqual('Raiders Of The Lost Ark');
```
