((App) ->
  App.populator "home", (page) ->
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