var express = require('express');
var router = express.Router();
var isAuthenticated = require('../../../middlewares/isAuthenticated');

router.get('/', isAuthenticated,  function(req, res, next) {
  res.render('dashboard/forms/contact', { title: 'Fiches d\'enregistrement des contacts' , user: req.session.user, jwt: req.session.jwt });
});

module.exports = router;
