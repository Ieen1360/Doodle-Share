import { auth, db, provider, signInWithPopup } from '../firebase-config.js';
import { collection, query, where, onSnapshot, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const userInfo = document.getElementById('user-info');
const gallery = document.getElementById('my-gallery');

// Funções de Autenticação
loginBtn.onclick = async () => {
    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error("Erro no login:", error);
    }
};

logoutBtn.onclick = () => auth.signOut();

// Monitor de estado do usuário
auth.onAuthStateChanged(user => {
    if (user) {
        loginBtn.style.display = 'none';
        userInfo.style.display = 'flex';
        document.getElementById('user-name').innerText = user.displayName;
        document.getElementById('user-photo').src = user.photoURL;
        
        // Carrega apenas as artes DELE
        carregarMinhasArtes(user.uid);
    } else {
        loginBtn.style.display = 'block';
        userInfo.style.display = 'none';
        gallery.innerHTML = "<p>Faça login para ver sua galeria pessoal.</p>";
    }
});

function carregarMinhasArtes(uid) {
    const q = query(
        collection(db, "posts"), 
        where("uid", "==", uid),
        orderBy("timestamp", "desc")
    );

    onSnapshot(q, (snapshot) => {
        gallery.innerHTML = "";
        snapshot.forEach(doc => {
            const data = doc.data();
            gallery.innerHTML += `
                <div class="card">
                    <img src="${data.url}" loading="lazy">
                    <small>${new Date(data.timestamp?.toDate()).toLocaleDateString()}</small>
                </div>`;
        });
    });
}