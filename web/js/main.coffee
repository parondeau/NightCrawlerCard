((App) ->
	App.populator "home", (page) ->
		navigator.geolocation.getCurrentPosition (success) ->
				console.log success
				$('.app-content').append "long: " + success.coords.longitude + " lat: " + success.coords.latitude
			, (err) -> 
				console.log("f")
		console.log "test1"

	
	# put stuff here
	App.populator "page2", (page) ->
		console.log "test2"
	
	# put stuff here
	try
		App.restore()
	catch err
		App.load "home"
) App