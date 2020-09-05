var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('dashboard/forms/notification', { title: 'Fiches individuelles de notification en cas de coronavirus', user: req.session.user, jwt: req.session.jwt });
});

module.exports = router;
