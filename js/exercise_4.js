// Here is the javascript setup for a basic map:

// Enter your mapbox map id here to reference it for the base layer,
// this one references the ugly green map that I made.
var mapId = 'minwong.019i8kk0';

// And this is my access token, use yours.
var accessToken = 'pk.eyJ1IjoibWlud29uZyIsImEiOiJjaW02cDMxbGIwMnhkdWptM3FvZjlucXY2In0.Td3u5SJ7rGvsp_OAUrRggA';

// Create the map object with your mapId and token,
// referencing the DOM element where you want the map to go.
L.mapbox.accessToken = accessToken;
var map = L.mapbox.map('map', mapId);

// Set the initial view of the map to the whole US
map.setView([39, -96], 4);

// Great, now we have a basic web map!

// Adding data in workshop

var dataFileToAdd = 'data/restaurants.geojson';

var featureLayer = L.mapbox.featureLayer();
	featureLayer.loadURL(dataFileToAdd);
	featureLayer.addTo(map);

featureLayer.on('ready', function(){
	this.eachLayer(function(layer){
    	layer.setIcon(L.mapbox.marker.icon({
        	"marker-color": "8834bb",
          	"marker-size": "medium", 
          	"marker-symbol": "restaurant"
        }))
    })
	map.fitBounds(featureLayer.getBounds());
})

// featureLayer.on('ready', function(){
//	this.eachLayer(function(layer){
//    layer.bindPopup('Welcome to ' + layer.feature.properties.name);
//    })

//})

var clickHandler = function(e){
  	$('#info').empty();
  
	var feature = e.target.feature;
  
  $('#sidebar').fadeIn(400, function(){
  	var info = '';
    
    info += '<div>';
    info += '<h2>' + feature.properties.name + '</h2>'
    if(feature.properties.cuisine) info +='<p>' + feature.properties.cuisine + '</p>';
    if(feature.properties.phone) info += '<p>' + feature.properties.phone + '</p>';
    if(feature.properties.website) {
      info += '<p><a href="' + feature.properties.website + '">' + feature.properties.website + '</a></p>';
    }
      info += '</div>';
      $('#info').append(info);
                                   
                                  
  })
}
featurelayer.on('ready', function(){
    this.eachLayer(function(layer){
    layer.on('click',clickHandler);
             
             })
  })

  map.on ('click', function(){
  $('#sidebar').fadeOut(200);
  
  })
                     