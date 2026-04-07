import { db, storage, auth } from '../firebase-config.js';
import { ref, uploadString, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const sizePicker = document.getElementById('sizePicker');
let drawing = false;

// Configurações do Mouse
canvas.addEventListener('mousedown', () => drawing = true);
canvas.addEventListener('mouseup', () => { drawing = false; ctx.beginPath(); });
canvas.addEventListener('mousemove', draw);

function draw(e) {
    if (!drawing) return;
    const rect = canvas.getBoundingClientRect();
    
    ctx.lineWidth = sizePicker.value;
    ctx.lineCap = 'round';
    ctx.strokeStyle = colorPicker.value;

    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
}

document.getElementById('clearBtn').onclick = () => ctx.clearRect(0, 0, canvas.width, canvas.height);

// Postar desenho
document.getElementById('postBtn').onclick = async () => {
    if (!auth.currentUser) return alert("Você precisa estar logado para postar!");

    const btn = document.getElementById('postBtn');
    btn.disabled = true;
    btn.innerText = "Publicando...";

    try {
        const dataUrl = canvas.toDataURL("image/png");
        const storageRef = ref(storage, `galeria/${Date.now()}.png`);
        
        const snapshot = await uploadString(storageRef, dataUrl, 'data_url');
        const downloadURL = await getDownloadURL(snapshot.ref);

        await addDoc(collection(db, "posts"), {
            url: downloadURL,
            uid: auth.currentUser.uid,
            autor: auth.currentUser.displayName,
            timestamp: new Date()
        });

        alert("Sua arte foi enviada para a comunidade!");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    } catch (error) {
        console.error(error);
        alert("Erro ao postar.");
    } finally {
        btn.disabled = false;
        btn.innerText = "Postar na Comunidade";
    }
};