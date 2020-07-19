window.onload = function() {init()};

function init() {
	
	// mapboxgl.accessToken = 'pk.eyJ1IjoianVsY29ueiIsImEiOiJja2N0NGU3eGkwZGtqMnJxbGM0dXM4am50In0.mlekGyVVwR95ATKGkcISOg';
	// var map = new mapboxgl.Map({
	//   container: 'map',
	//   style: 'mapbox://styles/mapbox/streets-v11',
	//   center: [-99.93, 54.32],
	//   zoom: 4,
	//   maxZoom: 10,
	//   minZoom: 3
	//   // hash: true,
	//   // maxBounds: [-168.39312,40.713956,-50.971241,83.359511]
	// });
	
	// map.on('load', function(){
	// 	// load map
	// 	// renderMap(features);
	// })
}

var features = [];
var years = [];

// function showInfo(data) { // function to show data from Google Sheet
// 
// 	var places = []; 
// 
// 	data.forEach(function(data) {
// 		if (data.community){	
// 			places.push(data.community)
// 		}
// 	});
// 
// 	function join_tables(gov_fn, data){
// 		for (var i in data) {
// 			for (var j in gov_fn){
// 				if (data[i].first_nation == gov_fn[j].BAND_NAME) {
// 					data[i].coordinates = [Number(gov_fn[j].LONGITUDE)] 
// 					data[i].coordinates.push(Number(gov_fn[j].LATITUDE))
// 				}
// 			}
// 		}
// 		return data;
// 	}
// 
// 	// filter by time
// 	function filterBy(year, total){
// 		var filters = ['<=', 'year', year];
// 		map.setFilter('water-advisories', filters);
// 		document.getElementById('year').textContent = 'Recorded advisories since ' + year;
// 		if (total == 1) {
// 			document.getElementById('stats').innerHTML = total + ' advisory in ' + year;
// 		} else {
// 			document.getElementById('stats').innerHTML = total + ' advisories in ' + year;
// 		}
// 	}
// 
// 	// render map
// 	function renderMap(features) {
// 
// 		// add data as a geojson source
// 		map.addSource('markers', {
// 			type: 'geojson',
// 			data: {
// 				'type': 'FeatureCollection',
// 				'features': features
// 			}
// 		});
// 
// 		// make labels on top of new layer
// 		var labels,
// 			layers = map.getStyle().layers;
// 
// 	    for (var i = 0; i < layers.length; i++) {
// 	        if (layers[i].type === 'symbol') {
// 	            labels = layers[i].id;
// 	            break;
// 	        }
// 	    }
// 
// 		// add sites data as a layer
// 		map.addLayer({
// 			id: 'sites',
// 			type: 'circle',
// 			source: 'markers',
// 			paint: {
// 				'circle-stroke-color': {
// 					property: 'date_revoked',
// 					default: '#1494A8',
// 					type: 'categorical',
// 					stops: [
// 						['None', '#e04763'],
// 					]
// 				},
// 				'circle-color': {
// 					property: 'advisory_type',
// 					type: 'categorical',
// 					default: '#e04763',
// 					stops: [
// 						['BWA', '#C6BDB0'],
// 						['DNC', '#635F58'],
// 						['BWO', '#C6BDB0']
// 					]
// 				},
// 				'circle-stroke-width': {
// 					property: 'advisory_type',
// 					type: 'categorical',
// 					default: 3,
// 					stops: [
// 						['BWA', 3],
// 						['DNC', 3]
// 					]
// 				}
// 			}
// 		}, labels);
// 
// 		// initial filter
// 		filterBy(years[0], 1);
// 
// 		// create popup
// 		var popup = new mapboxgl.Popup({
// 	        closeButton: false,
// 	        closeOnClick: false
// 	    });
// 
// 		// hover events for popup
// 		map.on('mouseenter', 'sites', function(e) {
// 			var text;
// 			map.getCanvas().style.cursor = 'pointer';
// 
// 			// set popup text
// 			text = '<h2>' + e.features[0].properties.description + '</h2><h3>Date Set: ' + e.features[0].properties.date_set + '<br>Date Revoked: ' + e.features[0].properties.date_revoked + '</h3>';
// 
// 			// populate popup content
// 			popup.setLngLat(e.features[0].geometry.coordinates)
// 				.setHTML(text)
// 				.addTo(map);
// 		});
// 
// 		map.on('mouseleave', 'sites', function(e) {
// 			map.getCanvas().style.cursor = '';
// 			popup.remove();
// 		});
// 
// 		// when time slider is moved filter the data
//         document.getElementById('slider').addEventListener('input', function(e) {
//             var total = 0;
//             features.forEach(function(feature) {
//             	if (feature.properties.year == years[e.target.value]){
//             		total +=  1;
//             	}
//             });
//             filterBy(years[e.target.value], total);
//         });
// 	}
// }
