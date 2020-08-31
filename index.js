// Run the script below when window loads.
init();

function init() {
	
	d3.csv('data_DUMMY.csv', function(data){
		console.log(data)
	});
	
	buildMap(features)
	
	function buildMap(features) {

			// Create a map. Will have to add an accessToken that is specific for this project.
			// TO DO: FIGURE OUT MAP TOKEN (JULIA)
			mapboxgl.accessToken = 'pk.eyJ1IjoianVsY29ueiIsImEiOiJja2N0NGU3eGkwZGtqMnJxbGM0dXM4am50In0.mlekGyVVwR95ATKGkcISOg';
			var map = new mapboxgl.Map({
				container: 'map',
				style: 'mapbox://styles/mapbox/streets-v11',
				center: [-75.68912, 45.40914],
				zoom: 5,
				maxZoom: 14,
				minZoom: 10,
				hash: true,
				maxBounds: [-168.39312,40.713956,-50.971241,83.359511] // TO DO: UPDATE THIS WITH JUST OTTAWA BOUNDS, NOT CANADA (JULIA/MELISSA)
			});
			
			map.on('load', function(){
				console.log(features)
				// Create data source to store the features that were collected from the Excel spreadsheet.
				map.addSource('data', {
					'type': 'geojson',
					'data': {
						'type': 'FeatureCollection',
						'features': features
					}
				});
				
				// Add a new map layer from the above data source. This layer represents the sites.
				map.addLayer({
						'id': 'sites',
						'type': 'circle',
						'source': 'data',
						'paint': { // TO DO: ADD LOGIC TO MAKE POINTS COLOURED BASED ON A VALUE. TO BE DISCUSSED B/W MELISSA AND JULIA.
							'circle-radius': 10, // change size of circle
							'circle-stroke-width': 0.3, // outline colour
							'circle-stroke-color': '#ccc',
							'circle-color': [
								'match',
								['get', 'Quality'],
								'Low Risk',
								'#00C851',
								'High Risk',
								'#ff4444',
								/* other */ '#ccc'
							]
						}
					});
			});
			
			// Initialize a popup for the map.
			var popup;

			// Create hover events so that when a user hover's over point (mouseenter), the popup appears.
			map.on('mouseenter', 'sites', function(e) {
				var text,
					content;
					
				map.getCanvas().style.cursor = 'pointer';
			
				// Set popup text.
				content = '<h2>' + e.features[0].properties.Location + '</h2>';
				
				// Depending on the air quality type, make the colours of the popup different.
				if (e.features[0].properties.Quality == 'Low Risk') {
					content += '<h3 style="background-color: #00C851;">' + e.features[0].properties.Quality.toUpperCase() + '</h3>';
				} else if (e.features[0].properties.Quality == 'High Risk') {
					content += '<h3 style="background-color: #ff4444;">' + e.features[0].properties.Quality.toUpperCase() + '</h3>';
				} else {
					content += '<h3 style="background-color: #ccc;">' + e.features[0].properties.Quality.toUpperCase() + '</h3>';
				}
				
				content += buildTable([e.features[0].properties.Time.toString(), e.features[0].properties.Temp, e.features[0].properties.Humidity],['Date', 'Temperature (C)', 'Humidity (%)']);

				popup = new mapboxgl.Popup({
					 closeButton: false,
					 closeOnClick: false,
					 className: e.features[0].properties.Quality.split(' ').join('_').toLowerCase()
				});

				// Populate popup content.
				popup.setLngLat(e.features[0].geometry.coordinates)
					.setHTML(content)
					.addTo(map);
			});
			
			// And when a user leaves a point (mouseleave), the popup disappears.
			map.on('mouseleave', 'sites', function(e) {
				map.getCanvas().style.cursor = '';
				popup.remove();
			});
	}   
}

function aqi(val) {
	if (val <= 3) {
		return "Low Risk";
	} else if (val <= 6) {
		return "Moderate Risk";
	} else if (val <= 10) {
		return "High Risk";
	} else {
		return "Very High Risk";
	}
}

// Function that builds a table view of the specified variable names that should appear in the map point's popup.
function buildTable(valArr, nameArr) {
	var rows = '';
	for (var i in valArr) {
		rows += '<tr><td><strong>'+ nameArr[i]+':</strong></td><td>' + valArr[i] + '</td></tr>';
	}
	var tbl = '<table>' + rows + '</table>';
	return tbl;
}
