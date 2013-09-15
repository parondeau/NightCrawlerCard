((App) ->
	App.populator "home", (page) ->
		if navigator.geolocation
			navigator.geolocation.getCurrentPosition (success) ->
					console.log success
					$('.app-content').append "long: " + success.coords.longitude + " lat: " + success.coords.latitude
				, (err) -> 
					console.log("f")
	
	App.populator "page2", (page) ->
		console.log "test2"
	
	try
		App.restore()
	catch err
		App.load "home"
) App