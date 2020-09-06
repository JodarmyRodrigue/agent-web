var express = require('express');
var router = express.Router();
var isAuthenticated = require('../../../middlewares/isAuthenticated');

router.get('/', isAuthenticated, function(req, res, next) {
  res.render('dashboard/forms/control', { title: 'Fiches de contrôles' , user: req.session.user, jwt: req.session.jwt });
});

module.exports = router;
