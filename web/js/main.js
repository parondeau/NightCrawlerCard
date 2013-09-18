// Generated by CoffeeScript 1.6.3
(function() {
  (function(App) {
    var err, kikItCard;
    kikItCard = function(venue) {
      if (cards.kik) {
        return cards.kik.send({
          title: venue.name,
          text: venue.description,
          pic: venue.photo,
          noForward: false,
          data: {
            venue: venue
          }
        });
      }
    };
    App.populator("home", function(page) {
      if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition(function(success) {
          console.log(success);
          API.log("long: " + success.coords.longitude + " lat: " + success.coords.latitude);
          return cards.kik.getUser(function(user) {
            if (!user) {
              return;
            }
            user.long = success.coords.longitude;
            user.lat = success.coords.latitude;
            return updateOrAddUser(user);
          });
        }, function(err) {
          return console.log(err);
        });
      }
    });
    try {
      return App.restore();
    } catch (_error) {
      err = _error;
      return App.load("home");
    }
  })(App);

}).call(this);
