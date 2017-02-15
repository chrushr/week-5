/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */
// We set this to HTTP to prevent 'CORS' issues
$(document).ready(function() {
  var map = L.map('map', {
    center: [39.9522, -75.1639],
    zoom: 14
  });
  var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
  }).addTo(map);

$( 'button' ).click(function() {

var url = $('#text-input1').val()
var lat = $('#text-input2').val()
var lng = $('#text-input3').val()

var downloadData = $.ajax(url);
var parseData = function(downloadData) {
  var PData=JSON.parse(downloadData);
  var PData2 = _.filter(PData, function(num){
  return num.LAT>1
  });
 console.log(PData2);
  return PData2;
};
var makeMarkers = function(data) {
  var markers= [];
  console.log(data);
  _.each(data, function(obj){

    markers.push(L.marker([obj[lat],obj[lng]]))
    //
    // // console.log(obj);
    // if (lng == "LNG" && lat == "LAT"){
    //  markers.push(L.marker([obj.LAT,obj.LNG]))
    // }
    // else if (lat == "Y" || lng == "LONG\_"){
    //  markers.push(L.marker([obj.Y,obj.X]))
    // }
    // else {
    //   markers.push(L.marker([obj.Lat,obj.Lng]))
    // };
  })
  return markers;
};
var plotMarkers = function(marker) {
  _.each(marker, function(num){
    num.addTo(map);
  });
};


/* =====================
  Define the function removeData so that it clears the markers you've written
  from the map. You'll know you've succeeded when the markers that were
  previously displayed are immediately removed from the map.

  In Leaflet, the syntax for removing one specific marker looks like this:

  map.removeLayer(marker);

  In real applications, this will typically happen in response to changes to the
  user's input.
===================== */

// var removeMarkers = function(marker) {
//    _.each(marker,function(obj){
//   map.removeLayer(obj);
// });
// };

/* =====================
  Optional, stretch goal
  Write the necessary code (however you can) to plot a filtered down version of
  the downloaded and parsed data.

  Note: You can add or remove from the code at the bottom of this file.
===================== */

/* =====================
 Leaflet setup - feel free to ignore this
===================== */


/* =====================
 CODE EXECUTED HERE!
===================== */

downloadData.done(function(data) {
  var parsed = parseData(data);
  var markers = makeMarkers(parsed);
  // console.log(data);
  plotMarkers(markers);
  console.log(markers);
  //  removeMarkers(markers);
});

});

})
