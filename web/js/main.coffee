((App) ->
				
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

	App.populator "home", (page) ->
		if navigator.geolocation
			navigator.geolocation.getCurrentPosition (success) ->
					console.log success
					# $('.app-content').append "long: " + success.coords.longitude + " lat: " + success.coords.latitude
				, (err) -> 
					console.log err
	try
		App.restore()
	catch err
		App.load "home"
) App
