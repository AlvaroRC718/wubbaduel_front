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

    //////////////////////////////////Fecha ultimo login////////////////////////////////
    const oneDayInMs = 24 * 60 * 60 * 1000;
    const now = new Date();

    let shouldShowReward = false;

    if (!savedUser.lastLogin) {
      shouldShowReward = true;
    } else {
      const lastLoginDate = new Date(savedUser.lastLogin);
      const timeDifference = now - lastLoginDate;

      if (timeDifference >= oneDayInMs) {
        shouldShowReward = true;
      }
    }

    if (shouldShowReward) {
      openDailyRewardModal(savedUser); // Ya no se actualiza la fecha aquí
    }
  } else {
    loginLink.textContent = 'Iniciar sesión';
    loginLink.href = '/login';
    userTokensDiv.style.display = 'none';
  }

  ////////////////////////////////////Musica y efectos de sonido////////////////////////////////
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

  if (isMusicPlaying) {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => { });

    backgroundMusic.addEventListener("canplaythrough", () => {
      if (musicTime) {
        backgroundMusic.currentTime = parseFloat(musicTime);
      }
      backgroundMusic.play().catch(() => { });
    }, { once: true });
  }
  updateMusicIcon();

  window.addEventListener("beforeunload", () => {
    localStorage.setItem("musicTime", backgroundMusic.currentTime);
  });

  musicButton.addEventListener("click", toggleMusic);

  ////////////////////////////////////Modal recompensa diaria (modificado)////////////////////////////////

  function openDailyRewardModal(userData) {
    let dailyModal = document.getElementById('dailyRewardModal');

    const closeBtn = dailyModal.querySelector('#closeDailyModal');
    const claimBtn = dailyModal.querySelector('#claimDailyRewardBtn');
    const tokensCountEl = document.getElementById('tokensCount');

    dailyModal.style.display = 'flex';

    closeBtn.onclick = () => {
      dailyModal.style.display = 'none';
    };

    dailyModal.onclick = (e) => {
      if (e.target === dailyModal) {
        dailyModal.style.display = 'none';
      }
    };

    claimBtn.onclick = async () => {
      try {
        const encrypted = localStorage.getItem('user');
        const bytes = CryptoJS.AES.decrypt(encrypted, 'wubbaduel');
        let user = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        let userId = user.id;

        const response = await fetch("http://localhost:8080/api/user/tokens", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: userId, tokens: 200 }),
        });

        const data = await response.json();

        if (response.ok) {
          user.tokens = data.tokens;
          user.lastLogin = new Date().toISOString();

          await fetch("http://localhost:8080/api/user/update-last-login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId: userId })
          });

          const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(user), 'wubbaduel').toString();
          localStorage.setItem('user', encryptedUser);

          tokensCountEl.textContent = user.tokens;

          alert("¡Has reclamado 200 Tickets de Blitz & Chitz!");
          dailyModal.style.display = 'none';
        } else {
          alert(data.message || "Error al reclamar.");
        }
      } catch (error) {
        console.error("Error al procesar la recompensa diaria:", error);
        alert("Error de conexión con el servidor.");
      }
    };
  }
});

////////////////////////////////////Modal Cartas////////////////////////////////

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