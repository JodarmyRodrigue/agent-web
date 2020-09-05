var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('dashboard/reports', { title: 'Liste des Rapports de Tests', user: req.session.user, jwt: req.session.jwt });
});

module.exports = router;
