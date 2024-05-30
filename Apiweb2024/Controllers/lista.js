import {
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { db, deleteUserById } from "../Controllers/firebase.js";

async function viewAndDeleteUsers() {
  const userList = document.getElementById("userList");
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    const user = doc.data();
    const userElement = document.createElement("div");
    userElement.innerHTML = `
            <h4>${user.nombreCompleto}</h4>
            <button type="button" class="delete-btn button bg-red txt-white w-20" data-id="${user["id"]}">Eliminar</button>
            <button type="button" class="update-btn" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="${user["id"]}">Actualizar</button>
        `;
    userList.appendChild(userElement);
  });

  const exampleModal = document.getElementById("exampleModal");
  if (exampleModal) {
    exampleModal.addEventListener("show.bs.modal", async (event) => {
      const button = event.relatedTarget;
      const userId = button.getAttribute("data-bs-whatever");
      const modalTitle = exampleModal.querySelector(".modal-title");
      const saveDataBtn = document.getElementById("save-data-btn");
      const userName = document.getElementById("name-text");
      const cc = document.getElementById("cc-text");
      const address = document.getElementById("address-text");
      const phone = document.getElementById("phone-text");
      const bornDate = document.getElementById("born-date-text");

      const modalBodyInput = exampleModal.querySelector(".modal-body input");
      getDoc(doc(db, "users", userId)).then((d) => {
        const userD = d.data();
        userName.value = userD.nombreCompleto;
        cc.value = userD.cedula;
        address.value = userD.direccion;
        phone.value = userD.telefono;
        bornDate.value = userD.fechaNacimiento;
        modalTitle.textContent = `Editar a ${userName.value}`;

        saveDataBtn.addEventListener("click", async () => {
          await updateDoc(doc(db, "users", userId), {
            id: userId,
            nombreCompleto: userName.value,
            cedula: cc.value,
            telefono: phone.value,
            direccion: address.value,
            fechaNacimiento: bornDate.value,
            isAdmin: userD.isAdmin,
          }).then(() => {
            alert("Se actualizaron los datos");
            window.location.reload();
          });
        });
      });
    });
  }
  userList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const id = e.target.dataset.id;
      deleteUserById(id)
        .then(() => {
          alert("Usuario eliminado");
          window.location.reload();
        })
        .catch((e) => {
          alert(e);
        });
    }
  });
}

window.addEventListener("DOMContentLoaded", viewAndDeleteUsers);
