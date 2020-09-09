var express = require('express');
var router = express.Router();
var isAuthenticated = require('../../../middlewares/isAuthenticated');
var axios = require('axios');
var PDFDocument = require('pdfkit');

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
    axios.get(`${baseUrl}/coronavirus-notification-sheets?id=${req.query.id}`, {
      timeout: 30 * 1000,
      headers: {
        'Authorization': `Bearer ${req.session.jwt}`
      },
    }).then(response => {
      const doc = new PDFDocument();

      

      const data = {
        case_status,
        case_status_risk_population,
        other_case_status,
        investigation_date,
        sanitary_formation,
        district,
        region,
        case_number,
        investigator,
        investigator_phone,
        epid,
        patient_name,
        patient_birthday,
        age,
        age_months,
        age_days,
        gender,
        patient_occupation,
        patient_residence_district,
        patient_city,
        patient_quarter,
        patient_gps_latitude,
        patient_gps_longitude,
        patient_residence,
        patient_caretaker_name,
        patient_caretaker_phone,
        patient_phone,
        urgent_infos,
        first_symptoms,
        consultation_date,
        symptoms,
        patient_status,
        patient_status_location,
        patient_comorbidity_conditions,
        patient_occupations,
        patient_did_travel,
        patient_travel_destinations,
        patient_visit_health,
        patient_contact,
        patient_contact_location,
        patient_travel_location,
        patient_did_visit_animal_market,
        patient_did_wear_mask,
        patient_did_wash_hands,
        sample,
        sample_date,
        sample_hour,
        sample_nature,
        sample_other_nature,
        sample_blood,
        sample_conservation,
        no_sample_reason,
        no_sample_reason_other,
        sample_agent_name,
        sample_agent_phone,
        lab_reception_date,
        lab_reception_hour,
        lab_reg_number,
        lab_reception_temperature,
        lab_name,
        lab_reception_condition,
        pcr,
        pcr_date,
        sars_covid_kit,
        rt_pcr_result,
        biologist_name,
        biologist_phone,
        result_transmission_date,
      } = response.data[0];

      console.log(data);

      const frenchLabels = {
        case_status: "Statut du cas",
        case_status_risk_population: "Population à risque",
        other_case_status: "Autre",
        investigation_date: "Date de l'investigation",
        sanitary_formation: "Formation Sanitaire",
        district: "District",
        region: "Région",
        case_number: "Numéro du cas",
        investigator: "Nom & Prénom(s) de l'Investigateur",
        investigator_phone: "Numéro de téléphone de l'Investigateur",
        epid: "EPID",
        patient_name: "Nom et Prénom(s) du patient",
        patient_birthday: "Date de naissance du patient",
        age: "Âge en années du patient",
        age_months: "Âge en mois du patient",
        age_days: "Âge en jours du patient",
        gender: "Sexe",
        patient_occupation: "Profession du patient",
        patient_residence_district: "District de Résidence du patient",
        patient_city: "Ville/Village du patient",
        patient_quarter: "Quartier/Secteur du patient",
        patient_gps_latitude: "Coordonnées GPS - Latitude",
        patient_gps_longitude: "Coordonnées GPS - Longitude",
        patient_residence: "Milieu de résidence du patient",
        patient_caretaker_name: "Nom du père/ de la mère/ du tuteur",
        patient_caretaker_phone: "Numéro de téléphone",
        patient_phone: "Numéro de téléphone du patient",
        urgent_infos: "Nom et numéro de téléphone de la personne à contacter en cas de besoin",
        first_symptoms: "Date d'apparition des premiers symptômes",
        consultation_date: "Date de consultation",
        symptoms: "Symptômes",
        patient_status: "Statut du patient au moment de l'investigation",
        patient_status_location: "Lieu du patient au moment de l'investigation",
        patient_comorbidity_conditions: "Conditions sous-jacentes et comorbidité",
        patient_occupations: "Occupations/Profession du patient",
        patient_did_travel: "Le patient a t-il voyagé?",
        patient_travel_destinations: "Destinations de Voyage",
        patient_visit_health: "Le patient a t-il visité des établissements de soins de santé?",
        patient_contact: "Le patient a t-il eu un contact étroit avec une personne atteinte d'une infection respiratoire aiguë au cours des 14 jours précédant l'apparition des symptômes?",
        patient_contact_location: "Les lieux de contact",
        patient_travel_location: "",
        patient_did_visit_animal_market: "La patient a t-il visité des marchés d'animaux vivants au cours des 14 jours précédant l'apparition des symptômes?",
        patient_did_wear_mask: "Le patient a t-il régulièrement porté un masque dans les lieux publics au cours des 14 jours précédant l'apparition des symptômes?",
        patient_did_wash_hands: "Le patient a t-il régulièrement observé l'hygiène des mains au cours des 14 jours précédant l'apparition des symptômes?",
        sample: "Échantillon prélevé",
        sample_date: "Date du prélèvement",
        sample_hour: "Heure du prélèvement",
        sample_nature: "Nature du prélèvement",
        sample_other_nature: "Autre prélèvement respiratoire",
        sample_blood: "Prélèvement de sang",
        sample_conservation: "Conservation de l'échantillon avant le transport",
        no_sample_reason: "Si Non, pourquoi",
        no_sample_reason_other: "Autre",
        sample_agent_name: "Nom et Prénom(s) de l'Agent prélèveur",
        sample_agent_phone: "Numéro de téléphone de l'Agent prélèveur",
        lab_reception_date: "Date de réception au laboratoire",
        lab_reception_hour: "Heure de réception au laboratoire",
        lab_reg_number: "Numéro dans le régistre du laboratoire",
        lab_reception_temperature: "Température à la réception",
        lab_name: "Nom du Laboratoire",
        lab_reception_condition: "Condition de l'échantillon à la réception",
        pcr: "PCR réalisé",
        pcr_date: "Date de la PCR",
        sars_covid_kit: "Kit SARS-Co V-2/COVID-19",
        rt_pcr_result: "Résultat RT-PCR",
        biologist_name: "Nom et Prénom(s) du Biologiste",
        biologist_phone: "Numéro de téléphone du Biologiste",
        result_transmission_date: "Date de transmission des résultats à la DPSP",
      };

      res.setHeader('Content-disposition', `attachment; filename="fiche_individuelle_de_notifications_en_cas_de_coronavirus.pdf"`);
      res.setHeader('Content-type', 'application/pdf');

      doc.fontSize(20)
        .font("Times-Roman")
        .text("Fiches Individuelle de notification de cas de Coronavirus", {
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
  axios.get(`${baseUrl}/coronavirus-notification-sheets?_sort=created_at:DESC`, {
    timeout: 30 * 1000,
    headers: {
      'Authorization': `Bearer ${req.session.jwt}`
    },
  }).then(response => {
    console.log("Sheets retrieved successfully!");
    sheets = response.data;
    console.log(sheets);
  }).catch(error => {
    console.log('An error occured while getting contact sheets');
    if (error.response) {
      console.log('Error :', error.response.data);
    } else {
      console.log('Error :', error.request);
    }
  }).finally(() => {
    res.render('dashboard/forms/notification', {
      title: "Fiches Individuelle de notification de cas de Coronavirus",
      user: req.session.user,
      jwt: req.session.jwt,
      sheets: sheets
    });
  });
});

module.exports = router;