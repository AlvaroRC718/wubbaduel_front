"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const socialUser = JSON.parse(sessionStorage.getItem('socialUser'));

    if (!socialUser) {
        window.location.href = '/social';
        return;
    }

    // Mostrar los datos del usuario
    document.getElementById('username').textContent = socialUser.username;
    document.getElementById('emailprofile').textContent = socialUser.email;
    document.getElementById('userTokensCount').textContent = socialUser.tokens || 0;
    document.getElementById('userAvatar').src = socialUser.avatar || 'resources/img/default-avatar.jpeg';
    const createdDate = socialUser.createdDate;
    const dateOnly = createdDate ? createdDate.split('T')[0] : '2025';

    document.getElementById('memberSince').textContent = dateOnly;

    // Función para crear el HTML de cada carta
    function createCardHTML(character) {
        return `
        <div class="album-card">
          <div class="card card-${character.rarity}" onclick="openModal(this)">
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
        </div>`;
    }

    // Función para cargar las cartas favoritas
    async function loadFavoriteCards() {
        const container = document.getElementById('favoriteCardsContainer');
        const favoritesSection = document.querySelector('.favorite-cards');

        container.innerHTML = '';

        const favoriteCards = await fetchFavoriteCards();
        console.log(favoriteCards);

        if (favoriteCards.length > 0) {
            favoritesSection.style.display = 'block';
            favoriteCards.forEach(favWrapper => {
                container.insertAdjacentHTML('beforeend', createCardHTML(favWrapper.card));
            });
        } else {
            favoritesSection.style.display = 'none'; // Ocultar si no hay favoritas
            document.querySelector('footer').classList.add('fixed-footer');
        }
    }

    async function fetchFavoriteCards() {
        try {
            const socialUser = JSON.parse(sessionStorage.getItem('socialUser'));
            if (!socialUser || !socialUser.id) return [];

            const response = await fetch('http://localhost:8080/api/decks/favorites', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: socialUser.id }),
            });

            if (response.ok) {
                const cards = await response.json();
                return cards;
            } else {
                console.error("Error al obtener las cartas favoritas", response.status);
                return [];
            }
        } catch (error) {
            console.error("Error en la solicitud de cartas favoritas", error);
            return [];
        }
    }

    loadFavoriteCards();
});