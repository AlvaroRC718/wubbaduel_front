"use strict";
document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("reward-video");
  const claimButton = document.getElementById("claim-coins");
  const playPauseBtn = document.getElementById("play-pause-btn");
  const muteBtn = document.getElementById("mute-btn");

  let lastTime = 0;
  const requiredTime = 15;

  video.addEventListener("timeupdate", function () {
    let remainingTime = Math.max(0, requiredTime - Math.floor(video.currentTime));
    claimButton.disabled = remainingTime > 0;
    claimButton.textContent = remainingTime > 0
      ? `Espera ${remainingTime}s`
      : "Reclamar Tickets de Blitz & Chitz";
    lastTime = Math.max(lastTime, video.currentTime);
  });

  video.addEventListener("seeking", function () {
    if (video.currentTime > lastTime) {
      video.currentTime = lastTime;
    }
  });

  playPauseBtn.addEventListener("click", function () {
    if (video.paused) {
      video.play();
      playPauseBtn.textContent = "⏸";
      backgroundMusic.volume = 0.2;
    } else {
      video.pause();
      playPauseBtn.textContent = "▶️";
      backgroundMusic.volume = 1;
    }
  });

  muteBtn.addEventListener("click", function () {
    video.muted = !video.muted;
    muteBtn.textContent = video.muted ? "🔇" : "🔊";
  });

  claimButton.addEventListener("click", async function () {
    try {
      const encrypted = localStorage.getItem('user');
      const bytes = CryptoJS.AES.decrypt(encrypted, 'wubbaduel');
      let user = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      let userId = user.id;

      const response = await fetch("http://localhost:8080/api/user/tokens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userId, tokens: 50 }),
      });

      const data = await response.json();

      if (response.ok) {
        user.tokens = data.tokens;
        const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(user), 'wubbaduel').toString();
        localStorage.setItem('user', encryptedUser);

        alert("¡Has ganado 50 Tickets de Blitz & Chits!");
        window.location.href = "shop";
      } else {
        alert(data.message || "Error al reclamar.");
      }
    } catch (error) {
      console.error("Error al procesar:", error);
      alert("Error de conexión con el servidor.");
    }
  });
});
