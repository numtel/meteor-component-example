// counter starts at 0
Session.setDefault("counter", 0);

Template.hello = Template.fromString(`
  <button>Click Me</button>
  <p>You've pressed the button {{counter}} times.</p>
`);

Template.hello.helpers({
  counter: function () {
    return Session.get("counter");
  }
});

Template.hello.events({
  'click button': function () {
    // increment the counter when button is clicked
    Session.set("counter", Session.get("counter") + 1);
  }
});

