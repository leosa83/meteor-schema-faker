Profiles = new Mongo.Collection('profiles');
Profiles.attachSchema(new SimpleSchema({
  "name": {
    type: Object,
    label: "Name"
  },
  "name.first": {
    type: String,
    label: "First"
    // fake: SchemaFaker.first_name
  },
  "name.middle": {
    type: String,
    optional: true,
    label: "Middle"
    // fake: SchemaFaker.first_name
  },
  "name.last": {
    type: String,
    label: "Last"
    // fake: SchemaFaker.last_name
  },
  "name.full": {
    type: String,
    label: "Full name",
    autoValue: function () {
      var first = this.siblingField('first').value || "";
      var middle = this.siblingField('middle').value || "";
      var last = this.siblingField('last').value || "";

      // using underscore.string
      var fullName = _.humanize(_.join(" ", first, middle, last));

      if (this.isInsert) {
        return fullName;
      } else if (this.isUpdate) {
        return { $set: fullName };
      }
    }
  },
  "contact": {
    type: Object,
    label: "Contact"
  },
  "contact.email": {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    label: "Email"
    // fake: Faker.internet.email,
  },
  "contact.phone": {
    type: String,
    label: "Phone"
  },
  "contact.website": {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    label: "Website"
  }
}));

if (Meteor.isServer) {
  if (Profiles.find().count() === 0) {
    var profiles = Profiles.createRandom({ count: 10 });
  }
}
