"use strict";
document.addEventListener('DOMContentLoaded', () => {
  const savedUser = JSON.parse(localStorage.getItem('user'));
  if (savedUser) {
    const rewardSection = document.getElementById('reward-section');
    if (rewardSection) {
      rewardSection.classList.remove('hidden');
    }
  }
});