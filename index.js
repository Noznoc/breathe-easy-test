// Run the script below when window loads.
init();

function init() {
	
	// Initialize global variables.
	var features_total = [],
		raw = [],
		features_morning = [],
		features_afternoon = [],
		features_weekday = [],
		features_weekend = [];
	
	// Names of data layers that will appear on the map. The current layers represent averages.
	var layers = ['total', 'morning', 'afternoon', 'weekday', 'weekend'];
	
	// Read data from the following spreadsheet. Update the file name to have the code read a different CSV file.
	d3.csv('data_20200919.csv', function(row){
		// The following if statements are used to prepare the CSV data into the correct GEOJSON format for the map. There is an if statement per each map data layer (each average category).
		
		// Add "Total Average" value as a map layer
		if (row["Type"] == "Total Average") {
			 var feature = '{"type": "Feature","properties": {"Location": "' + row["Location"] + '", "Quality": "'+ row["AQ_Map"] +'", "Site": "'+ row["Site"] +'"},"geometry": {"type": "Point","coordinates": ['+row["Longitude[deg]"]+','+row["Latitude[deg]"]+']}}';
			 features_total.push(JSON.parse(feature));
		}
		
		// Add "Morning Average" value as a map layer.
		if (row["Type"] == "Morning Average") {
			 var feature = '{"type": "Feature","properties": {"Location": "' + row["Location"] + '", "Quality": "'+ row["AQ_Map"] +'", "Site": "'+ row["Site"] +'"},"geometry": {"type": "Point","coordinates": ['+row["Longitude[deg]"]+','+row["Latitude[deg]"]+']}}';
			 features_morning.push(JSON.parse(feature));
		}
		
		// Add "Afternoon Average" value as a map layer.
		if (row["Type"] == "Afternoon Average") {
			 var feature = '{"type": "Feature","properties": {"Location": "' + row["Location"] + '", "Quality": "'+ row["AQ_Map"] +'", "Site": "'+ row["Site"] +'"},"geometry": {"type": "Point","coordinates": ['+row["Longitude[deg]"]+','+row["Latitude[deg]"]+']}}';
			 features_afternoon.push(JSON.parse(feature));
		}
		
		// Add "Weekend Average" value as a map layer.
		if (row["Type"] == "Weekend Average") {
			 var feature = '{"type": "Feature","properties": {"Location": "' + row["Location"] + '", "Quality": "'+ row["AQ_Map"] +'", "Site": "'+ row["Site"] +'"},"geometry": {"type": "Point","coordinates": ['+row["Longitude[deg]"]+','+row["Latitude[deg]"]+']}}';
			 features_weekend.push(JSON.parse(feature));
		}
		
		// Add "Weekday Average" value as a map layer.
		if (row["Type"] == "Weekday Average") {
			 var feature = '{"type": "Feature","properties": {"Location": "' + row["Location"] + '", "Quality": "'+ row["AQ_Map"] +'", "Site": "'+ row["Site"] +'"},"geometry": {"type": "Point","coordinates": ['+row["Longitude[deg]"]+','+row["Latitude[deg]"]+']}}';
			 features_weekday.push(JSON.parse(feature));
		}

		if ((row["AQ_Map"].length > 0) && (row["Type"].length > 0) && (row["Type"] == "Weekday Average" || row["Type"] == "Weekend Average" || row["Type"] == "Total Average" || row["Type"] == "Morning Average" || row["Type"] == "Afternoon Average")) {
			// Downloadable data.
			var rawRow = '{"type": "Feature","properties": {"Type": "'+ row["Type"] +'", "Location": "' + row["Location"] + '", "Air Quality": "'+ row["AQ_Map"] +'", "Site": "'+ row["Site"] +'", "Longitude": "'+ row["Longitude[deg]"] + '", "Latitude": "'+ row["Latitude[deg]"] + '", "PM2.5[ug/m^3]": "' + row["PM2.5[ug/m^3]"] + '", "PM10.0[ug/m^3]": "' + row["PM10.0[ug/m^3]"] + '", "O3[ppb]": "' + row["O3[ppb]"] + '", "NO2[ppb]": "' + row["NO2[ppb]"] + '"}}';
			raw.push(JSON.parse(rawRow)); 
		}
	});
	
	// Create a geojsons per each map layer's features
	
	const geojson_total = {
		'type': 'geojson',
		'data': {
			'type': 'FeatureCollection',
			'features': features_total
		}
	};
	
	const geojson_morning = {
		'type': 'geojson',
		'data': {
			'type': 'FeatureCollection',
			'features': features_morning
		}
	};
	
	const geojson_afternoon = {
		'type': 'geojson',
		'data': {
			'type': 'FeatureCollection',
			'features': features_afternoon
		}
	};
	
	const geojson_weekend = {
		'type': 'geojson',
		'data': {
			'type': 'FeatureCollection',
			'features': features_weekend
		}
	};
	
	const geojson_weekday = {
		'type': 'geojson',
		'data': {
			'type': 'FeatureCollection',
			'features': features_weekday
		}
	};
	
	// Function to build the map with all the map data layers.
	buildMap(geojson_total, geojson_weekend, geojson_weekday, geojson_morning, geojson_afternoon);
	
	// Function is called when user clicks the download data button. Run the downloadData function in src/download.js
	$('#download').on('click', function(){
		downloadData(raw);
	});
	
	// Function that does the following: initializes the map, adds the data sources, adds the data sources as layers, adds popups per each layer, and toggles visibility of map layers
	function buildMap(geojson_total, geojson_weekend, geojson_weekday, geojson_morning, geojson_afternoon) {
					
			// Create a map. Will have to add an accessToken that is specific for this project.
			// TO DO: FIGURE OUT MAP TOKEN (JULIA)
			mapboxgl.accessToken = 'pk.eyJ1IjoianVsY29ueiIsImEiOiJja2N0NGU3eGkwZGtqMnJxbGM0dXM4am50In0.mlekGyVVwR95ATKGkcISOg';
			var map = new mapboxgl.Map({
				container: 'map',
				style: 'mapbox://styles/mapbox/streets-v11',
				center: [-75.68912, 45.40930],
				zoom: 9,
				maxZoom: 14,
				minZoom: 9,
				hash: true,
				maxBounds: [-76.239644,45.251700,-75.372410,45.535233]
			});
			
			map.on('load', function(){

				// Create data source to store the features that were collected from the Excel spreadsheet: total, weekend, weekday averages.
				map.addSource('total', geojson_total);
				map.addSource('weekend', geojson_weekend);
				map.addSource('weekday', geojson_weekday);
				map.addSource('morning', geojson_morning);
				map.addSource('afternoon', geojson_afternoon);
				
				// Color palette for air quality classes.
				const circleColor = [
					'match',
					['get', 'Quality'],
					'Low Risk',
					'#00C851',
					'Moderate Risk',
					'#FF8800',
					'High Risk',
					'#ff4444',
					'Very High Risk',
					'#CC0000',
					/* other */ '#ccc'
				];
				
				// Color palette for Site A and B.
				const siteColor = [
					'match',
					['get', 'Site'],
					'Site A',
					'#000',
					'Site B',
					'#90a4ae',
					/* other */ '#ccc'
				];
				
				for (var i in layers) {
					// Add a new map layer from the above data source. This layer represents the sites.
					map.addLayer({
						'id': layers[i],
						'type': 'circle',
						'source': layers[i],
						'paint': {
							'circle-radius': 10, // change size of circle
							'circle-stroke-width': 2, // outline colour
							'circle-stroke-color': siteColor,
							'circle-color': circleColor
						}
					});
				}
				
				$('#toggle select').val('total');
				changeLayer('total');
				
			});
			
			// Function for toggling between different map data layers (i.e., the average values).
			$('#toggle select').on('change', function(e){
				e.preventDefault();
  			e.stopPropagation(); 
				var selectedLayer = $(this).val();
				changeLayer(selectedLayer)
			});
			
			function changeLayer(layer) {
				for (var i = 0; i < layers.length; i++) {
			     if (layer === layers[i]) {
			       map.setLayoutProperty(layers[i], 'visibility', 'visible');
			     }
			     else {
			       map.setLayoutProperty(layers[i], 'visibility', 'none');
			     }
			   }
				
				// Create popup for new layer
				createPopup(layer);
			}
			
			function createPopup(layer) {
				// Initialize a popup for the map.
				var popup;

				// Create hover events so that when a user hover's over point (mouseenter), the popup appears.
				map.on('mouseenter', layer, function(e) {
					var text,
						content;

					map.getCanvas().style.cursor = 'pointer';
				
					// Set popup text.
					content = '<h2>' + e.features[0].properties.Site + ': ' + e.features[0].properties.Location + '</h2>';
					
					// Depending on the air quality type, make the colours of the popup different.
					if (e.features[0].properties.Quality == 'Low Risk') {
						content += '<h3 style="background-color: #00C851;">' + e.features[0].properties.Quality.toUpperCase() + '</h3>';
					} else if (e.features[0].properties.Quality == 'Moderate Risk') {
						content += '<h3 style="background-color: #FF8800;">' + e.features[0].properties.Quality.toUpperCase() + '</h3>';
					} else if (e.features[0].properties.Quality == 'High Risk') {
						content += '<h3 style="background-color: #ff4444;">' + e.features[0].properties.Quality.toUpperCase() + '</h3>';
					} else if (e.features[0].properties.Quality == 'Very High Risk') {
						content += '<h3 style="background-color: #CC0000;">' + e.features[0].properties.Quality.toUpperCase() + '</h3>';
					} else {
						content += '<h3 style="background-color: #ccc;">No Data</h3>';
					}
					
					//content += buildTable([e.features[0].properties.Time, e.features[0].properties.Temp, e.features[0].properties.Humidity],['Date', 'Temperature (C)', 'Humidity (%)']);

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
				map.on('mouseleave', layer, function(e) {
					map.getCanvas().style.cursor = '';
					popup.remove();
				});
			}
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
