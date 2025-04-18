"use strict";

// Botones
const buttons = document.querySelectorAll("a"); // Obtener todos los enlaces
const musicButton = document.getElementById("toggleMusic"); // Botón de música

// Audio
const clickSound = document.getElementById("portalSound"); // Sonido del portal
const backgroundMusic = document.getElementById("backgroundMusic"); // Música de fondo
const isMusicPlaying = localStorage.getItem("musicPlaying") === "true"; // Comprobar estado de la música
let musicTime = localStorage.getItem("musicTime"); // Obtener el tiempo guardado de la música

// Funciones
function updateMusicIcon() { // Cambio de icono del botón de música
  musicButton.textContent = backgroundMusic.paused ? "🔇" : "🔊";
}

function toggleMusic() {
  if (backgroundMusic.paused) { // Si está pausada, reproducirla
    backgroundMusic.play();
    localStorage.setItem("musicPlaying", "true");
  } else {
    backgroundMusic.pause();
    localStorage.setItem("musicPlaying", "false");
  }
  updateMusicIcon(); // Actualizar icono del botón
}

// Inicialización
if (isMusicPlaying) {
  backgroundMusic.play();
  if (musicTime) { // Si hay un tiempo guardado, restaurarlo
    backgroundMusic.currentTime = parseFloat(musicTime);
  }
}

updateMusicIcon(); // Establecer el icono según el estado de la música

// Guardar el tiempo de la música en localStorage cada segundo
setInterval(() => {
  if (!backgroundMusic.paused) {
    localStorage.setItem("musicTime", backgroundMusic.currentTime);
  }
}, 1000);

// Reproducir sonido de portal al hacer clic en cualquier enlace
buttons.forEach(button => {
  const href = button.getAttribute("href");

  // Ignorar enlaces vacíos o enlaces con JavaScript
  if (href && href !== "#" && !href.startsWith("javascript:")) {
    button.addEventListener("click", (event) => {
      event.preventDefault(); // Prevenir navegación inmediata

      if (!backgroundMusic.paused) { // Solo si la música está activa
        clickSound.currentTime = 0; // Reiniciar el sonido
        clickSound.play().catch(() => {}); // Reproducir sonido de portal
      }

      // Navegar a la página después de la animación del sonido
      const navigate = () => window.location.href = href;
      setTimeout(navigate, 800); // Esperar un poco para escuchar el sonido antes de navegar
    });
  }
});

// Manejar el botón de música
musicButton.addEventListener("click", toggleMusic);
