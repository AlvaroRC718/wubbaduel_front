"use strict";
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
