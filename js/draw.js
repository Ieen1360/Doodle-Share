const canvas = document.getElementById('canvas-desenho');
const ctx = canvas.getContext('2d');
let desenhando = false;

// Configuração inicial do pincel
ctx.lineWidth = 5;
ctx.lineCap = 'round';
ctx.strokeStyle = '#000000'; // Cor preta

function iniciarDesenho(e) {
    desenhando = true;
    desenhar(e);
}

function pararDesenho() {
    desenhando = false;
    ctx.beginPath(); // Reseta o caminho para não ligar linhas distantes
}

function desenhar(e) {
    if (!desenhando) return;

    // Ajusta a posição do mouse em relação ao canvas
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

// Eventos do Mouse
canvas.addEventListener('mousedown', iniciarDesenho);
canvas.addEventListener('mouseup', pararDesenho);
canvas.addEventListener('mousemove', desenhar);

// Proteção: Só desenha se estiver logado
auth.onAuthStateChanged((user) => {
    if (!user) {
        alert("Você precisa estar logado para desenhar!");
        window.location.href = "index.html";
    }
});
