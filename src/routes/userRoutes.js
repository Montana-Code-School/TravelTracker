let express = require('express');
let router = express.Router();
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

router.route('/user')
  .post(function(req, res){

    let user = new User();

    user.name = req.body.name;
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

router.post('/authenticate', function(req, res) {
  console.log('Authenticating....', req.body.name, req.body.password);
  User.findOne({
    name: req.body.name
  }, function(err, user) {
    if (err) throw err;
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
          id: user._id
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
