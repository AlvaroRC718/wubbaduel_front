"use strict";
document.addEventListener('DOMContentLoaded', () => {
  try {
    const encrypted = localStorage.getItem('user');
    if (encrypted) {
      const decrypted = CryptoJS.AES.decrypt(encrypted, 'wubbaduel').toString(CryptoJS.enc.Utf8);
      const savedUser = JSON.parse(decrypted);

      if (savedUser) {
        const rewardSection = document.getElementById('reward-section');
        if (rewardSection) {
          rewardSection.classList.remove('hidden');
        }
      }
    }
  } catch (e) {
    console.error("Error desencriptando el usuario", e);
  }
});
