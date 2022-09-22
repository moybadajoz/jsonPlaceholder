console.log('Conectado')
const listaUsuarios = document.getElementById('listaUsuarios')
const listaTareas = document.getElementById('tareasUsuarios')
const template = document.getElementById('template-usuarios').content
const t_tarea = document.getElementById('template-tareas').content
const fragment = document.createDocumentFragment()
const fragment2 = document.createDocumentFragment()
let usuarios = []
let tareas = []

document.addEventListener('DOMContentLoaded', () => {
    obtenerDatos()
})

listaUsuarios.addEventListener('click', e => {
    if(e.target.classList.contains('btn')){
        obtenTareasUsuarios(e.target.dataset.id)
    }
    e.stopPropagation()
})

const obtenTareasUsuarios = id => {
    tareas = []
    fetch(`https://jsonplaceholder.typicode.com/todos?userId=${id}`)
        .then( async(res) => {
            tareas = await res.json()
            pintarTareas()
            console.log('tareas', tareas)
        })
        .catch( error =>{
            console.log(error)
        })

}

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

const pintarTareas = () => {
    listaTareas.childNodes.forEach( child =>{
        if(child.nodeName == "DIV"){
            listaTareas.removeChild(child)
        }
        
    })
    tareas.forEach( tarea => {
        t_tarea.querySelectorAll('h1')[0].textContent = 'Titulo: ' + tarea.title
        t_tarea.querySelectorAll('h2')[0].textContent = 'Completada : ' + tarea.completed
        
        const clone = t_tarea.cloneNode(true)
        fragment.appendChild(clone)
    })
    listaTareas.appendChild(fragment)

    
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
        
        template.querySelector('.btn').dataset.id = usuario.id
        

        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
    })
    listaUsuarios.appendChild(fragment)
}