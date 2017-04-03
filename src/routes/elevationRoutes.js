/* Importing variables as lets to our required imports */
import express from 'express';
import Elevation from '../models/Elevation';

let router = express.Router();

/* using a router function with the params of req res and next */
router.use(function(req, res, next){
  res.setHeader('Content-Type', 'application/json');
  next();
});

router.route('/')
  .get(function(req, res, next){
    Elevation.find().sort({name: "ascending"}).exec(function(err, elevations){
      if (err) {
        return next(err);
      } else {
        res.json(elevations);
      }
    });
  });

module.exports = router;
