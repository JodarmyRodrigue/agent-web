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
  res.render('dashboard/account', {
    title: 'Mon Compte',
    user: req.session.user,
    jwt: req.session.jwt
  });
});


router.post('/', isAuthenticated, function (req, res, next) {
  if (!req.body) {
    res.status(400).send({
      message: 'Veuillez fournir des données'
    });
    res.end();
  }

  let cleanedBody = {};
  try {
    for (const [key, value] of Object.entries(req.body)) {
      cleanedBody[key] = req.sanitize(req.body[key]);
    }
  } catch (error) {
    console.log('Error during body sanitization :', error);
    cleanedBody = req.body;
  } finally {
    console.log('Body to be sent :', cleanedBody);
  }


  axios.put(`${baseUrl}/users/${req.session.user.id}`, cleanedBody, {
    timeout: 30 * 1000,
    headers: {
      "Authorization": `Bearer ${req.session.jwt}`
    }
  }).then(response => {
    console.log('User data change Success: ', response.data);
    try {
      req.session.user = response.data;
      res.status(200).end();
    } catch (error) {
      console.log('Error while storing data to session :', error);
      res.status(500).send('Error');
    }
  }).catch(error => {
    if (error.response) {
      if (error.response.data.statusCode === 400) {
        let errorMessage = 'Erreur';
        try {
          errorMessage = error.response.data.message[0].messages[0].message;
        } catch (error) {
          console.log('Error while getting error message :', error);
        }
        console.log('Bad Request :', errorMessage);
        res.status(400).send({
          message: errorMessage,
        });

      } else if (error.response.data.statusCode === 403) {

        console.log('Forbidden Request');
        res.status(403).send({
          message: 'Interdit'
        });

      } else if (error.response.data.statusCode === 404) {

        console.log('Not Found');
        res.status(404).send({
          message: 'Not Found'
        });

      }
    } else if (error.request) {
      console.log(error.request);
      res.status(500).send({
        message: 'Pas de réponse'
      });
    } else {
      console.log(error);
      res.status(500).send({
        message: 'Erreur Inconnue'
      });
    }
  });
});



module.exports = router;