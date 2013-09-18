var User = Parse.Object.extend("User");
var PASSWORD = 'password';

function addUser(kikUser, callback) {
	user = new User();
	kikUser.password = PASSWORD;
	API.log(':addUser: ' + inspect(kikUser));

	user.save(kikUser,
		{
			success: function(user) {
				callback && callback(null, user);
			},
			error: function(user, err) {
				console.log('ERR:' + err.message);
				callback && callback(err);
			}
		});
}

function updateOrAddUser(kikUser, callback) {
	var query = new Parse.Query(User);
	API.log(':updateOrAddUser: ' + inspect(kikUser));
	query.equalTo('username', kikUser.username);
	query.find({
		success: function(results) {
			API.log(':updateOrAddUser: results:' + inspect(results));
			if (!results || results.length === 0) {
				addUser(kikUser, callback);
			} else {
				var user = results[0];
				API.log(':updateOrAddUser: results:' + inspect(results[0]));
				user.set('long', kikUser.long);
				user.set('lat', kikUser.lat);
				user.set('password', PASSWORD);
				user.save();

				user.save(null, {
					success: function(user) {
						callback && callback(null, user);
					}
				});
			}
		},
		error: function(err) {
			console.log("Err retreiving user: " + err);
			callback && callback(err);
		}
	});
}