# Schema Faker

Given a collection with an attached `SimpleSchema`, create fake data
quickly and easily

## Requirements

- aldeed:simple-schema
- aldeed:collection2

## Example usage

Let's say that we have something like a github profile.

```
Profiles = new Mongo.Collection('profiles');
Profiles.attachSchema(new SimpleSchema({
  "name": {
    type: Object
  },
  "name.first": {
    type: String,
    fake: Faker.name.firstName
  },
  "name.middle": {
    type: String,
    optional: true,
    fake: Faker.name.firstName
  },
  "name.last": {
    type: String,
    fake: Faker.name.lastName
  },
  "name.full": {
    type: String,
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
  },
  "contact.email": {
    type: String,
    regex: SimpleSchema.RegEx.Email,
    fake: Faker.internet.email,
    custom: function () {
    }
  },
  "contact.phone": {
    type: String,
    regex: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-.
]*(\d{4})(?: *x(\d+))?\s*$/
  }
}));

Profiles.createRandom({
  count: 10
});
```

## Extending schema definition
On your schema definition, you can add the key of `fake`

## Limitations and catches

Using a SimpleSchema regex will use `Faker` to generate a matching
String with that alone.

## Options
The only parameter to `createRandom` is an object of options. The
options are as follows:

- `count`
The number of fake entries to create
