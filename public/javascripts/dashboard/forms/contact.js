// let $buttons = document.querySelectorAll('button');

// $buttons.forEach(button => {
//     button.addEventListener('click', event => {
//         event.preventDefault();
//         console.log("Access Sheet #", button.id);

//         axios.get('/dashboard/forms/contact/download', {
//             sheetId: button.id,
//         }, {
//             headers: {"Content-type": "application/pdf"}
//         }).then(response => {
//             const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
//             const link = document.createElement('a');
//             link.href = downloadUrl;
//             link.setAttribute('download', 'fichier.pdf');
//             document.body.appendChild(link);
//             link.click();
//             link.remove();

//             console.log(response.data);
//         }).catch(error => {
//             console.log(error);
//         })
//     });
// });