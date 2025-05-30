let cards = [];
let userCards = [];
let favoriteCardIds = [];

/////////////////////////////////////Favoritas//////////////////////////////////
async function fetchFavoriteCardIds() {
  try {
    // Desencriptar en línea al leer localStorage
    const encryptedUser = localStorage.getItem("user");
    if (!encryptedUser) return [];
    const decryptedUserStr = CryptoJS.AES.decrypt(encryptedUser, 'wubbaduel').toString(CryptoJS.enc.Utf8);
    if (!decryptedUserStr) return [];
    const savedUser = JSON.parse(decryptedUserStr);
    if (!savedUser || !savedUser.id) return [];

    const response = await fetch('http://localhost:8080/api/decks/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: savedUser.id }),
    });

    if (response.ok) {
      const favorites = await response.json();
      return favorites.map(fav => fav.card.id);
    } else {
      console.error("Error al obtener las cartas favoritas", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error en la solicitud de favoritos", error);
    return [];
  }
}

async function toggleFavorite(event, cardId) {
  try {
    const encryptedUser = localStorage.getItem("user");
    if (!encryptedUser) return;
    const decryptedUserStr = CryptoJS.AES.decrypt(encryptedUser, 'wubbaduel').toString(CryptoJS.enc.Utf8);
    if (!decryptedUserStr) return;
    const savedUser = JSON.parse(decryptedUserStr);
    if (!savedUser || !savedUser.id) return;

    // Verificamos que la carta este desbloqueada
    const userCardsIds = userCards.map(uc => uc.card.id);
    if (!userCardsIds.includes(cardId)) {
      alert("No puedes seleccionar como favorito una carta que no está desbloqueada.");
      return;
    }

    const button = event.currentTarget;
    const isCurrentlyFavorite = favoriteCardIds.includes(cardId);

    if (isCurrentlyFavorite) {
      // 🔴 Eliminar de favoritos
      const success = await removeFromFavorites(savedUser.id, cardId);
      if (success) {
        favoriteCardIds = favoriteCardIds.filter(id => id !== cardId);
        button.textContent = "🤍";
      }
    } else {
      // ⚪ Agregar a favoritos (máximo 3)
      if (favoriteCardIds.length >= 3) {
        alert("Solo puedes tener 3 cartas favoritas.");
        return;
      }

      const success = await addToFavorites(savedUser.id, cardId);
      if (success) {
        favoriteCardIds.push(cardId);
        button.textContent = "❤️";
      }
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
  }
}

async function addToFavorites(userId, cardId) {
  try {
    const response = await fetch('http://localhost:8080/api/decks/add-favorite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, cardId }),
    });
    return response.ok;
  } catch (error) {
    console.error("Error al añadir a favoritos", error);
    return false;
  }
}

async function removeFromFavorites(userId, cardId) {
  try {
    const response = await fetch('http://localhost:8080/api/decks/remove-favorite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, cardId }),
    });
    return response.ok;
  } catch (error) {
    console.error("Error al quitar de favoritos", error);
    return false;
  }
}

/////////////////////////////////////Solicitar cartas//////////////////////////////////

async function fetchAllCards() {
  try {
    const response = await fetch('http://localhost:8080/api/cards');
    if (response.ok) {
      return await response.json();
    } else {
      console.error('Error al obtener las cartas', response.status);
      return [];
    }
  } catch (error) {
    console.error('Error en la solicitud a la API', error);
    return [];
  }
}

async function fetchUnlockedCards() {
  try {
    // Desencriptar usuario en línea
    const encryptedUser = localStorage.getItem("user");
    if (!encryptedUser) {
      console.error('Usuario no encontrado en localStorage');
      return [];
    }
    const decryptedUserStr = CryptoJS.AES.decrypt(encryptedUser, 'wubbaduel').toString(CryptoJS.enc.Utf8);
    if (!decryptedUserStr) {
      console.error('Error al desencriptar usuario');
      return [];
    }
    const savedUser = JSON.parse(decryptedUserStr);
    if (!savedUser || !savedUser.id) {
      console.error('Usuario inválido');
      return [];
    }

    const response = await fetch('http://localhost:8080/api/user-cards/get-by-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: savedUser.id }),
    });

    if (response.ok) {
      return await response.json();
    } else {
      console.error('Error al obtener las cartas del usuario', response.status);
      return [];
    }
  } catch (error) {
    console.error('Error en la solicitud a la API', error);
    return [];
  }
}

