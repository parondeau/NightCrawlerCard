((App) ->
				
	kikItCard = ->
		API.log "kikItCard"
		if cards.kik
			API.log "Inside"
			# send a message
			cards.kik.send
				title: "Test1"
				text: "Test2"
				noForward: false

			API.log "AFTER"
				# pic: venue.photo
				# data: 
				# 	venue: venue

	App.populator "home", (page) ->
		if navigator.geolocation
			navigator.geolocation.getCurrentPosition (success) ->
					console.log success
					# $('.app-content').append "long: " + success.coords.longitude + " lat: " + success.coords.latitude
				, (err) -> 
					console.log err

		# $(page).find('#kikEm').on 'mousedown', (e) ->
		# 	$("#kikEm").addClass("active")
		# 	kikItCard()
		$(page).find('#kikEm').on 'touchstart', (e) ->
			$("#kikEm").addClass("active")
			kikItCard()
		$(page).find('#kikEm').on 'touchend', (e) ->
			$("#kikEm").removeClass("active")

		$(page).find('#kikEm').on 'mouseup', (e) ->
			$("#kikEm").removeClass("active")
		$(page).find('#kikEm').on 'mouseleave', (e) ->
			$("#kikEm").removeClass("active")
	try
		App.restore()
	catch err
		App.load "home"
) App
