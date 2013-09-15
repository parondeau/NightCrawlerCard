// Generated by CoffeeScript 1.6.2
(function() {
  this.barsList = null;

  (function(App) {
    var kikItCard, onSearch, restoreAppSession, venue;

    onSearch = function(page) {
      var query;

      query = $(page).find('#venueSearchQuery').val();
      if (query) {
        return getBars(query, function(err, venues) {
          var listitems;

          this.barsList = venues;
          listitems = "";
          venues.forEach(function(venue, index) {
            return listitems += render('venue_listitem', {
              index: index,
              name: venue.name,
              id: venue.id,
              location: venue.location.address
            });
          });
          $(page).find("#venuesList").html(listitems);
          return lazyLoad();
        });
      }
    };
    kikItCard = function() {
      var venue;

      venue = barList[index];
      if (cards.kik) {
        return cards.kik.send({
          title: 'test1',
          text: 'test2',
          pic: 'http://4.bp.blogspot.com/-j49xTVdZe7g/TVnmq6phXxI/AAAAAAAABpA/Pm45FErBfQQ/s400/hopkins%2Bduck.jpg',
          noForward: false,
          data: {
            venue: {
              name: venue.name,
              photo: venue.photo,
              description: venue.description,
              location: venue.location.address
            }
          }
        });
      }
    };
    restoreAppSession = function() {
      var err;

      try {
        return App.restore();
      } catch (_error) {
        err = _error;
        return App.load("home");
      }
    };
    App.populator("home", function(page) {
      $(page).find('#venueSearchButton').on('click', function(event) {
        return onSearch(page);
      });
      if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition(function(success) {
          return console.log(success);
        }, function(err) {
          return console.log(err);
        });
      }
    });
    App.populator("venuePage", function(page, index, photourl) {
      $(page).find('#kikBtn').on('click', function() {
        return kikItCard(index);
      });
      return $(page).find('#backToHome').on('click', function(e) {
        if (cards.kik && cards.kik.message) {
          cards.kik.message = null;
          console.log("yeppers");
          return App.load('home');
        }
      });
    });
    if (!cards.kik || !cards.kik.message) {
      return restoreAppSession();
    } else {
      venue = cards.kik.message.venue;
      console.log(cards.kik.message.venue);
      return App.load("venuePage", {
        external: true,
        name: venue.name,
        photo: venue.photo,
        description: venue.description,
        location: venue.location
      });
    }
  })(App);

}).call(this);
