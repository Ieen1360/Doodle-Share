const btnGoogle = document.getElementById('btn-google');

if (btnGoogle) {
    btnGoogle.addEventListener('click', () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                console.log("Logado com sucesso:", result.user.displayName);
                // Redireciona para a tela de desenho após o login
                window.location.href = "draw.html";
            })
            .catch((error) => {
                console.error("Erro ao logar:", error.message);
                alert("Erro ao entrar com Google: " + error.message);
            });
    });
}

// Verifica se o usuário já está logado
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log("Usuário já está na sessão:", user.displayName);
    }
});
