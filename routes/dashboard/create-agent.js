var express = require('express');
var router = express.Router();

/* GET account page. */
router.get('/', function(req, res, next) {
  res.render('dashboard/create-agent', { title: 'Créer un Agent' });
});

module.exports = router;
