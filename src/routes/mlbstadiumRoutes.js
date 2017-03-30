/* Importing variables as lets to our required imports */
import express from 'express';
import Mlbstadium from '../models/Mlbstadium';

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
    Mlbstadium.find().sort({name: "ascending"}).exec(function(err, mlbstadiums){
      if (err) {
        return next(err);
      } else {
        res.json(mlbstadiums);
      }
    });
  })
  .post(function(req, res, next){

    let mlbstadium = new Mlbstadium();

    mlbstadium.name = "Rogers Centre";
    mlbstadium.description = "Toronto Blue Jays";
    mlbstadium.state = "ONT";

    mlbstadium.save(function(err, user, next){
      if(err){
        next(err);
      } else {
        res.json(mlbstadium);
      }
    });
  });


module.exports = router;
