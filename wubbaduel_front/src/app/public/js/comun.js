"use strict";
//////////////////////////////////Usuario y sesion////////////////////////////////
/*/Usuario Pruebas
const userTest = {
  id: 718,
  username: 'El_Kaki718',
  email: 'alvaro_718@hotmail.es',
  avatarUrl: 'resources/img/logo.png',
  tokens: 9999999,
};
localStorage.setItem('user', JSON.stringify(userTest));*/

document.addEventListener('DOMContentLoaded', () => {
  const loginLink = document.getElementById('login-link');
  const userTokensDiv = document.getElementById('userTokens');
  const tokensCount = document.getElementById('tokensCount');

  const savedUser = JSON.parse(localStorage.getItem('user'));

  if (savedUser) {
    loginLink.textContent = savedUser.username;
    loginLink.href = '/profile';

    userTokensDiv.style.display = 'block';
    tokensCount.textContent = savedUser.tokens || 0;
  }else{
    loginLink.textContent = 'Iniciar sesión';
    loginLink.href = '/login';
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
