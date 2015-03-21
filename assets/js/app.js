L.mapbox.accessToken = 'pk.eyJ1IjoiaG9ja2V5ZHVjazMwIiwiYSI6InE4cmFHNlUifQ.X5m_TSatNjZs6Vc7B3_m2A';
var map = new L.mapbox.Map('map-container', 'hockeyduck30.ldbmm85b', {
	  infoControl        : false,
	  attributionControl : true,
	  center             : [39.2282, -98.5795],
	  zoom               : 4
});

var markers = new L.MarkerClusterGroup({ 
	showCoverageOnHover: false,
	disableClusteringAtZoom: 8
});

$.getJSON("institutions.geojson", function(data) {
  var geojson = L.geoJson(data, {
	  pointToLayer: L.mapbox.marker.style,
	  onEachFeature: function (feature, layer) {
		    var html = '';
		    if (feature.properties.title) {
		      html += '<h3>' + feature.properties.title + '</h3>';
		    }
		    if (feature.properties.location) {
		        html += '<p>'+ feature.properties.location + '</p>';
		    }
		    if (feature.properties.description) {
		      html += '<p>' + feature.properties.description + '</p>';
		    }
		    if (feature.properties.contact) {
		        html += '<p><a href="mailto:'+ feature.properties.contact + '">' + 'Contact' + '</a> | <a href="'+ feature.properties.web + '" target="_blank">' + 'Website' + '</a></p>';  
		      }
		    else {
		    	html += '<p><a href="'+ feature.properties.web + '" target="_blank">' + 'Website' + '</a></p>'; 
		    }
		    layer.bindPopup(html);
	  }
  });
  markers.addLayer(geojson);
  markers.addTo(map);
});