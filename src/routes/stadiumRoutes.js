/* Importing variables as lets to our required imports */
import express from 'express';
import Stadium from '../models/Stadium';
import "isomorphic-fetch";

let router = express.Router();

/* using a router function with the params of req res and next */
router.use(function(req, res, next){
  res.setHeader('Content-Type', 'application/json');
  next();
});

/* Using the router route to initiate the parks database via a get function with
the params of req, res and next, a fetch function is used from the NP parks API with a
Get method specif*/
router.route('/')
  .get(function(req, res, next){
    Stadium.find(function(err, stadiums){
      if (err) {
        return next(err);
      } else {
        res.json(stadiums);
      }
    });
  })

  .post(function(req, res, next){
    let newStadium = new Stadium();
    newStadium.name = "Rogers Centre";
    newStadium.team = "Toronto Blue Jays";
    newStadium.state = "ONT";
    newStadium.save(function(err, stadium, next){
      if(err){
        return next(err);
      }
    });
  });


module.exports = router;
