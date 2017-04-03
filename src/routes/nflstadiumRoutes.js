/* Importing variables as lets to our required imports */
import express from 'express';
import Nflstadium from '../models/Nflstadium';

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
    Nflstadium.find().sort({name: "ascending"}).exec(function(err, nflstadiums){
      if (err) {
        return next(err);
      } else {
        res.json(nflstadiums);
      }
    });
  })
  .post(function(req, res, next){

    let nflstadium = new Nflstadium();

    nflstadium.name = "Rogers Centre";
    nflstadium.description = "Toronto Blue Jays";
    nflstadium.state = "ONT";

    nflstadium.save(function(err, user, next){
      if(err){
        next(err);
      } else {
        res.json(nflstadium);
      }
    });
  });


module.exports = router;
