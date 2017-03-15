let express = require('express');
let router = express.Router();
let Giphy = require('../models/giphy');
let User = require('../models/user');
let hash = require('password-hash');
let jwt = require('jsonwebtoken');
let app = express();
let config = require('../config');

app.set('superSecret', config.secret);


router.use(function(req, res, next){
  console.log('something is happening!');
  res.setHeader('Content-Type', 'application/json');
  next();
});


router.route('/giphys')
  .post(function(req, res, next){

    let giphy = new Giphy();

    giphy.name = req.body.name;
    giphy.url = req.body.url;
    giphy.description = req.body.description;
    giphy.admin = req.body.admin;
    giphy.owner = req.body.owner;

    giphy.save(function(err, giphys){
      if(err){
        next(err);
      } else {
        res.json(giphys);
      }
    });
  })
  .get(function(req, res){
    Giphy.find().populate('owner').exec(function(err, giphys){
      if(err){
        return (err);
      } else {
        res.json(giphys);
      }
    });
  });

router.route('/giphys/:giphy_id')
  .get(function(req, res){
    Giphy.findById(req.params.giphy_id, function(err, giphy){
      if(err){
        console.log(err);
      } else {
        res.json(giphy);
      }
    });
  })
  .put(function(req, res){
    Giphy.findById(req.params.giphy_id, function(err, giphy){
      if(err){
        console.log(err);
      } else {
        giphy.name = req.body.name || giphy.name;
        giphy.url = req.body.url || giphy.url;
        giphy.description = req.body.description || giphy.description;

        giphy.save(function(err){
          if(err){
            console.log(err);
          } else {
            res.json({title: "Giphy updated"});
          }
        });
      }
    });
  })
  .delete(function(req, res){
    Giphy.remove({_id: req.params.giphy_id}, function(err, Giphy){
      if(err){
        console.log(err);
      } else {
        res.json({title: 'Giphy was successfully deleted!'});
      }
    });
  });

  router.route('/user')
    .post(function(req, res){

      let user = new User();

      user.name = req.body.name;
      user.password = hash.generate(req.body.password);
      user.email = req.body.email;
      user.admin = req.body.admin;
      user.owner = req.body.owner;

      user.save(function(err, user, next){
        if(err){
          next(err);
        } else {
          res.json(user);
        }
      });
    });

  router.post('/authenticate', function(req, res) {
      console.log('Authenticating....', req.body.name, req.body.password);
      // find the user
      User.findOne({
          name: req.body.name
      }, function(err, user) {
          console.log(user);
          if (err) throw err;

          if (!user) {
              res.json({ success: false, message: 'Authentication failed. User not found.' });
          } else if (user) {

              // check if password matches
              if (!hash.verify(req.body.password, user.password)) {
                  res.json({ success: false, message: 'Authentication failed. Wrong password.' });
              } else {

                  // if user is found and password is right
                  // create a token
                  let token = jwt.sign(user, app.get('superSecret'), {
                      expiresIn: 86400 // expires in 24 hours
                  });
                  console.log(user);
                  res.json({
                      success: true,
                      message: 'Enjoy your token!',
                      token: token,
                      admin: user.admin,
                      id: user._id
                  });
              }

          }

      });
  });

  router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  let token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
});

module.exports = router;
