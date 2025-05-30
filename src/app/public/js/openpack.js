"use strict";
document.addEventListener('DOMContentLoaded', async () => {
    const loadingModal = document.getElementById("loadingModal");
    const loadingMessage = document.getElementById("loadingMessage");

    const messages = [
        "Morty, este sobre está más sellado que el Multiverso. Aguanta...",
        "Calculando probabilidades de que te salga una carta épica... 0.0002%",
        "Wubba Lubba Dub-Dub! Invocando cartas desde la dimensión C-137...",
        "Rick está sobornando al servidor para darte algo bueno.",
        "Esperando a que Morty le dé al botón correcto..."
    ];
    const randomIndex = Math.floor(Math.random() * messages.length);
    loadingMessage.textContent = messages[randomIndex];

    const progressFill = document.querySelector(".progress-fill");

    const showLoading = () => {
        loadingModal.style.display = "flex";
        progressFill.style.animation = "none"; // reiniciar
        progressFill.offsetHeight; // forzar reflow
        progressFill.style.animation = `loadingProgress 1500ms linear forwards`;
    };

    const hideLoading = () => {
        setTimeout(() => {
            loadingModal.style.display = "none";
        }, 1500);
    };

    showLoading(); // Mostrar al inicio

    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (!savedUser) {
        window.location.href = '/login';
        return;
    }

    const packImages = {
        NORMAL: "resources/img/sobre3.png",
        RARE: "resources/img/sobre1.png",
        EPIC: "resources/img/sobre2.png",
        LEGENDARY: "resources/img/sobre4.png"
    };

    const packInfo = JSON.parse(localStorage.getItem('packInfo'));
    if (!packInfo || !packInfo.rarity || !packInfo.canOpen) {
        alert('No puedes abrir este sobre.');
        window.location.href = '/shop';
        return;
    }

    const rarity = packInfo.rarity;
    localStorage.removeItem('packInfo');

    const pack = document.getElementById("pack");
    pack.src = packImages[rarity];

    const preloadImg = new Image();
    preloadImg.src = packImages[rarity];

    try {
        const start = performance.now();

        const response = await fetch('http://localhost:8080/api/user-cards/open-pack', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: savedUser.id, rarity })
        });

        if (!response.ok) throw new Error('No se pudo obtener las cartas.');

        const cards = await response.json();

        const duration = performance.now() - start;
        const waitTime = Math.max(1500, duration);
        setTimeout(() => {
            hideLoading(); // Ocultar después de esperar mínimo
        }, waitTime);

        const container = document.getElementById("cards-container-pack");

        function getMaxRarity(cards) {
            let maxRarity = 'NORMAL';
            cards.forEach(card => {
                if (card.rarity === 'LEGENDARY') maxRarity = 'LEGENDARY';
                else if (card.rarity === 'EPIC' && maxRarity !== 'LEGENDARY') maxRarity = 'EPIC';
                else if (card.rarity === 'RARE' && maxRarity === 'NORMAL') maxRarity = 'RARE';
            });
            return maxRarity;
        }

        const maxRarity = getMaxRarity(cards);

        function getConfettiColor(rarity) {
            const colors = {
                NORMAL: "#c5c5c5",
                RARE: "#4287f5",
                EPIC: "#9b59b6",
                LEGENDARY: "#f39c12"
            };
            return colors[rarity] || "#c5c5c5";
        }

        // Permitir clic en el sobre para abrir cartas

        let clicked = false;

        pack.addEventListener("click", () => {
            if (clicked) return;
            clicked = true;
            pack.classList.add("opened");

            setTimeout(() => {
                pack.remove();

                const confettiColor = getConfettiColor(maxRarity);
                confetti({
                    particleCount: 200,
                    spread: 120,
                    colors: [confettiColor]
                });

                container.classList.add("visible");

                cards.forEach((c, i) => {
                    const div = document.createElement("div");
                    div.style.animationDelay = `${i * 0.5}s`;
                    div.innerHTML = `
                        <div class="card card-${c.rarity}" style="animation-delay: ${i * 0.5}s;" onclick="openModal(this)">
                          <div class="card-header">
                            <span class="card-name">${c.name}</span>
                            <span class="card-cost">⚡ ${c.cost}</span>
                          </div>
                          <img src="${c.image}" alt="${c.name}" class="${c.rarity}">
                          <div class="card-stats">
                            <div>🗡 ${c.attack}</div>
                            <div>❤️ ${c.hp}</div>
                          </div>
                          <div class="card-description">
                            ${c.description}
                          </div>
                          <div class="card-info"> 
                            <div class="card-number">Nº ${c.id}</div>
                            <div class="rarity-label ${c.rarity}">${c.rarity}</div>
                          </div>
                        </div>
                    `;
                    container.appendChild(div);
                });
            }, 1000);
        });

    } catch (error) {
        console.error("Error al obtener las cartas:", error);
        alert("Hubo un problema al abrir el sobre. Inténtalo más tarde.");
        hideLoading();
    }
});
