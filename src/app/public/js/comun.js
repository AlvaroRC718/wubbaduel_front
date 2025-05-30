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
const isMusicPlaying = localStorage.getItem("musicPlaying") === "true"; 
let musicTime = localStorage.getItem("musicTime"); 

clickSound.volume = 0.4;
backgroundMusic.volume = 1;

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
  if (isMusicPlaying) {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});

    if (musicTime) {
      backgroundMusic.currentTime = parseFloat(musicTime);
    }

    backgroundMusic.play().catch(() => {});
  }
  updateMusicIcon(); 
});

window.addEventListener("beforeunload", () => {
  localStorage.setItem("musicTime", backgroundMusic.currentTime);
});

musicButton.addEventListener("click", toggleMusic);

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
