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
      const contactFrenchLabels = {
        "firstname": "Nom de Famille",
        "lastname": "Prénom(s)",
        "gender": "Sexe",
        "age": "Âge",
        "case_relation": "Lien avec le cas",
        "last_contact": "Date du dernier contact avec le cas",
        "first_visit": "Date de la première visite",
        "last_check": "Dernière date de suivi",
        "city": "Ville/Village/Quartier",
        "district": "District",
        "phone": "Numéro de Téléphone",
        "occupation": "Profession/Fonction",
        "workplace": "Lieu de Travail",
        "contact_type": "Type de contact(1, 2, 3 ou 4)",
        "issue": "Issue"
      };
      const frenchLabels = {
        "instigator_name": "Nom de l'Instigateur",
        "instigator_number": "Numéro de téléphone de l'Agent Récenseur",
        "case_id": "Numéro ID du cas",
        "firstname": "Nom de Famille",
        "lastname": "Prénom(s)",
        "household_chief_name": "Nom et Prénom(s) du chef de ménage",
        "case_location": "Lieu d'Identification du cas",
        "address": "Adresse",
        "community_chief_name": "Nom et Prénom(s) du responsable communautaire",
        "symptoms_date": "Date d'apparition des symptômes",
        "sanitary_district": "District Sanitaire",
        "region": "Région",
      };
      const data = {
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

      doc.fontSize(20)
        .font("Times-Roman")
        .text("Fiche d'enregistrement des contacts", {
          underline: true,
          align: 'center'
        })
        .moveDown();

      for (const [key, value] of Object.entries(data)) {
        if (frenchLabels[key] === undefined) continue;
        doc.fontSize(18)
          .font("Times-Bold")
          .text(`${frenchLabels[key]} :`, {
            continued: true
          })
          .font("Times-Roman")
          .text(value)
          .moveDown();
      }

      if (data.contact_infos && data.contact_infos.length > 0) {



        for (let i = 0; i < data.contact_infos.length; i++) {
          doc.addPage();

          if (i === 0) {
            doc.fontSize(20)
              .font("Times-Roman")
              .text("Informations sur les contacts", {
                underline: true,
                align: 'center'
              })
              .moveDown();
          }

          doc.fontSize(14)
            .font("Times-Roman")
            .text(`Contact #${i+1}`, {
              underline: true,
              align: 'center'
            })
            .moveDown();
          for (const [key, value] of Object.entries(data.contact_infos[i])) {
            if (contactFrenchLabels[key] === undefined) continue;
            doc.fontSize(16)
              .font("Times-Bold")
              .text(`${contactFrenchLabels[key]} :`, {
                continued: true
              })
              .font("Times-Roman")
              .text(value)
              .moveDown();
          }

        }
      }


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