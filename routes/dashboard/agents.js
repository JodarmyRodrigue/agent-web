var express = require('express');
var router = express.Router();
var axios = require('axios');
var isAuthenticated = require('../../middlewares/isAuthenticated');

let baseUrl;
if (process.env.ENV === 'DEV') {
  baseUrl = "http://127.0.0.1:1337";
} else {
  baseUrl = "https://agent-web.herokuapp.com";
}

router.get('/', isAuthenticated, function (req, res, next) {
  let agents = [];
  axios.get(`${baseUrl}/users?web_user=false`, {
    timeout: 30 * 1000,
    headers: {'Authorization':`Bearer ${req.session.jwt}`},
  }).then(response => {
    console.log("Agents retrieved successfully!");
    agents = response.data;
  }).catch(error => {
    console.log('An error occured while getting agents');
    if (error.response) {
      console.log('Error :', error.response.data);
    } else {
      console.log('Error :', error.request);
    }
  }).finally(() => {
    res.render('dashboard/agents', {
      title: 'Liste des agents',
      user: req.session.user,
      jwt: req.session.jwt,
      agents: agents
    });
  });
});

module.exports = router;