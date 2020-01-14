// Caching DOM
const form = document.querySelector('.form')
const breeds_input = document.querySelector('#breeds')
const error_span = document.querySelector('.error')
const dog_name_input = document.querySelector('#dog-name')
const fav_colors_input = document.querySelector('#colors')
const fonts_input = document.querySelector('#fonts')
const dog_card_name = document.querySelector('#adopted-dog-name')
const dog_card_breed = document.querySelector('#adopted-dog-breed')
const dog_api_image = document.querySelector('#dog-api-image')
const adopt_submit_button = document.querySelector('#adopt-submit')
const save_card_button = document.querySelector('#save-card-button')
var save_date_span = document.querySelector('#save-date')


// Fetching API List to fill breed input
var url = "https://dog.ceo/api/breeds/list/all"

fetch(url)
    .then(response => response.json())
        .then(data => {
            resultado = data.message

            Object.keys(resultado).forEach(item => {

               var breed_option = document.createElement('option')

               breed_option.innerHTML = item

               breeds_input.appendChild(breed_option)

            })
           
        })

// Form Dog's name Validation
function form_validation(name){
 
    var letters = /^[A-Za-z]+$/

    if(!name.match(letters))
        {
            error_span.style.display = 'block'
            error_span.innerHTML = 'Informe um nome válido'
            return true
    }

}

// Form Submit
form.addEventListener('submit', (e) =>{

    e.preventDefault()

    save_date_span.innerHTML = ''
    error_span.style.display = 'none'

    var dog_name = dog_name_input.value
    var dog_breed = breeds_input.options[breeds_input.selectedIndex].value
    var favorite_color = fav_colors_input.options[fav_colors_input.selectedIndex].value
    var font = fonts_input.options[fonts_input.selectedIndex].value

    if(form_validation(dog_name)){
        return

    }else{

        var url2 = `https://dog.ceo/api/breed/${dog_breed}/images`

        fetch(url2)
            .then(response => response.json())
                .then(data => {

                    var random_image_number = Math.floor(Math.random() * 10)
                    
                    var dog_image = data.message[random_image_number]

                    dog_api_image.src = dog_image

                })

        // Styling Dog Card
        dog_card_name.innerHTML = dog_name
        dog_card_name.style.color = favorite_color
        dog_card_name.style.fontFamily = font
        dog_card_breed.innerHTML = dog_breed
        save_card_button.style.display = 'block'

        adopt_submit_button.value = 'ADOTADO'
        adopt_submit_button.classList.add('adopted-button-style')

        setTimeout(() => {
            adopt_submit_button.classList.remove('adopted-button-style')
            adopt_submit_button.value = 'ADOTAR'
        }, 2000)

    }

})

// Save Card
save_card_button.addEventListener('click', () => {

    var dog_name = dog_name_input.value
    var dog_breed = breeds_input.options[breeds_input.selectedIndex].value
    var favorite_color = fav_colors_input.options[fav_colors_input.selectedIndex].value
    var font = fonts_input.options[fonts_input.selectedIndex].value
    var dog_image_src = dog_api_image.src
    var date = new Date()

    localStorage.setItem('dog_image', dog_image_src)
    localStorage.setItem('dog_name', dog_name)
    localStorage.setItem('dog_breed', dog_breed)
    localStorage.setItem('favorite_color', favorite_color)
    localStorage.setItem('font', font)
    localStorage.setItem('date', date)

    save_date_span.innerHTML = date

})

// On page loading fill inputs with localstorage info (if there are any)
window.onload = () =>{

    var local_date = localStorage.date

    if(local_date){
        dog_api_image.src = localStorage.dog_image

        dog_card_name.innerHTML = localStorage.dog_name
        dog_card_name.style.fontFamily = localStorage.font
        dog_card_name.style.color = localStorage.favorite_color
        dog_card_breed.innerHTML = localStorage.dog_breed

        save_date_span.innerHTML = localStorage.date

    }

}