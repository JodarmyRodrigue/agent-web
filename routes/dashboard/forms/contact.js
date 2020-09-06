var express = require('express');
var router = express.Router();
var isAuthenticated = require('../../../middlewares/isAuthenticated');
var axios = require('axios');

let baseUrl;
if (process.env.ENV === 'DEV') {
  baseUrl = "http://127.0.0.1:1337";
} else {
  baseUrl = "https://agent-api";
}

router.get('/', isAuthenticated,  function(req, res, next) {
  let sheets = [];
  axios.get(`${baseUrl}/contact-registration-sheets?_sort=created_at:DESC`, {
    timeout: 30 * 1000,
    headers: {'Authorization':`Bearer ${req.session.jwt}`},
  }).then(response => {
    console.log("Sheets retrieved successfully!");
    sheets = response.data;
  }).catch(error => {
    console.log('An error occured while getting contact sheets');
    if (error.response) {
      console.log('Error :', error.response.data);
    } else {
      console.log('Error :', error.request);
    }
  }).finally(() => {
    res.render('dashboard/forms/contact', {
      title: "Fiches d'enregistrement de Contact",
      user: req.session.user,
      jwt: req.session.jwt,
      sheets: sheets
    });
  });
});

module.exports = router;
