"use strict";

//////////////////////////////////Musica y efectos de sonido////////////////////////////////
const buttons = document.querySelectorAll("a"); 
const musicButton = document.getElementById("toggleMusic")
const clickSound = document.getElementById("portalSound");
const backgroundMusic = document.getElementById("backgroundMusic"); 
const isMusicPlaying = localStorage.getItem("musicPlaying") === "true"; 
let musicTime = localStorage.getItem("musicTime"); 

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
  if (isMusicPlaying) {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
  }

  if (isMusicPlaying) {
    backgroundMusic.play();
    if (musicTime) { 
      backgroundMusic.currentTime = parseFloat(musicTime);
    }
  }
  updateMusicIcon(); 
});

if (isMusicPlaying) {
  backgroundMusic.play();
  if (musicTime) { 
    backgroundMusic.currentTime = parseFloat(musicTime);
  }
}

updateMusicIcon(); 

setInterval(() => {
  if (!backgroundMusic.paused) {
    localStorage.setItem("musicTime", backgroundMusic.currentTime);
  }
}, 500);

buttons.forEach(button => {
  const href = button.getAttribute("href");

  if (href && href !== "#" && !href.startsWith("javascript:")) {
    button.addEventListener("click", (event) => {
      event.preventDefault(); 

      if (!backgroundMusic.paused) {
        clickSound.currentTime = 0;
        clickSound.play().catch(() => {});
      }

      const navigate = () => window.location.href = href;
      setTimeout(navigate, 800); 
    });
  }
});

musicButton.addEventListener("click", toggleMusic);

//////////////////////////////////Modal Cartas////////////////////////////////

function openModal(cardElement) {
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modalContent');
  modalContent.innerHTML = cardElement.innerHTML;
  modalContent.className = 'modal-content ' + cardElement.classList.value;
  modal.style.display = 'flex';
}

function closeModal(event) {
  const modal = document.getElementById('modal');
  if (event.target === modal || event.target.classList.contains('close')) {
    modal.style.display = 'none';
  }
}
