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
					API.log "long: " + success.coords.longitude + " lat: " + success.coords.latitude
					cards.kik.getUser (user) ->
						if (!user)
							return;

						user.long = success.coords.longitude;
						user.lat = success.coords.latitude;
						updateOrAddUser user;
				, (err) -> 
					console.log err
	try
		App.restore()
	catch err
		App.load "home"
) App
