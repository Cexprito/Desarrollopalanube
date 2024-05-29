document.getElementById("registroForm").addEventListener("submit", async function (event) {
    event.preventDefault(); 

    var email = document.getElementById("veremail").value;
    var confirmarEmail = document.getElementById("confirmarEmail").value;
    var contraseña = document.getElementById("verpassword").value;
    var confirmarContraseña = document.getElementById("confirmarContraseña").value;
    var nombreCompleto = document.getElementById("nombreCompleto").value;
    var cedula = document.getElementById("cedula").value;
    var telefono = document.getElementById("telefono").value;
    var direccion = document.getElementById("direccion").value;
    var fechaNacimiento = document.getElementById("fechaNacimiento").value;

    // Validaciones
    if (!email || !confirmarEmail || !contraseña || !confirmarContraseña || !nombreCompleto || !cedula || !telefono || !direccion || !fechaNacimiento) {
        alert("Por favor, llena todos los campos.");
        return;
    }

    if (email !== confirmarEmail) {
        alert("Los correos electrónicos no coinciden.");
        return;
    }

    if (contraseña !== confirmarContraseña) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(contraseña)) {
        alert('La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número, un carácter especial y al menos 8 caracteres de longitud.');
        return;
    }

    
});
