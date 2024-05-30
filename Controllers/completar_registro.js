import { doc, setDoc } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js';
import { db, getAuth } from "../Controllers/firebase.js"; 

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('complete-registration-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const auth = getAuth();
        const user = auth.currentUser;

        const nombreCompleto = document.getElementById('nombreCompleto').value;
        const cedula = document.getElementById('cedula').value;
        const telefono = document.getElementById('telefono').value;
        const direccion = document.getElementById('direccion').value;
        const fechaNacimiento = document.getElementById('fechaNacimiento').value;

        const userDoc = doc(db, 'users', user.uid); 
        await setDoc(userDoc, {
            nombreCompleto: nombreCompleto,
            cedula: cedula,
            telefono: telefono,
            direccion: direccion,
            fechaNacimiento: fechaNacimiento,
            isAdmin: false  
        });

        window.location.href = "./Templates/home.html";
    });
});
