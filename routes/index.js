var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('welcome', { title: 'Bienvenue', user: req.session.user, jwt: req.session.jwt });
});

module.exports = router;
