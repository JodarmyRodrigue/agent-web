var express = require('express');
var router = express.Router();
var isAuthenticated = require('../../../middlewares/isAuthenticated');
var axios = require('axios');
var PDFDocument = require('pdfkit');

let baseUrl;
if (process.env.ENV === 'DEV') {
  baseUrl = "http://127.0.0.1:1337";
} else {
  baseUrl = "https://agent-strapi.herokuapp.com";
}

router.get('/download', isAuthenticated, async function (req, res, next) {
  if (!req.query.id) {
    console.log("No query id...");
  } else {
    axios.get(`${baseUrl}/exam-control-sheets?id=${req.query.id}`, {
      timeout: 30 * 1000,
      headers: {
        'Authorization': `Bearer ${req.session.jwt}`
      },
    }).then(response => {
      const doc = new PDFDocument();

      console.log(response.data);

      const data = {
        confirmed_case,
        other_confirmed_case,
        contact,
        traveler,
        risk_population,
        risk_population_j,
        other_category,
        other_category_j,
        control_date,
        district,
        firstname,
        lastname,
        birthday,
        age,
        age_months,
        gender,
        quarter,
        phone,
        urgent_phone,
        epid,
        sample_taken,
        sample_date,
        sample_hour,
        sample_nature,
        other_sample,
        blood_sample,
        sample_conservation,
        no_sample_reason_other,
        no_sample_reason,
        agent_name,
        agent_phone,
        lab_name,
        reception_date,
        reception_hour,
        lab_reg_number,
        reception_temperature,
        reception_condition,
        pcr,
        pcr_date,
        sars_covid_kit,
        rt_pcr_result,
        biologist_signature,
        biologist_name,
        biologist_phone,
        result_transmission_date,
        team_chef,
      } = response.data[0];

      const frenchLabels = {
        "confirmed_case": "Cas confirmé",
        "other_confirmed_case": "Autre contrôle",
        "contact": "Contact",
        "traveler": "Voyageur",
        "risk_population": "Population à risque",
        "risk_population_j": "Population à risque J",
        "other_category": "Autre",
        "other_category_j": "Autre J",
        "control_date": "Date de Contrôle",
        "district": "District",
        "firstname": "Nom",
        "lastname": "Prénom(s)",
        "birthday": "Date de naissance",
        "age": "Âge en années",
        "age_months": "Âge en mois",
        "gender": "Sexe",
        "quarter": "Quartier/Secteur",
        "phone": "Numéro de téléphone",
        "urgent_phone": "Nom et Numéro de téléphone de la personne à prévenir en cas de besoin",
        "epid": "N IDENTIFIANT UNIQUE (EPID)",
        "sample_taken": "Échantillon prélevé",
        "sample_date": "Date du prélèvement",
        "sample_hour": "Heure du prélèvement",
        "sample_nature": "Nature du prélèvement",
        "other_sample": "Autre prélèvement respiratoire",
        "blood_sample": "Prélèvement de sang",
        "sample_conservation": "Conservation de l'échantillon avant le transport",
        "no_sample_reason_other": "Pourquoi",
        "no_sample_reason": "Autres",
        "agent_name": "Nom et Prénom(s) de l'agent prélèveur",
        "agent_phone": "Numéro de téléphone de l'agent prélèveur",
        "lab_name": "Nom du Laboratoire",
        "reception_date": "Date de réception",
        "reception_hour": "Heure de réception",
        "lab_reg_number": "Numéro dans le registre du Laboratoire",
        "reception_temperature": "Température à la réception",
        "reception_condition": "Condition de l'échantillon à la réception",
        "pcr": "PCR Réalisé",
        "pcr_date": "Date de la PCR",
        "sars_covid_kit": "Kit SARS-CoV-2/COVID-19",
        "rt_pcr_result": "RESULTAT RT-PCR",
        "biologist_signature": "Signature du Biologiste",
        "biologist_name": "Nom et Prénom(s) du Biologiste",
        "biologist_phone": "Numéro de Téléphone du Biologiste",
        "result_transmission_date": "Date de transmission des résultats à la DPSP",
        "team_chef": "Identité du chef d'équipe (nom, prénom, numéro de téléphone)",
      };

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

      doc.pipe(res);
      doc.end();
    }).catch(error => {
      console.log(error);
    });
  }
});

router.get('/', isAuthenticated, function (req, res, next) {
  let sheets = [];
  axios.get(`${baseUrl}/exam-control-sheets?_sort=created_at:DESC`, {
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
    res.render('dashboard/forms/control', {
      title: "Fiches d'Examen de Contrôle de COVID19",
      user: req.session.user,
      jwt: req.session.jwt,
      sheets: sheets
    });
  });
});

module.exports = router;