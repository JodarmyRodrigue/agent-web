var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('dashboard/forms/control', { title: 'Fiches de contrôles' });
});

module.exports = router;
