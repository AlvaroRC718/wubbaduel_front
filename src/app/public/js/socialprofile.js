"use strict";

document.addEventListener('DOMContentLoaded', () => {
    const socialUser = JSON.parse(sessionStorage.getItem('socialUser'));

    if (!socialUser) {
        window.location.href = '/social';
        return;
    }

    // Mostrar datos usuario
    document.getElementById('username').textContent = socialUser.username;
    document.getElementById('emailprofile').textContent = socialUser.email;
    document.getElementById('userTokensCount').textContent = socialUser.tokens || 0;
    document.getElementById('userAvatar').src = socialUser.avatar || 'resources/img/default-avatar.jpeg';
    const createdDate = socialUser.createdDate;
    const dateOnly = createdDate ? createdDate.split('T')[0] : '2025-01-01';
    document.getElementById('memberSince').textContent = dateOnly;

    // Precios por rareza
    const rarityPrices = {
        NORMAL: 1000,
        RARE: 2500,
        EPIC: 5000,
        LEGENDARY: 10000
    };

    let selectedCard = null;

    // Crear HTML de cada carta
    function createCardHTML(character) {
        const price = rarityPrices[character.rarity.toUpperCase()] || 0;

        // Intentar recuperar savedUser de localStorage
        const encryptedUser = localStorage.getItem('user');
        let showBuyButton = false;

        if (encryptedUser) {
            try {
                const bytes = CryptoJS.AES.decrypt(encryptedUser, 'wubbaduel');
                const savedUser = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                if (savedUser) showBuyButton = true;
            } catch (error) {
                console.warn("Error al desencriptar savedUser:", error);
            }
        }

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
      ${showBuyButton ? `
        <button class="play-button" onclick="openBuyModal(event, ${character.id}, '${character.name}', '${character.rarity}')">
          ${price} <img src="resources/img/ticket.webp" alt="ticket" />
        </button>` : ''}
    </div>`;
    }


    // Cargar favoritas
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
            favoritesSection.style.display = 'none';
            document.querySelector('footer').classList.add('fixed-footer');
        }
    }

    async function fetchFavoriteCards() {
        try {
            if (!socialUser || !socialUser.id) return [];
            const response = await fetch('http://localhost:8080/api/decks/favorites', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: socialUser.id }),
            });
            if (response.ok) {
                return await response.json();
            } else {
                console.error("Error al obtener favoritas", response.status);
                return [];
            }
        } catch (error) {
            console.error("Error en solicitud favoritas", error);
            return [];
        }
    }

    loadFavoriteCards();

    // --- MODAL COMPRA ---
    const buyCardModal = document.getElementById('buyCardModal');
    const buyCardText = document.getElementById('buyCardText');
    const confirmBuyBtn = document.getElementById('confirmBuyBtn');
    const closeBuyBtn = buyCardModal.querySelector('.daily-close');

    // Abrir modal de compra
    window.openBuyModal = function (event, cardId, name, rarity) {
        event.stopPropagation();
        selectedCard = { id: cardId, name, rarity };
        const price = rarityPrices[rarity.toUpperCase()] || 0;

        buyCardText.innerHTML = `
            ¿Seguro que quieres comprar la dub <strong class="${rarity}-text">"${name}"</strong> de rareza <strong class="${rarity}-text">${rarity}</strong> por <strong class="daily-submessage"> ${price}
            <img src="resources/img/ticket.webp" alt="ticket" style="vertical-align:middle; width:24px; height:auto;" /></strong> tickets?<br><br>
            No te preocupes, no le estás robando la carta a otro usuario, simplemente estás creando tu propia copia en esta dimensión.<br>
            <em>¡Wubba lubba dub-dub!</em>
        `;

        buyCardModal.style.display = 'flex';
    };

    // Cerrar modal compra con botón cerrar (x)
    closeBuyBtn.addEventListener('click', () => {
        selectedCard = null;
        buyCardModal.style.display = 'none';
    });

    // Cerrar modal compra al hacer click fuera del contenido
    buyCardModal.addEventListener('click', (e) => {
        if (e.target === buyCardModal) {
            selectedCard = null;
            buyCardModal.style.display = 'none';
        }
    });

    // Confirmar compra
    confirmBuyBtn.addEventListener('click', async () => {
        confirmBuyBtn.disabled = true;
        if (!selectedCard) return;

        const cost = rarityPrices[selectedCard.rarity.toUpperCase()];
        try {
            const encryptedUser = localStorage.getItem('user');
            if (!encryptedUser) return window.location.href = "/login";

            const bytes = CryptoJS.AES.decrypt(encryptedUser, 'wubbaduel');
            const savedUser = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

            // Verificar tokens
            const tokenRes = await fetch('http://localhost:8080/api/user/get-tokens', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: savedUser.id })
            });
            const { tokens } = await tokenRes.json();

            if (tokens < cost) {
                alert("No tienes suficientes tickets.");
                return;
            }

            // Descontar tokens
            const res = await fetch("http://localhost:8080/api/user/tokens", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: savedUser.id, tokens: -cost })
            });

            if (!res.ok) {
                alert("Error al procesar la compra.");
                return;
            }

            const { tokens: updatedTokens } = await res.json();
            savedUser.tokens = updatedTokens;

            // Actualizar tokens localStorage y UI
            const newEncrypted = CryptoJS.AES.encrypt(JSON.stringify(savedUser), 'wubbaduel').toString();
            localStorage.setItem('user', newEncrypted);
            document.getElementById('tokensCount').textContent = updatedTokens;

            // Añadir carta al inventario backend
            const addCardRes = await fetch("http://localhost:8080/api/user-cards/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: savedUser.id,
                    cardId: selectedCard.id,
                    quantity: 1
                })
            });

            if (addCardRes.ok) {
                alert("¡Carta comprada exitosamente y agregada a tu inventario!");

                await fetch("http://localhost:8080/api/user/tokens", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId: socialUser.id, tokens: 100 })
                });

                selectedCard = null;
                buyCardModal.style.display = 'none';
                window.location.href = "/cards";
            } else {
                alert("La compra fue exitosa pero no se pudo agregar la carta al inventario.");
            }

        } catch (error) {
            console.error("Error al comprar carta:", error);
            alert("Ocurrió un error.");
        }
    });

});
