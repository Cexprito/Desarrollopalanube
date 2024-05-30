import { userstate, loginout, deleteUser } from '../Controllers/firebase.js'

userstate()

const sesion = document.getElementById('btnlogout') 
const recuperar = document.getElementById('recuperar')
const eliminar = document.getElementById('eliminar')

recuperar.addEventListener('click', function(){
    window.location.href = "/Templates/recuperar_contrasena.html"
})

async function cerrarsesion(){
    const verificacion=loginout()
    const comprobar = await verificacion

    .then((comprobar)=>{
        alert('Sesion cerrada')
        window.location.href="../loginn.html"
    })
    .catch((error)=>{
        alert('Sesion no cerrada')
    })
}

async function eliminarUsuario(){
    try {
        await deleteUser()
        alert('Usuario eliminado exitosamente')
        window.location.href="../loginn.html"
    } catch (error) {
        console.log(error)
        alert('Error al eliminar el usuario, puede que lleves mucho tiempo logueado')
    }
}

window.addEventListener('DOMContentLoaded', async()=>{
    sesion.addEventListener('click', cerrarsesion)
    eliminar.addEventListener('click', eliminarUsuario)
})
