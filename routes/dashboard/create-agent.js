var express = require('express');
var router = express.Router();

/* GET account page. */
router.get('/', function(req, res, next) {
  res.render('dashboard/create-agent', { title: 'Créer un Agent', user: req.session.user, jwt: req.session.jwt });
});

module.exports = router;
