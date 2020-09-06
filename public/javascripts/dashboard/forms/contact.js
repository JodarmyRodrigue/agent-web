let $buttons = document.querySelectorAll('button');

$buttons.forEach(button => {
    button.addEventListener('click', event => {
        event.preventDefault();
        console.log("Access Sheet #", button.id);
    });
});