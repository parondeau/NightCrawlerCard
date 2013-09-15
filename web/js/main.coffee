@barsList = null
((App) ->
	onSearch = (page) ->
		query = $(page).find('#venueSearchQuery').val()
		if query
			getBars query, (err, venues) ->
				$(".app-section").first().removeClass("invalid");
				@barsList = venues
				listitems = ""
				venues.forEach (venue, index) ->
					listitems += render('venue_listitem', {index: index, name: venue.name, id: venue.id, location: venue.location.address})
				$(page).find("#venuesList").html listitems
				lazyLoad()

	kikItCard = (venue) ->
		if cards.kik
			# send a message
			cards.kik.send
				title: venue.name
				text: venue.description
				pic: venue.photo
				noForward: false
				data: 
					venue: venue

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
		console.log venue
		venueIndex = venue.index
		done = (venue) ->
			$(page).find('#venueName').text venue.name
			$(page).find('#venueDesc').text venue.description
			$(page).find('#venuePhoto')[0].src = venue.photo
			$(page).find('#kikBtn').on 'click', =>
				kikItCard venue


		if venue.external
			$(page).find('#backToHome').on 'click', (e) ->
				App.load('home')
		else if barsList
			venue = barsList[venueIndex];
			if not venue.description or not venue.photo
				getBarData venueIndex, (err, venue) ->
					return done venue
		done venue
		
	if not cards.kik or not cards.kik.message
		restoreAppSession()
	else
		venue = cards.kik.message.venue
		console.log cards.kik.message.venue.name
		App.load "venuePage", {external: true, name: venue.name,  photo: venue.photo,  description: venue.description, location: venue.location}
) App
