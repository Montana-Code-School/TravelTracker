import express from 'express';
import User from '../models/User';
import hash from 'password-hash';
import jwt from 'jsonwebtoken';

let app = express();
let config = require('../config');
let router = express.Router();

app.set('superSecret', config.secret);


router.use(function(req, res, next){
  console.log('something is happening!');
  res.setHeader('Content-Type', 'application/json');
  next();
});

router.route('/user')
  .post(function(req, res){

    let user = new User();

    user.name = req.body.name.toLowerCase();
    user.password = hash.generate(req.body.password);
    user.email = req.body.email;
    user.admin = req.body.admin;

    user.save(function(err, user, next){
      if(err){
        next(err);
      } else {
        res.json(user);
      }
    });
  });

router.route('/addState')
  .put(function(req, res, next){
    let user = new User();
    User.findOne({
      name: req.body.name
    }, function(err, user) {
      if (err) next(err);
      user.states.push(req.body.statename);
      user.save(function(err){
        if(err){
          next(err);
        } else {
          res.json({success: "content has been toggled"});
        }
      });
    });
  });

router.route('/removeState')
  .delete(function(req, res, next){
    let user = new User();
    User.findOne({
      name: req.body.name
    }, function(err, user) {
      if (err) next(err);
      let a = user.states.indexOf(req.body.statename);
      user.states.splice(a, 1);
      user.save(function(err){
        if(err){
          next(err);
        } else {
          res.json({success: "content has been toggled"});
        }
      });
    });
  });

router.route('/addPark')
  .put(function(req, res, next){
    let user = new User();
    User.findOne({
      name: req.body.name
    }, function(err, user) {
      if (err) next(err);
      user.parks.push(req.body.parkname);
      user.save(function(err){
        if(err){
          next(err);
        } else {
          res.json({success: "content has been toggled"});
        }
      });
    });
  });

router.route('/removePark')
  .delete(function(req, res, next){
    let user = new User();
    User.findOne({
      name: req.body.name
    }, function(err, user) {
      if (err) next(err);
      let a = user.parks.indexOf(req.body.parkname);
      user.parks.splice(a, 1);
      user.save(function(err){
        if(err){
          next(err);
        } else {
          res.json({success: "content has been toggled"});
        }
      });
    });
  });

router.post('/authenticate', function(req, res, next) {
  console.log('Authenticating....', req.body.name, req.body.password);
  User.findOne({
    name: req.body.name.toLowerCase()
  }, function(err, user) {
    if (err) next(err);
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      if (!hash.verify(req.body.password, user.password)) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        let token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 86400 // expires in 24 hours
        });
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token,
          admin: user.admin,
          id: user._id,
          states: user.states,
          parks: user.parks
        });
      }
    }
  });
});

router.use(function(req, res, next) {
  let token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
});

module.exports = router;
