var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('dashboard/forms/contact', { title: 'Fiches d\'enregistrement des contacts' });
});

module.exports = router;
