// Caching DOM

const form = document.querySelector('.form')


// Form Submit
form.addEventListener('submit', (e) =>{

    e.preventDefault()


})

// Fetching API List to fill breed input

var url = "https://dog.ceo/api/breeds/list/all"



fetch(url)
    .then(response => response.json())
        .then(data => {
            resultado = data.message

            console.log(resultado)
           
        })