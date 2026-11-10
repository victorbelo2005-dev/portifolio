const canvas = document.getElementById('fundo');
const ctx = canvas.getContext('2d');

const QAUNTIDADE = 70;
const DISTANCIA = 120;
let particulas = [];

function ajustarTamanho() {
    canvas.width = canvas.offsetWidth;
    canvas.heigth = canvas.offsetHeight;
}

class Particula {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.8;
    this.vy = (Math.random() - 0.5) * 0.8;
    this.raio = Math.random() * 2 + 1;
  }

  mover() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }

  desenhar() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.raio, 0, Math.PI * 2);
    ctx.fillStyle = '#7FB3D5';
    ctx.fill();
  }
}

function criarParticulas() {
    particulas = [];
    for (let i = 0; i < QUANTIDADE; i++) {
        particulas.push(new Particula());
    }
}

function ligarParticulas() {
    for (let a = 0; a < particulas.length; a++) {
        for (let b = a + 1; b < particulas.length; b++) {
            const dx = particulas[a].x - particulas[b].x;
            const dy = particulas[a].y - particulas[b].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < DISTANCIA) {
                ctx.strokeStyle = `rgba(127, 179, 213, ${1 - dist / DISTANCIA})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particulas[a].x, particulas[a].y);
                ctx.lineTo(particulas[b].x, particulas[b].y);
                ctx.stroke();
            }
        }
    }
}

function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particulas.forEach(p => {
        p.mover();
        p.desenhar();
    });

    ligarParticulas();
    requestAnimationFrame(animar);
}

window.addEventListener('resize', () => {
    ajustarTamanho();
    criarParticulas();
});

ajustarTamanho();
criarParticulas();

const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduzirMovimento) {
  animar();
} else {
  particulas.forEach(p => p.desenhar());
  ligarParticulas();
}
