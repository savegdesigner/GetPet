// Caching DOM
const nav_icon_div = document.querySelector('#nav-icon')
const nav = document.querySelector('.navigation')

// Responsive Menu Click Event
nav_icon_div.addEventListener('click', () => {

    nav_icon_div.classList.toggle('open')
    
    nav.classList.toggle('open')

})