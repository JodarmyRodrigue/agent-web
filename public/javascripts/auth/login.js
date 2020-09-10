let $loginForm = document.querySelector('#loginForm');
let $loginSubmit = document.querySelector('#loginSubmit');

$loginSubmit.addEventListener('click', (event) => {
  event.preventDefault();
  let formData = new FormData($loginForm);

  let body = {};

  //TODO: Try to replace this with a simple Object.create
  for (const [key, value] of formData.entries()) {
    body[key] = value;
  }

  axios.post('/auth/login', body)
    .then(response => {
      alert('Merci pour votre Connexion');
      window.location = "/dashboard/account";
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