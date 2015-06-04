if (Meteor.isClient) {
  Template.contacts.helpers({
    contacts: function () {
      return Profiles.find({}, { sort: { score: -1, name: 1 } });
    },
    selectedName: function () {
      var player = Profiles.findOne(Session.get("selectedPlayer"));
      return player && player.name;
    }
  });

  Template.contacts.events({
    'click .inc': function () {
      Profiles.update(Session.get("selectedPlayer"), {$inc: {score: 5}});
    }
  });

  Template.contact.helpers({
    selected: function () {
      return Session.equals("selectedPlayer", this._id) ? "selected" : '';
    }
  });
}
