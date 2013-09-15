var CLIENT_ID = 'K3POJ3HZJ5CM5QKVNIOT4CSJZBN3K4ERJWKQDSZRPAU0OV13',
		CLIENT_SECRET = '5PHTEPTBXOKA02PNOZRUQWIFZVFIJQR2A0D4CEGTGY40U0NA';

function getBars(near, callback) {
	var baseUrl = "https://api.foursquare.com/v2/venues/search?",
			authParam = "client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET,
			queryParam = "categoryId=4bf58dd8d48988d116941735,4bf58dd8d48988d11f941735&limit=10",
			dateParam = "v=20130915",
			requestUrl = baseUrl + authParam + '&' + queryParam + '&' + dateParam;
	$.getJSON(requestUrl + '&near=' + near, function(data) {
		if (data.meta.code == 200) {
			var remaining = data.response.venues.length,
					completeVenues = [];
			data.response.venues.forEach(function(venue) {
				var url = "https://api.foursquare.com/v2/venues/" + venue.id + "/photos?" + authParam + "&" + dateParam;
				$.getJSON(url, function(data) {
					remaining--;
					if (data.meta.code == 200 && data.response.photos.groups) {
						for (var i = data.response.photos.groups.length - 1; i >= 0; i--) {
							var group = data.response.photos.groups[i];
							if (group.type == 'venue' && group.count > 0) {
								// venue.photo = group.items
							}
						};
					} 
					completeVenues.append(venue);
					if (remaining === 0) {
						callback(null, completeVenues);
					}
				});
			});
			// data.response.venues.forEach(function(venue) {
			// 	console.log(venue);
			// });
		} else {
			callback(data.meta);
		}
	});
}

function render(tmpl_name, tmpl_data) {
		if ( !render.tmpl_cache ) { 
				render.tmpl_cache = {};
		}

		if ( ! render.tmpl_cache[tmpl_name] ) {
				var tmpl_dir = '/templates';
				var tmpl_url = tmpl_dir + '/' + tmpl_name + '.html';

				var tmpl_string;
				$.ajax({
						url: tmpl_url,
						method: 'GET',
						async: false,
						success: function(data) {
								tmpl_string = data;
						}
				});

				render.tmpl_cache[tmpl_name] = _.template(tmpl_string);
		}

		return render.tmpl_cache[tmpl_name](tmpl_data);
}