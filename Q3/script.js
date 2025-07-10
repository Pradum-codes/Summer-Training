document.addEventListener('DOMContentLoaded', function() {
    const heading = document.querySelector('h1');

    const buttons = document.querySelectorAll('button');
    
    buttons[0].addEventListener('click', function() {
        heading.style.color = 'red';
        console.log('Changed heading color to red');
    });
    
    buttons[1].addEventListener('click', function() {
        heading.style.color = 'blue';
        console.log('Changed heading color to blue');
    });
    
    buttons[2].addEventListener('click', function() {
        heading.style.color = 'green';
        console.log('Changed heading color to green');
    });
});