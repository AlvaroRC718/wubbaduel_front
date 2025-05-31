"use strict";
//////////////////////////////////Usuario y sesion////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
  const loginLink = document.getElementById('login-link');
  const userTokensDiv = document.getElementById('userTokens');
  const tokensCount = document.getElementById('tokensCount');

  const encryptedUser = localStorage.getItem('user');
  let savedUser = null;

  if (encryptedUser) {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedUser, 'wubbaduel');
      const decryptedStr = bytes.toString(CryptoJS.enc.Utf8);
      if (decryptedStr) {
        savedUser = JSON.parse(decryptedStr);
      }
    } catch (error) {
      console.warn("Error al desencriptar usuario:", error);
      localStorage.removeItem('user');
    }
  }

  if (savedUser) {
    loginLink.textContent = savedUser.username;
    loginLink.href = '/profile';

    userTokensDiv.style.display = 'block';
    tokensCount.textContent = savedUser.tokens || 0;
  } else {
    loginLink.textContent = 'Iniciar sesión';
    loginLink.href = '/login';
    userTokensDiv.style.display = 'none';
  }
});

//////////////////////////////////Musica y efectos de sonido////////////////////////////////

const buttons = document.querySelectorAll("a"); 
const musicButton = document.getElementById("toggleMusic");
const clickSound = document.getElementById("portalSound");
const backgroundMusic = document.getElementById("backgroundMusic"); 
const volumeControl = document.getElementById("volumeControl");

let musicTime = localStorage.getItem("musicTime"); 
let savedVolume = localStorage.getItem("musicVolume");

if (savedVolume !== null) {
  backgroundMusic.volume = parseFloat(savedVolume);
  if (volumeControl) volumeControl.value = savedVolume;
} else {
  backgroundMusic.volume = 1;
  if (volumeControl) volumeControl.value = 1;
}

clickSound.volume = 0.4;

function updateMusicIcon() { 
  musicButton.textContent = backgroundMusic.paused ? "🔇" : "🔊";
}

function toggleMusic() {
  if (backgroundMusic.paused) {
    backgroundMusic.play();
    localStorage.setItem("musicPlaying", "true");
  } else {
    backgroundMusic.pause();
    localStorage.setItem("musicPlaying", "false");
  }
  updateMusicIcon(); 
}

document.addEventListener('DOMContentLoaded', () => {
  // Restaurar posición si existía
  if (musicTime) {
    backgroundMusic.currentTime = parseFloat(musicTime);
  }

  // Intentar reproducir directamente
  backgroundMusic.play()
    .then(() => {
      localStorage.setItem("musicPlaying", "true");
      updateMusicIcon();
    })
    .catch(() => {
      // Si falla, esperar interacción del usuario
      const resumeMusic = () => {
        backgroundMusic.play().then(() => {
          localStorage.setItem("musicPlaying", "true");
          updateMusicIcon();
        });
        document.removeEventListener("click", resumeMusic);
      };
      document.addEventListener("click", resumeMusic);
    });
});

window.addEventListener("beforeunload", () => {
  localStorage.setItem("musicTime", backgroundMusic.currentTime);
});

musicButton.addEventListener("click", toggleMusic);

// Control del volumen de la música
if (volumeControl) {
  volumeControl.addEventListener("input", () => {
    const volume = parseFloat(volumeControl.value);
    backgroundMusic.volume = volume;
    localStorage.setItem("musicVolume", volume);
  });
}

//////////////////////////////////Modal Cartas////////////////////////////////

function openModal(cardElement) {
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modalContent');
  modalContent.innerHTML = cardElement.innerHTML;
  modalContent.className = 'modal-content ' + cardElement.classList.value;
  modalContent.classList.remove('locked-card');
  modal.style.display = 'flex';
}

function closeModal(event) {
  const modal = document.getElementById('modal');
  if (event.target === modal || event.target.classList.contains('close')) {
    modal.style.display = 'none';
  }
}
