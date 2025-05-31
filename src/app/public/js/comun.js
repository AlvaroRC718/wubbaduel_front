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

////////////////////////////////// Música y efectos de sonido //////////////////////////////////

const musicButton = document.getElementById("toggleMusic");
const clickSound = document.getElementById("portalSound");
const backgroundMusic = document.getElementById("backgroundMusic");
const volumeControl = document.getElementById("volumeControl");

let savedVolume = localStorage.getItem("musicVolume");
let savedPlaying = localStorage.getItem("musicPlaying");

function updateMusicIcon(volume) {
  if (musicButton) {
    musicButton.textContent = volume > 0 ? "🔊" : "🔇";
  }
}

function setVolume(volume) {
  if (volumeControl) volumeControl.value = volume;
  if (backgroundMusic) backgroundMusic.volume = volume;
  if (clickSound) clickSound.volume = volume * 0.4;
  updateMusicIcon(volume);
}

document.addEventListener("DOMContentLoaded", () => {
  let initialVolume = 0;
  let isPlaying = false;

  if (savedVolume === null) {
    initialVolume = 0;
    localStorage.setItem("musicVolume", "0");
    localStorage.setItem("musicPlaying", "false");
  } else {
    initialVolume = parseFloat(savedVolume);
  }

  if (savedPlaying === "true" && initialVolume > 0) {
    backgroundMusic.play().then(() => {
      isPlaying = true;
      setVolume(initialVolume);
    }).catch(() => {
      initialVolume = 0;
      isPlaying = false;
      setVolume(0);
      localStorage.setItem("musicPlaying", "false");
      localStorage.setItem("musicVolume", "0");
    });
  } else {
    setVolume(0);
    localStorage.setItem("musicPlaying", "false");
    localStorage.setItem("musicVolume", "0");
  }

  const savedTime = localStorage.getItem("musicTime");
  if (backgroundMusic && savedTime) {
    backgroundMusic.currentTime = parseFloat(savedTime);
  }

  if (clickSound) {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
  }
});

window.addEventListener("beforeunload", () => {
  if (backgroundMusic) {
    localStorage.setItem("musicTime", backgroundMusic.currentTime);
  }
});

if (volumeControl) {
  volumeControl.addEventListener("input", () => {
    const volume = parseFloat(volumeControl.value);

    if (backgroundMusic) {
      backgroundMusic.volume = volume;

      if (volume > 0 && backgroundMusic.paused) {
        backgroundMusic.play().catch(() => {});
        localStorage.setItem("musicPlaying", "true");
      }

      if (volume === 0 && !backgroundMusic.paused) {
        backgroundMusic.pause();
        localStorage.setItem("musicPlaying", "false");
      }
    }

    if (clickSound) clickSound.volume = volume * 0.4;

    localStorage.setItem("musicVolume", volume);
    updateMusicIcon(volume);
  });
}

if (musicButton && volumeControl) {
  musicButton.addEventListener("click", () => {
    const currentVolume = parseFloat(volumeControl.value);
    const newVolume = currentVolume > 0 ? 0 : 1;
    volumeControl.value = newVolume;
    volumeControl.dispatchEvent(new Event("input"));
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
