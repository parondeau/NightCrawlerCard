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

	kikItCard = ->
		# send a message
		cards.kik.send
			title: 'test1'
			text: 'test2'
			pic: 'http://4.bp.blogspot.com/-j49xTVdZe7g/TVnmq6phXxI/AAAAAAAABpA/Pm45FErBfQQ/s400/hopkins%2Bduck.jpg'
			noForward: false

	App.populator "home", (page) ->
		$(page).find('#venueSearchButton').on 'click', (event) ->
			onSearch page
		if navigator.geolocation
			navigator.geolocation.getCurrentPosition (success) ->
					console.log success
					# $('.app-content').append "long: " + success.coords.longitude + " lat: " + success.coords.latitude
				, (err) -> 
					console.log err
	
	App.populator "venuePage", (page) ->
		$(page).find('#kikBtn').on 'click', kikItCard
	

	try
		App.restore()
	catch err
		App.load "home"
) App
