let cards = [];
let userCards = [];

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
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (!savedUser || !savedUser.id) {
      console.error('Usuario no encontrado en localStorage');
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
  const savedUser = JSON.parse(localStorage.getItem('user'));
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
      </div>
    `;
    container.innerHTML += card;
  }
}


let currentInitToken = null;

async function init() {
  const loadingModal = document.getElementById("loadingModal");
  const progressFill = document.querySelector(".progress-fill");

  const token = Symbol("init");
  currentInitToken = token;

  progressFill.style.animation = "none";
  progressFill.offsetHeight;

  loadingModal.style.display = "flex";
  const start = performance.now();

  try {
    const fetchCards = fetchAllCards();
    const savedUser = JSON.parse(localStorage.getItem("user"));
    const fetchUserCards = savedUser ? fetchUnlockedCards() : Promise.resolve([]);

    cards = await fetchCards;
    userCards = await fetchUserCards;

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