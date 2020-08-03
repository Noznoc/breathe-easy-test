// Run the script below when window loads.
init();

function init() {
	
	// Initialize value for embedded Excel document.
	var ewa = null;

	// Add event handler for onload event.
	if (window.attachEvent) { 
			window.attachEvent("onload", ewaOnPageLoad);    
	} else { 
			window.addEventListener("DOMContentLoaded", ewaOnPageLoad, false); 
	}
	
	// Add event handler for applicationReady event.
	function ewaOnPageLoad() {
			if (typeof (Ewa) != "undefined") {
				Ewa.EwaControl.add_applicationReady(ewaApplicationReady);
			} else {
				alert("Error - the EWA is not loaded.");
			}
	}

	function ewaApplicationReady() {
			// Get a reference to the Excel Services web part.
			ewa = Ewa.EwaControl.getInstances().getItem(0);
			getData();
	}
	
	function getData() {    
		// Get range for entire Data sheet
		// TO DO: FIGURE OUT HOW TO GET THE ROW LENGTH SHOULD NOT HARD CODE (JULIA)
		// var rows = ewa.getActiveWorkbook().getActiveSheet().getRowCount();
		// console.log(test);
		// The getRange() function parameters: first row, first column, last row, last column. First starts at 0. 
		var range = ewa.getActiveWorkbook().getActiveSheet().getRange(1,0,4,19); // IF MORE DATA IS ADDED, CHANGE 4 TO WHATEVER AMOUNT OF ROWS THERE IS!
		
		// Get values from range.
		range.getValuesAsync(0,buildMap,range);
	}
	
	function buildMap(asyncResult) {
			// Get the value from asyncResult if the asynchronous operation was successful.
			if (asyncResult.getCode() == 0) {
				
				// Get the array of range values from asyncResult.
				var values = asyncResult.getReturnValue(),
						features = [];

				// Loop through the array of range values and prepare each row into a feature. Each feature will then be added to an array of features that will be added into the map as a data source.
				for (var i = 0; i < values.length; i++) {
					 // TO DO: ADD OTHER DATA TO FEATURE FOR MAP (MELISSA)
					 // Essentially add additional keys and values to the "properties" object. 
					 // The following must be the structure of the object: "Column Name / Whatever you want to call it / Text to appear on the Map":"'+values[i][enter column number starting at 0 as column #1]+'".
					 var feature = '{"type": "Feature","properties": {"Location": "' + values[i][17] + '", "Time": "' + new Date(values[i][0]) + '", "Quality": "'+values[i][18]+'"},"geometry": {"type": "Point","coordinates": ['+values[i][12]+','+values[i][11]+']}}';

					 features.push(JSON.parse(feature));
				}

				// Create a map. Will have to add an accessToken that is specific for this project.
				// TO DO: FIGURE OUT MAP TOKEN (JULIA)
				mapboxgl.accessToken = 'pk.eyJ1IjoianVsY29ueiIsImEiOiJja2N0NGU3eGkwZGtqMnJxbGM0dXM4am50In0.mlekGyVVwR95ATKGkcISOg';
				var map = new mapboxgl.Map({
					container: 'map',
					style: 'mapbox://styles/mapbox/streets-v11',
					center: [-75.68912, 45.40914],
					zoom: 4,
					maxZoom: 14,
					minZoom: 12,
					hash: true,
					maxBounds: [-168.39312,40.713956,-50.971241,83.359511] // TO DO: UPDATE THIS WITH JUST OTTAWA BOUNDS, NOT CANADA (JULIA/MELISSA)
				});
				
				map.on('load', function(){
					
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
								'circle-radius': 12,
								'circle-stroke-width': 0.3,
								'circle-stroke-color': '#ccc',
								'circle-color': [
									'match',
									['get', 'Quality'],
									'good',
									'#00C851',
									'bad',
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
					if (e.features[0].properties.Quality == 'good') {
						content += '<h3 style="background-color: #00C851;">' + e.features[0].properties.Quality.toUpperCase() + '</h3>';
					} else if (e.features[0].properties.Quality == 'bad') {
						content += '<h3 style="background-color: #ff4444;">' + e.features[0].properties.Quality.toUpperCase() + '</h3>';
					} else {
						content += '<h3 style="background-color: #ccc;">' + e.features[0].properties.Quality.toUpperCase() + '</h3>';
					}
					
					content += buildTable([e.features[0].properties.Time.toString()],['Date']);

					popup = new mapboxgl.Popup({
						 closeButton: false,
						 closeOnClick: false,
						 className: e.features[0].properties.Quality
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
				
			} else {
				alert('Operation failed with error message ' + asyncResult.getDescription() + '.');
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
