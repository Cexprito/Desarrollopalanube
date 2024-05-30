import {loginauth, signInWithGoogle, signInWithFacebook, recoverPassword} from "../Controllers/firebase.js"
import { db } from "../Controllers/firebase.js"; 
import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js'; 

const recibir = document.getElementById("boton_n")

const evento = document.getElementById("boton_n")
const googleEvento = document.getElementById("google_login_btn")
const facebookEvento = document.getElementById("facebook_login_btn")
const recoverEvento = document.getElementById("recuperar_btn")

async function validar(){

    const email = document.getElementById('email').value
    const password=document.getElementById('password').value

    try {
        const verificar = await loginauth(email,password)

        if(verificar && verificar.user){
            const user = verificar.user;
            const userDoc = doc(db, 'users', user.uid); 
            const docSnap = await getDoc(userDoc);

            if (docSnap.exists() && docSnap.data().isAdmin) {
                alert("Usuario autenticado como administrador: " + email)
                window.location.href = "/Templates/home_admin.html"
            } else {
                alert("Usuario autenticado: " + email)
                window.location.href = "/Templates/home.html"
            }
        }else{
            console.log("Sesion "+ email + " not validation")
            alert("Error de usuario verifique usuario y/o contraseña")
        }
    } catch (error) {
        console.log(error);
        alert("Error de autenticación");
    }

}
//falta hacer que al inicar con google y facebook se asigne el rol de usuario normal
export const validarGoogle = async () => {
    const result = await signInWithGoogle();
    const user = result.user;
    const userDoc = doc(db, 'users', user.uid); 
    const docSnap = await getDoc(userDoc);

    if (!docSnap.exists()) {
        // Si el documento del usuario no existe en Firestore, redirige al usuario a la página de completar registro
        window.location.href = "/Templates/completar_registro.html";
    } else {
        // Si el documento del usuario ya existe en Firestore, verifica si el usuario es un administrador
        if (docSnap.data().isAdmin) {
            alert("Usuario autenticado como administrador: " + user.email)
            window.location.href = "/Templates/home_admin.html"
        } else {
            alert("Usuario autenticado: " + user.email)
            window.location.href = "/Templates/home.html"
        }
    }
}

async function validarFacebook(){
    const verificar = signInWithFacebook()
    const validation = await verificar 

    if(verificar != null){
        alert("Usuario autenticado con Facebook")
        window.location.href = "../Templates/home.html"
    }else{
        console.log("Sesion Facebook not validation")
        alert("Error de usuario verifique usuario y/o contraseña")
    }
}

async function recuperar(){
    const email = document.getElementById('emailR').value
    if (!email) {
        document.getElementById('error-message').textContent = 'Se deben llenar todos los campos';
        return;
    }
    try {
        await recoverPassword(email)
        alert("Se ha enviado un correo electrónico para restablecer tu contraseña a " + email)
    } catch (error) {
        console.log(error)
        alert("Error al enviar el correo electrónico de recuperación de contraseña")
    }
}
document.addEventListener('DOMContentLoaded', (event) => {
    evento.addEventListener('click', validar)
    googleEvento.addEventListener('click', validarGoogle)
    facebookEvento.addEventListener('click', validarFacebook)
})

document.addEventListener('DOMContentLoaded', (event) => {
     if (recoverEvento != null) {
        recoverEvento.addEventListener('click', recuperar)
    }
})
