var express = require('express');
var router = express.Router();
var isAuthenticated = require('../../../middlewares/isAuthenticated');
var axios = require('axios');
var PDFDocument = require('pdfkit');
var fs = require('fs');

let baseUrl;
if (process.env.ENV === 'DEV') {
  baseUrl = "http://127.0.0.1:1337";
} else {
  baseUrl = "https://agent-api";
}

router.get('/download', isAuthenticated, async function (req, res, next) {
  if (!req.query.id) {
    console.log("No query id...");
  } else {
    axios.get(`${baseUrl}/contact-registration-sheets?id=${req.query.id}`, {
      timeout: 30 * 1000,
      headers: {
        'Authorization': `Bearer ${req.session.jwt}`
      },
    }).then(response => {
      const doc = new PDFDocument();
      const {
        id,
        instigator_name,
        instigator_number,
        case_id,
        firstname,
        lastname,
        household_chief_name,
        case_location,
        address,
        community_chief_name,
        symptoms_date,
        sanitary_district,
        region,
        contact_infos
      } = response.data[0];


      res.setHeader('Content-disposition', 'attachment; filename="file.pdf"');
      res.setHeader('Content-type', 'application/pdf');

      doc.fontSize(18)
        .text(`Nom de l'Instigateur : ${instigator_name}`)
        .text(`Numéro de l'Instigateur : ${instigator_number}`)
        .text(`Nom : ${firstname}`)
        .text(`Prénom : ${lastname}`)
        .text(`Lieu d'identification du cas : ${case_location}`);
      doc.pipe(res);
      doc.end();
    }).catch(error => {
      console.log(error);
    });
  }
});

router.get('/', isAuthenticated, function (req, res, next) {
  let sheets = [];
  axios.get(`${baseUrl}/contact-registration-sheets?_sort=created_at:DESC`, {
    timeout: 30 * 1000,
    headers: {
      'Authorization': `Bearer ${req.session.jwt}`
    },
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