import express from 'express';
import User from '../models/User';

let router = express.Router();

router.use(function(req, res, next){
  res.setHeader('Content-Type', 'application/json');
  next();
});

router.route('/usercheck')
  .post(function(req, res, next){
    User.findOne({
      name: req.body.name.toLowerCase()
    }, function(err, user){
      if (err) next (err);
      if(!user){
        res.json({userfound: false});
      } else if (user) {
        res.json({userfound: true});
      }
    });
  });




module.exports = router;
