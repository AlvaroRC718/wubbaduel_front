"use strict";
document.addEventListener('DOMContentLoaded', async () => {

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

        const response = await fetch('http://localhost:8080/api/user-cards/open-pack', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: savedUser.id, rarity })
        });

        if (!response.ok) {
            throw new Error('No se pudo obtener las cartas.');
        }

        const cards = await response.json();
        const container = document.getElementById("cards-container-pack");

        // Función para obtener la RAREza máxima
        function getMaxRarity(cards) {
            let maxRarity = 'NORMAL';
            cards.forEach(card => {
                if (card.rarity === 'LEGENDARY') {
                    maxRarity = 'LEGENDARY';
                } else if (card.rarity === 'EPIC' && maxRarity !== 'LEGENDARY') {
                    maxRarity = 'EPIC';
                } else if (card.rarity === 'RARE' && maxRarity === 'NORMAL') {
                    maxRarity = 'RARE';
                }
            });
            return maxRarity;
        }

        const maxRarity = getMaxRarity(cards);
        // Función para definir el color del confeti
        function getConfettiColor(rarity) {
            const colors = {
                NORMAL: "#c5c5c5",
                RARE: "#4287f5",
                EPIC: "#9b59b6",
                LEGENDARY: "#f39c12"
            };
            return colors[rarity] || "#c5c5c5";
        }


        // Evento: abrir sobre
        pack.addEventListener("click", async () => {
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

            }, 1000); // Delay para animación
        });

    } catch (error) {
        console.error("Error al obtener las cartas:", error);
        alert("Hubo un problema al abrir el sobre. Inténtalo más tarde.");
    }
});