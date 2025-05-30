'use strict';
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const portalSound = document.getElementById('portalSound');

let modalAbierto = false;

function openModal(card) {
  if (modalAbierto) return;

  modalAbierto = true;
  modalContent.innerHTML = '';

  // Clonación de la carta original
  const cardClone = card.cloneNode(true);
  cardClone.classList.remove('card-flyout');
  cardClone.classList.add('modal-card');
  cardClone.onclick = null;

  // portal animado
  const portalDiv = document.createElement('div');
  portalDiv.className = 'portal-wrapper';
  const portalImg = document.createElement('img');
  portalImg.src = 'resources/img/portal.gif';
  portalImg.alt = 'Portal Rick and Morty';
  portalDiv.appendChild(portalImg);

  // botón "X" pero oculto al principio
  const closeButton = document.createElement('span');
  closeButton.className = 'close-button';
  closeButton.innerHTML = '×';
  closeButton.style.display = 'none';
  closeButton.onclick = closeModal;

  // Mostrar el botón "X" después de la animación
  cardClone.addEventListener('animationend', () => {
    closeButton.style.display = 'block';
  });

  // Ensamblar el modal
  modalContent.appendChild(portalDiv);
  modalContent.appendChild(cardClone);
  modalContent.appendChild(closeButton);

  modal.style.display = 'flex';
  portalSound.currentTime = 0;
  portalSound.play();
}

function closeModal(event) {
  if (!event || event.target.id === 'modal' || event.target.classList.contains('close-button')) {
    modal.style.display = 'none';
    modalContent.innerHTML = '';
    portalSound.pause();
    modalAbierto = false;
  }
}

modal.addEventListener('click', closeModal);