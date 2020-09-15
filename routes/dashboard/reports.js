var express = require('express');
var router = express.Router();
var axios = require('axios');
var isAuthenticated = require('../../middlewares/isAuthenticated');

let baseUrl;
if (process.env.ENV === 'DEV') {
  baseUrl = "http://127.0.0.1:1337";
} else {
  baseUrl = "https://agent-strapi.herokuapp.com";
}

router.get('/', isAuthenticated, function (req, res, next) {
  let reports = [];
  axios.get(`${baseUrl}/analysis-reports`, {
    timeout: 30 * 1000,
    headers: {'Authorization':`Bearer ${req.session.jwt}`},
  }).then(response => {
    console.log("Reports retrieved successfully!");
    reports = response.data;
  }).catch(error => {
    console.log('An error occured while getting Reports');
    if (error.response) {
      console.log('Error :', error.response.data);
    } else {
      console.log('Error :', error.request);
    }
  }).finally(() => {
    res.render('dashboard/reports', {
      title: 'Rapports de Test',
      user: req.session.user,
      jwt: req.session.jwt,
      reports: reports
    });
  });
});

module.exports = router;