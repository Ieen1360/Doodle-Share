import { db } from '../firebase-config.js';
import { collection, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const globalGallery = document.getElementById('global-gallery');

// Busca todas as artes ordenadas por tempo
const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));

onSnapshot(q, (snapshot) => {
    globalGallery.innerHTML = "";
    
    if (snapshot.empty) {
        globalGallery.innerHTML = "<p>Ainda não há desenhos na comunidade. Seja o primeiro!</p>";
        return;
    }

    snapshot.forEach((doc) => {
        const data = doc.data();
        const card = `
            <div class="card">
                <img src="${data.url}" loading="lazy">
                <div class="info">
                    <p>Por: <b>${data.autor}</b></p>
                </div>
            </div>
        `;
        globalGallery.innerHTML += card;
    });
});