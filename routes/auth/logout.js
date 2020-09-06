var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    req.session.destroy(function (err) {
        if (err) {
            console.log('Error while destroying session :', err);
            res.status(500).send({
                message: "Erreur Inconnue"
            });
        } else {
            res.redirect('/');
        }
    });
});