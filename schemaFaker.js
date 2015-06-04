// allow for additional options on the schema
SimpleSchema.extendOptions({
  fake: Match.Optional(Match.Any)
});

if (Meteor.isServer) {
  var RandExp = Npm.require('randexp');
  var Faker = Npm.require('Faker2');

  SchemaFaker = {
    /**
     * The RegEx generator can generate some pretty wild things
     * Best just to use this if possible.
     */
    _regExMap: {
      Email: Faker.Internet.email.bind(Faker.Internet),
      IP: Faker.Internet.ip.bind(Faker.Internet),
      IPv4: Faker.Internet.ip.bind(Faker.Internet),
      IPv6: Faker.Internet.ip.bind(Faker.Internet),
      ZipCode: Faker.Address.zipCode.bind(Faker.Address),
      Id: Random.id,
      Url: function () {
        return 'http://www.' + Faker.Internet.domainName();
      },
      Domain: Faker.Internet.domainName.bind(Faker.Internet),
      WeakDomain: Faker.Internet.domainName.bind(Faker.Internet)
    },

    _findMatchingRegex: function (regEx) {
      if (_.contains(_.values(SimpleSchema.RegEx), regEx)) {
        return this._regExMap[_.invert(SimpleSchema.RegEx)[regEx]].bind(Faker)();
      }
    },

    matchingString: function (schemaObj) {
      if (_.has(schemaObj, 'regEx')) {
        this._findMatchingRegex(schemaObj.regEx);
      }
    },
  };

  Mongo.Collection.prototype.createRandom = function createRandom(options) {
    var self = this;
    var options = options || {};

    if (!this.simpleSchema || !(this.simpleSchema() instanceof SimpleSchema)) {
      throw new Meteor.Error(500, "Collection does not have valid attached schema");
    }

    var definition = this.simpleSchema().schema();
    var model = {};
    _.each(definition, function (schemaObj, schemaKey) {
      if (schemaObj.type === String) {
        var string = SchemaFaker.matchingString(schemaObj);
        console.log(string);
        model[schemaKey] = string;
      }
    });
    console.log(model);
  }
}
