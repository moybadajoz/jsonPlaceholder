console.log('Conectado')
const listaUsuarios = document.getElementById('listaUsuarios')
const template = document.getElementById('template').content
const fragment = document.createDocumentFragment()
let usuarios = []

document.addEventListener('DOMContentLoaded', () => {
    obtenerDatos()
})

const obtenerDatos = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then( async (res) => {
           // console.log(await res.json())
           usuarios = await res.json()
           pintaUsuarios()
           console.log(usuarios)
        })
        .catch( error => {
            console.log(error)
        })
}

const pintaUsuarios = () => {
    usuarios.forEach( usuario => {
        template.querySelectorAll('h1')[1].textContent = 'Nombre: ' + usuario.name
        template.querySelectorAll('h2')[0].textContent = 'UserName: ' + usuario.username
        template.querySelectorAll('h2')[1].textContent = 'Correo:  ' + usuario.email
        template.querySelectorAll('h2')[2].textContent = 'Telefono: ' + usuario.phone
        template.querySelectorAll('h2')[3].textContent = 'WebSite: ' + usuario.website

        template.querySelectorAll('h2')[4].textContent = 'Ciudad: ' + usuario.address.city
        template.querySelectorAll('h2')[5].textContent = 'Calle: ' + usuario.address.street
        template.querySelectorAll('h2')[6].textContent = 'Suite: ' + usuario.address.suite
        template.querySelectorAll('h2')[7].textContent = 'Codigo Postal: ' + usuario.address.zipcode

        template.querySelectorAll('h2')[8].textContent = 'Nombre: ' + usuario.company.name
        template.querySelectorAll('h2')[9].textContent = 'Eslogan: ' + usuario.company.catchPhrase
        template.querySelectorAll('h2')[10].textContent = 'Bs: ' + usuario.company.bs

        

        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
    })
    listaUsuarios.appendChild(fragment)
}