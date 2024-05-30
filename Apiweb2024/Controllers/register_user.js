import { registerauth } from "../Controllers/firebase.js";
import { db } from "../Controllers/firebase.js";
import {
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const save_auth = document.getElementById("btnregister");

async function register() {
  const email = document.getElementById("confirmarEmail").value;
  const psw = document.getElementById("confirmarContraseña").value;
  const nombreCompleto = document.getElementById("nombreCompleto").value;
  const cedula = document.getElementById("cedula").value;
  const telefono = document.getElementById("telefono").value;
  const direccion = document.getElementById("direccion").value;
  const fechaNacimiento = document.getElementById("fechaNacimiento").value;

  try {
    const verificar = await registerauth(email, psw);

    alert("El usuario se registro exitosamente..");
    const user = verificar.user;

    const userDoc = doc(db, "users", user.uid);
    await setDoc(userDoc, {
      id: user.uid,
      nombreCompleto: nombreCompleto,
      cedula: cedula,
      telefono: telefono,
      direccion: direccion,
      fechaNacimiento: fechaNacimiento,
      isAdmin: false,
    });

    window.location.href = "/loginn.html";
  } catch (error) {
    alert("no sucessfull");
    const errorCode = error.code;
    const errorMessage = error.message;
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  save_auth.addEventListener("click", register);
});
