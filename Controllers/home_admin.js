import{userstate, loginout} from './firebase.js'
import { db, registerauth, deleteUser } from "../Controllers/firebase.js"; 
import { doc, setDoc } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js'; 

const sesion = document.getElementById('btnlogout')
const formCreateUser = document.getElementById('formRegister')
const mirar = document.getElementById('ver')

mirar.addEventListener('click', function(){
    window.location.href = "./lista.html"
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

async function createUser(event) {
    event.preventDefault()

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const nombreCompleto = document.getElementById('nombreCompleto').value;
    const cedula = document.getElementById('cedula').value;
    const telefono = document.getElementById('telefono').value;
    const direccion = document.getElementById('direccion').value;
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;

    try {
        const verificar = await registerauth(email, password);
        
        alert('El usuario se registro exitosamente..');
        const user = verificar.user;

        const userDoc = doc(db, 'users', user.uid); 
        await setDoc(userDoc, {
            id: id,
            nombreCompleto: nombreCompleto,
            cedula: cedula,
            telefono: telefono,
            direccion: direccion,
            fechaNacimiento: fechaNacimiento,
            isAdmin: false  // Todos los nuevos usuarios son usuarios normales por defecto
        }); 
        formCreateUser.reset();

        // No redirigimos después de crear un usuario
    } catch (error) {
        alert('No se pudo registrar el usuario');
        const errorCode = error.code;
        const errorMessage = error.message;
    }
}

async function eliminarUsuario(){
    try {
        await deleteUser()
        alert('Usuario eliminado exitosamente')
        window.location.href="../loginn.html"
    } catch (error) {
        console.log(error)
        alert('Error al eliminar el usuario')
    }
}

window.addEventListener('DOMContentLoaded', async()=>{
    sesion.addEventListener('click', cerrarsesion)
    formCreateUser.addEventListener('submit', createUser) 
    eliminar.addEventListener('click', eliminarUsuario)
})
