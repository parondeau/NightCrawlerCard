var CLIENT_ID = 'K3POJ3HZJ5CM5QKVNIOT4CSJZBN3K4ERJWKQDSZRPAU0OV13',
		CLIENT_SECRET = '5PHTEPTBXOKA02PNOZRUQWIFZVFIJQR2A0D4CEGTGY40U0NA';

function getBars(near, callback) {
	var baseUrl = "https://api.foursquare.com/v2/venues/search?",
			authParam = "client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET,
			queryParam = "categoryId=4bf58dd8d48988d116941735,4bf58dd8d48988d11f941735",
			dateParam = "v=20130915",
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
	});
}