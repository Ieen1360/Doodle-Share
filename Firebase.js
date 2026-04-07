// 1. Importa os SDKs via CDN (necessário para rodar direto no navegador)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 2. Sua configuração (já com seus dados reais)
const firebaseConfig = {
  apiKey: "AIzaSyA8xGMVUOofN6wwmhQJieVvSJAtYxT9Ino",
  authDomain: "drawing-a9265.firebaseapp.com",
  projectId: "drawing-a9265",
  storageBucket: "drawing-a9265.firebasestorage.app",
  messagingSenderId: "988595107144",
  appId: "1:988595107144:web:94d9bb603a42e78efeef7d",
  measurementId: "G-RGGPY02ZLV"
};

// 3. Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// 4. Exporta as funções para usar nos seus arquivos da pasta /js
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export { signInWithPopup };