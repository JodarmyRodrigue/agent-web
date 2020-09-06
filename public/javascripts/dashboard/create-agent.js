let $createAgentForm = document.querySelector('#createAgentForm');
let $createAgentSubmit = document.querySelector('#createAgentSubmit');

let $password = document.querySelector('#password');
let $password2 = document.querySelector('#password2');

$createAgentSubmit.addEventListener('click', (event) => {
  event.preventDefault();

  if($password.value != $password2.value){
    alert('Vos mots de passe ne correspondent pas');
    return;
  }

  let formData = new FormData($createAgentForm);
  let body = {};


  for (const [key, value] of formData.entries()) {
    body[key] = value;
  }

  axios.post('/dashboard/create-agent', body)
    .then(response => {
      alert('Nouvel Agent créé avec succès!');
      window.location = "/dashboard/agents";
    }).catch(error => {
      if (error.response) {
        console.dir(error.response);
        if (error.response.status === 400) {
          alert(error.response.data.message);
        } else if (error.response.status === 403) {
          alert('INTERDIT');
        } else if (error.response.status === 404) {
          alert('INTROUVABLE');
        }
      } else if (error.request) {
        console.dir(error.request);
      } else {
        console.dir(error);
      }
    }).finally(() => {

    });

});