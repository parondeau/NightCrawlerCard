// Generated by CoffeeScript 1.6.3
(function() {
  (function(App) {
    var barsList, err, onSearch;
    barsList = null;
    onSearch = function(page) {
      var query;
      query = $(page).find('#venueSearchQuery').val();
      if (query) {
        return getBars(query, function(err, venues) {
          var listitems;
          barsList = venues;
          listitems = "";
          venues.forEach(function(venue, index) {
            return listitems += render('venue_listitem', {
              index: index,
              name: venue.name,
              id: venue.id,
              location: venue.location.address
            });
          });
          $(page).find("#venuesList").append(listitems);
          return lazyLoad();
        });
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
    App.populator("page2", function(page) {
      return console.log("test2");
    });
    try {
      return App.restore();
    } catch (_error) {
      err = _error;
      return App.load("home");
    }
  })(App);

}).call(this);
