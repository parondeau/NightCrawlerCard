((App) ->
	onSearch = (page) ->
		query = $(page).find('#venueSearchQuery').val()
		console.log $(page).find('#venueSearchQuery')
		console.log query
		if query
			getBars query, (err, venues) ->
				venues.forEach (venue) ->
					console.log(render('venue_listitem', {name: 'Bar', imageUrl: null, description: 'Cool'}))

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
