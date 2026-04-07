const feed = document.getElementById('feed-comunidade');

auth.onAuthStateChanged((user) => {
    if (user) {
        console.log("Logado na comunidade como:", user.displayName);
        feed.innerHTML = `<p>Olá, ${user.displayName}! O sistema de comunidade está carregando...</p>`;
        // Aqui você adicionaria a lógica para puxar os desenhos do Firestore
    } else {
        feed.innerHTML = `<p>Faça login para ver a comunidade.</p>`;
    }
});
