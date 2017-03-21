/* Importing variables as lets to our required imports */
let express = require('express');
let router = express.Router();
let Park = require('../models/park');
import "isomorphic-fetch";

/* using a router function with the params of req res and next */
router.use(function(req, res, next){
  res.setHeader('Content-Type', 'application/json');
  next();
});

router.route('/')
  .get(function(req, res, next){
    Park.find(function(err, parks){
      if (err) {
        return next(err);
      } else {
        res.json(parks);
      }
    });
  });

/* Using the router route to initiate the parks database via a get function with
the params of req, res and next, a fetch function is used from the NP parks API with a
Get method specif*/
router.route('/initiateparksdb')
  .get(function(req, res, next){
    fetch(`https://developer.nps.gov/api/v0/parks?q=National%20Park&limit=522`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': '52929D86-F381-4EF0-B9F2-57282E5A9921'
      }
    })
      .then(result => result.json())
      .then(data => {
        data.data.forEach(function(park){
          let newPark = new Park();
          newPark.states = park.states;
          newPark.latLong = park.latLong;
          newPark.description = park.description;
          newPark.designation = park.designation;
          newPark.parkCode = park.parkCode;
          newPark.id = park.id;
          newPark.directionsInfo = park.directionsInfo;
          newPark.directionsUrl = park.directionsUrl;
          newPark.fullName = park.fullName;
          newPark.url = park.url;
          newPark.weatherInfo = park.weatherInfo;
          newPark.name = park.name;

          newPark.save(function(err, park, next){
            if(err){
              return next(err);
            }
          });
        });
      }).then(res.json({confirm: "Parks initialized"}));
  });



module.exports = router;
