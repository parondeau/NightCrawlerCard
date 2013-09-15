// Generated by CoffeeScript 1.6.3
(function() {
  (function(App) {
    var barsList, err, kikItCard, onSearch;
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
    kikItCard = function() {
      return cards.kik.send({
        title: 'test1',
        text: 'test2',
        pic: 'http://4.bp.blogspot.com/-j49xTVdZe7g/TVnmq6phXxI/AAAAAAAABpA/Pm45FErBfQQ/s400/hopkins%2Bduck.jpg',
        noForward: false
      });
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
    App.populator("venuePage", function(page) {
      return $(page).find('#kikBtn').on('click', kikItCard);
    });
    try {
      return App.restore();
    } catch (_error) {
      err = _error;
      return App.load("home");
    }
  })(App);

}).call(this);
