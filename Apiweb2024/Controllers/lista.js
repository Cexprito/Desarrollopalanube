import { collection, getDocs, deleteDoc } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js';
import { db } from "../Controllers/firebase.js"; 

async function viewAndDeleteUsers() {
    const userList = document.getElementById('userList');
    const querySnapshot = await getDocs(collection(db, 'users'));
    querySnapshot.forEach((doc) => {
        const user = doc.data();
        const userElement = document.createElement('div');
        userElement.innerHTML = `
            <h4>${user.nombreCompleto}</h4>
    
        `;
        userList.appendChild(userElement);
    });
}



window.addEventListener('DOMContentLoaded', viewAndDeleteUsers);
