((App) ->
	onSearch = (page) ->
		query = $(page).find('#venueSearchQuery').val()
		console.log $(page).find('#venueSearchQuery')
		console.log query
		if query
			getBars query, (err, venues) ->
				venues.forEach (venue) ->
					console.log(render('venue_listitem', {name: 'Bar', imageUrl: null, description: 'Cool'}))

	kikItCard = ->
		# send a message
		cards.kik.send
			title: 'test1'
			text: 'test2'
			pic: 'http://4.bp.blogspot.com/-j49xTVdZe7g/TVnmq6phXxI/AAAAAAAABpA/Pm45FErBfQQ/s400/hopkins%2Bduck.jpg'
			noForward: false
			data: {some: "json"}

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
	
	restoreAppSession = ->
		try
			App.restore()
		catch err
			App.load "home"

	if not cards.kik
		restoreAppSession()
	else 
		if not cards.kik.message
			restoreAppSession()
		else
			alert cards.kik.message 
			$(".specificDescriptionInner p").append "yes?"
			# App.load 
) App
