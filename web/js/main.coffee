((App) ->
	barsList = null
	onSearch = (page) ->
		query = $(page).find('#venueSearchQuery').val()
		if query
			getBars query, (err, venues) ->
				barsList = venues
				listitems = ""
				venues.forEach (venue, index) ->
					listitems += render('venue_listitem', {index: index, name: venue.name, id: venue.id, location: venue.location.address})
				$(page).find("#venuesList").append listitems
				lazyLoad()

	App.populator "home", (page) ->
		$(page).find('#venueSearchButton').on 'click', (event) ->
			onSearch page
		if navigator.geolocation
			navigator.geolocation.getCurrentPosition (success) ->
					console.log success
					# $('.app-content').append "long: " + success.coords.longitude + " lat: " + success.coords.latitude
				, (err) -> 
					console.log err
	
	App.populator "page2", (page) ->
		console.log "test2"
	
	try
		App.restore()
	catch err
		App.load "home"
) App
