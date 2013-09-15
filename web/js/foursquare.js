
var CLIENT_ID = 'K3POJ3HZJ5CM5QKVNIOT4CSJZBN3K4ERJWKQDSZRPAU0OV13',
		CLIENT_SECRET = '5PHTEPTBXOKA02PNOZRUQWIFZVFIJQR2A0D4CEGTGY40U0NA',
		authParam = "client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET,
		dateParam = "v=20130915";

function getBars(near, callback) {
	var baseUrl = "https://api.foursquare.com/v2/venues/search?",
			queryParam = "categoryId=4bf58dd8d48988d116941735,4bf58dd8d48988d11f941735",
			requestUrl = baseUrl + authParam + '&' + queryParam + '&' + dateParam;
	$.getJSON(requestUrl + '&near=' + near, function(data) {
		if (data.meta.code == 200) {
			callback(null, data.response.venues);
			// data.response.venues.forEach(function(venue) {
			// 	console.log(venue);
			// });
		} else {
			callback(data.meta);
		}
	})
	.fail(function(err){
		error = JSON.parse(err.responseText);
		if (error.meta.code == 400){
			$(".app-section").first().addClass("invalid");
		}
	});
}

function getBarImage(index, callback) {
	if (barsList[index].photo) {
		callback(null, barsList[index].photo);
	} else {
		getBarData(index, function(err, venue) {
			if (!err) callback(null, venue.photo);
		});
	}
}

function getBarData(index, callback) {
	var url = "https://api.foursquare.com/v2/venues/" + barsList[index].id + "?" + authParam + "&" + dateParam;
	$.getJSON(url, function(data) {
		if (data.meta.code == 200 && data.response.venue) {
			var photo = data.response.venue.photos.groups[0].items[0],
					photoUrl = (photo) ? photo.prefix + '200x200' + photo.suffix : null;
			barsList[index].photo = photoUrl;
			barsList[index].description = data.response.venue.description || "";
			barsList[index].url = data.response.venue.shortUrl
			callback(null, barsList[index]);
		} 
	});
}