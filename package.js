Package.describe({
  name: 'afrazer:schema-faker',
  version: '0.0.1',
  summary: 'Create quick database models matching a SimpleSchema',
  git: 'https://github.com/AlexFrazer/meteor-schema-faker',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.0.3.1');
  var both = ['client', 'server'];

  api.use('underscore');
  api.use('check');
  api.use('random');

  api.use('aldeed:simple-schema');
  api.use('aldeed:collection2');

  api.add_files('schemaFaker.js');
  api.export('SchemaFaker', both);
});

Npm.depends({
  'randexp': '0.4.0',
  'faker2': '0.5.0'
});
