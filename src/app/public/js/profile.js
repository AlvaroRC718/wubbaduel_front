"use strict";
document.addEventListener('DOMContentLoaded', () => {
    // Desencriptar el usuario desde localStorage
    const encrypted = localStorage.getItem('user');
    const savedUser = encrypted ? JSON.parse(
        CryptoJS.AES.decrypt(encrypted, 'wubbaduel').toString(CryptoJS.enc.Utf8)
    ) : null;

    if (!savedUser) {
        window.location.href = '/login';
        return;
    }

    // Mostrar los datos del usuario
    document.getElementById('username').textContent = savedUser.username;
    document.getElementById('emailprofile').textContent = savedUser.email;
    document.getElementById('userTokensCount').textContent = savedUser.tokens || 0;
    document.getElementById('userAvatar').src = savedUser.avatarUrl || 'resources/img/default-avatar.png';
    document.getElementById('tokensCount').textContent = savedUser.tokens || 0;

    // Cerrar sesión
    document.getElementById('logoutButton').addEventListener('click', () => {
        localStorage.removeItem('user');
        window.location.href = '/login';
    });

    // Mostrar modal para eliminar cuenta
    document.getElementById('deleteAccountButton').addEventListener('click', () => {
        document.getElementById('passwordModal').style.display = 'block';
    });

    // Cancelar eliminación
    document.getElementById('cancelDelete').addEventListener('click', () => {
        document.getElementById('passwordModal').style.display = 'none';
        document.getElementById('passwordInput').value = '';
    });

    // Confirmar eliminación
    document.getElementById('confirmDelete').addEventListener('click', async () => {
        const password = document.getElementById('passwordInput').value;

        if (!password) {
            alert('Debes ingresar tu contraseña.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/delete-account', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: savedUser.email, password })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error del servidor:', errorText);
                alert('Error al eliminar la cuenta.');
                return;
            }

            alert('Cuenta eliminada exitosamente.');
            localStorage.removeItem('user');
            window.location.href = '/register';
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Hubo un problema al intentar eliminar la cuenta.');
        }

        document.getElementById('passwordModal').style.display = 'none';
    });

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
            const encrypted = localStorage.getItem("user");
            const savedUser = encrypted ? JSON.parse(
                CryptoJS.AES.decrypt(encrypted, 'wubbaduel').toString(CryptoJS.enc.Utf8)
            ) : null;
            if (!savedUser || !savedUser.id) return [];

            const response = await fetch('http://localhost:8080/api/decks/favorites', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: savedUser.id }),
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
