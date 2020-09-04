var express = require('express');
var router = express.Router();

/* GET account page. */
router.get('/', function(req, res, next) {
  res.render('dashboard/agents', { title: 'Liste des agents' });
});

module.exports = router;