function generateCards() {
  const container = document.getElementById("cards-container");

  // Desencriptar usuario en línea
  const encryptedUser = localStorage.getItem("user");
  let savedUser = null;
  if (encryptedUser) {
    const decryptedUserStr = CryptoJS.AES.decrypt(encryptedUser, 'wubbaduel').toString(CryptoJS.enc.Utf8);
    if (decryptedUserStr) savedUser = JSON.parse(decryptedUserStr);
  }

  const searchQuery = document.getElementById("searchInput").value.toLowerCase();
  const selectedRarity = document.getElementById("rarityFilter").value;

  container.innerHTML = '';

  const userCardsIds = userCards.map(userCard => userCard.card.id);

  const filteredCards = cards.filter(character => {
    const matchesName = character.name.toLowerCase().includes(searchQuery);
    const matchesRarity = selectedRarity === "all" || character.rarity === selectedRarity;
    return matchesName && matchesRarity;
  });

  const total = cards.length;
  const unlocked = savedUser ? userCardsIds.length : total;
  document.getElementById("cardCount").textContent = `${unlocked}/${total}`;

  for (const character of filteredCards) {
    const isUnlocked = !savedUser || userCardsIds.includes(character.id);
    const lockedClass = isUnlocked ? '' : 'locked-card';
    const isFavorite = favoriteCardIds.includes(character.id);
    const favoriteIcon = isFavorite ? "❤️" : "🤍";

    const favoriteBtn = savedUser
      ? (isUnlocked
        ? `<button class="favorite-btn" data-id="${character.id}" onclick="toggleFavorite(event,${character.id})">${favoriteIcon}</button>`
        : `<span class="favorite-btn locked">🤍</span>`)
      : '';

    const card = `
      <div class="album-card">
        <div class="card card-${character.rarity} ${lockedClass}" onclick="openModal(this)">
          <div class="card-header">
            <span class="card-name">${character.name}</span>
            <span class="card-cost">⚡ ${character.cost}</span>
          </div>
          <img src="${character.image}" alt="${character.name}" class="${character.rarity}">
          <div class="card-stats">
            <div>🗡 ${character.attack}</div>
            <div>❤️ ${character.hp}</div>
          </div>
          <div class="card-description">
            ${character.description}
          </div>
          <div class="card-info"> 
            <div class="card-number">Nº ${character.id}</div>
            <div class="rarity-label ${character.rarity}">${character.rarity}</div>
          </div>
        </div>
        ${favoriteBtn}
      </div>
    `;
    container.innerHTML += card;
  }
}


let currentInitToken = null;

async function init() {
  const loadingModal = document.getElementById("loadingModal");
  const progressFill = document.querySelector(".progress-fill");
  const loadingMessage = document.getElementById("loadingMessage");
  const messages = [
    "Escaneando tu Dubdex... Cuidado con los parásitos de memoria.",
    "Buscando tus Dubs... en el espacio-tiempo cuántico.",
    "Rick está ordenando tus Dubs. No te emociones, Morty.",
    "Decodificando ADN de Dubs interdimensionales...",
    "Wubba Lubba Dub-Dex! Esto puede tardar un poquito...",
    "Comprobando si tienes una carta que valga la pena.",
    "Morty está clasificando tus Dubs... espera sentado.",
    "¡Multiverso inestable! Reiniciando catálogo de Dubs...",
    "Cargando tus Dubs... con un 3% de ciencia y un 97% de sarcasmo.",
    "Rick está mezclando tus Dubs con tequila... por eficiencia.",
    "¿Sabías que tus Dubs podrían estar vivas? Rick no lo niega.",
    "Recuperando Dubs perdidos en la dimensión de los calcetines.",
    "Analizando rarezas... sí, la mayoría son basura, Morty.",
    "¡Alerta de carta legendaria! ...es broma. Sigue esperando.",
    "Morty se metió en la Dubdex otra vez. Estamos limpiando el desastre.",
    "Accediendo a tus Dubs... con el permiso de la Federación Galáctica.",
    "Tus Dubs están encriptadas con ácido... descomponiéndolas ahora.",
    "Cuidado, hay un Meeseeks ayudando. Esto podría explotar.",
    "Escaneando tus stats... sí, siguen siendo mediocres.",
    "Invocando tu colección desde la dimensión Rickroll. Ups."
  ];
  const randomIndex = Math.floor(Math.random() * messages.length);
  loadingMessage.textContent = messages[randomIndex];

  const token = Symbol("init");
  currentInitToken = token;

  progressFill.style.animation = "none";
  progressFill.offsetHeight;

  loadingModal.style.display = "flex";
  const start = performance.now();

  try {
    const fetchCards = fetchAllCards();
    const encryptedUser = localStorage.getItem("user");
    let savedUser = null;
    if (encryptedUser) {
      const decryptedUserStr = CryptoJS.AES.decrypt(encryptedUser, 'wubbaduel').toString(CryptoJS.enc.Utf8);
      if (decryptedUserStr) savedUser = JSON.parse(decryptedUserStr);
    }

    const fetchUserCards = savedUser ? fetchUnlockedCards() : Promise.resolve([]);
    const fetchFavorites = savedUser ? fetchFavoriteCardIds() : Promise.resolve([]);

    cards = await fetchCards;
    userCards = await fetchUserCards;
    favoriteCardIds = await fetchFavorites;

    const duration = performance.now() - start;
    const minDuration = 1500;
    const waitTime = Math.max(minDuration, duration);

    progressFill.style.animation = `loadingProgress ${waitTime}ms linear forwards`;

    setTimeout(() => {
      if (currentInitToken !== token) return;
      loadingModal.style.display = "none";
      generateCards();
    }, waitTime);
  } catch (error) {
    console.error("Error al cargar las cartas:", error);
    loadingModal.style.display = "none";
  }
}

init();
document.getElementById("searchInput").addEventListener("input", generateCards);
document.getElementById("rarityFilter").addEventListener("change", generateCards);

