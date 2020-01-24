const express = require('express');
var request = require('request');
const config = require('config');

const router = express.Router();


// get the directions 
router.get('/directions', async (req,res,next) => {


  // passing query parameters & getting the geocode of the locations
  let startCoordinates = await getCoordinates(req.query.start);
  let endCoordinates = await getCoordinates(req.query.end);


  // setting query parameters
  let paramsObject = { 
    api_key : config.get('api_key'),
    start:startCoordinates.join(','),
    end:endCoordinates.join(','),
   };
  
  // requesting the ORS for the directions
  request({
    method: 'GET',
    url: config.get('ors.url')+ config.get('ors.restEndPoints.shortest_route'),
    qs: paramsObject,
    headers: {
      'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8'
    }}, function (error, response, body) {
    // console.log('Response:', JSON.parse(body));
    res.send(JSON.parse(body));
    });
})

// This function helps to get the geocode for the location
function getCoordinates(location, callback) {

  // local variables
  let loc = location;
  let coordinates;
  
  // setting query parameters
  var paramsObject = { 
    text : loc,
    api_key : config.get('api_key')
   };

  return new Promise((resolve, reject) => {
    //  requesting the ORS for the coordinates
    request({
      method: 'GET',
      qs:paramsObject,
      url: config.get('ors.url')+ config.get('ors.restEndPoints.geocode_coordinates'),
      headers: {
        'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8'
      }}, (error, response, body) => {
      // taking the first index coordinates in the list of coordinates
      coordinates = JSON.parse(body).features[0].geometry.coordinates;
     
      
      resolve(coordinates);
      });
      // if(error)
      // reject(error);
  });
}

module.exports = router;