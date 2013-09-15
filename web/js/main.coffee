this.barsList = null
((App) ->
	onSearch = (page) ->
		query = $(page).find('#venueSearchQuery').val()
		if query
			getBars query, (err, venues) ->
				this.barsList = venues
				listitems = ""
				venues.forEach (venue, index) ->
					listitems += render('venue_listitem', {index: index, name: venue.name, id: venue.id, location: venue.location.address})
				$(page).find("#venuesList").html listitems
				lazyLoad()

	kikItCard = ->
		if cards.kik
			# send a message
			cards.kik.send
				title: 'test1'
				text: 'test2'
				pic: 'http://4.bp.blogspot.com/-j49xTVdZe7g/TVnmq6phXxI/AAAAAAAABpA/Pm45FErBfQQ/s400/hopkins%2Bduck.jpg'
				noForward: false
				data: {someData: "json"}

	restoreAppSession = ->
		try
			App.restore()
		catch err
			App.load "home"

	App.populator "home", (page) ->
		$(page).find('#venueSearchButton').on 'click', (event) ->
			onSearch page
		if navigator.geolocation
			navigator.geolocation.getCurrentPosition (success) ->
					console.log success
					# $('.app-content').append "long: " + success.coords.longitude + " lat: " + success.coords.latitude
				, (err) -> 
					console.log err
	
	App.populator "venuePage", (page, venue) ->
		$(page).find('#kikBtn').on 'click', kikItCard
		done = (venue) ->
			$(page).find('#venueName').text venue.name
			$(page).find('#venueDesc').text venue.description
			$(page).find('#venuePhoto')[0].src = venue.photo

		if (venue.external)
			console.log('external')
		else if (barsList)
			venueIndex = venue.index
			venue = barsList[venue.index];
			if not venue.description or not venue.photo
				getBarData venueIndex, (err, venue) ->
					return done venue
		done venue
		
	if not cards.kik or not cards.kik.message
		restoreAppSession()
	else
		console.log cards.kik.message.someData
		App.load "venuePage", cards.kik.message
) App
