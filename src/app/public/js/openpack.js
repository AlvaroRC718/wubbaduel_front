"use strict";
document.addEventListener('DOMContentLoaded', async () => {

    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (!savedUser) {
        window.location.href = '/login';
        return;
    }
    const packImages = {
        normal: "resources/img/sobre3.png",
        rare: "resources/img/sobre1.png",
        epic: "resources/img/sobre2.png",
        legendary: "resources/img/sobre4.png"
    };

    const rarity = 'epic';
    /*const packInfo = JSON.parse(localStorage.getItem('packInfo'));
    if (!packInfo || !packInfo.rarity || !packInfo.canOpen) {
        alert('No puedes abrir este sobre.');
        window.location.href = '/shop';
        return;
    }
    const rarity = packInfo.rarity;
    localStorage.removeItem('packInfo');*/

    try {
        /*
        const response = await fetch('http://localhost:8080/api/openpack', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ rarity })
        });

        if (!response.ok) {
            throw new Error('No se pudo obtener las cartas.');
        }

        const cards = await response.json();
        */
        const cards = [
            {
                "id": 1,
                "name": "Rick Sanchez",
                "description": "Un científico genio con una actitud imprudente y una fuerte adicción al alcohol.",
                "cost": 5,
                "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
                "attack": 8,
                "health": 6,
                "rarity": "legendary",
                "species": "Human",
                "gender": "Male",
                "age": 70,
                "origin": "Earth (C-137)"
            },
            {
                "id": 2,
                "name": "Morty Smith",
                "description": "El nieto ansioso e impresionable de Rick que lo acompaña en sus aventuras.",
                "cost": 3,
                "image": "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
                "attack": 4,
                "health": 4,
                "rarity": "rare",
                "species": "Human",
                "gender": "Male",
                "age": 14,
                "origin": "Earth (C-137)"
            },
            {
                "id": 3,
                "name": "Summer Smith",
                "description": "La hermana mayor de Morty. Inteligente, atrevida y a veces sorprendentemente útil.",
                "cost": 3,
                "image": "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
                "attack": 3,
                "health": 5,
                "rarity": "rare",
                "species": "Human",
                "gender": "Female",
                "age": 17,
                "origin": "Earth (Replacement Dimension)"
            },
            {
                "id": 4,
                "name": "Beth Smith",
                "description": "La hija de Rick, una brillante cirujana de caballos con problemas de autoestima.",
                "cost": 4,
                "image": "https://rickandmortyapi.com/api/character/avatar/4.jpeg",
                "attack": 4,
                "health": 6,
                "rarity": "rare",
                "species": "Human",
                "gender": "Female",
                "age": 34,
                "origin": "Earth (Replacement Dimension)"
            },
            {
                "id": 5,
                "name": "Jerry Smith",
                "description": "El inseguro esposo de Beth, blanco frecuente de burlas, pero sorprendentemente perseverante.",
                "cost": 2,
                "image": "https://rickandmortyapi.com/api/character/avatar/5.jpeg",
                "attack": 2,
                "health": 5,
                "rarity": "normal",
                "species": "Human",
                "gender": "Male",
                "age": 35,
                "origin": "Earth (Replacement Dimension)"
            },
            {
                "id": 6,
                "name": "Abadango Cluster Princess",
                "description": "La princesa del cúmulo Abadango, una figura de autoridad en su planeta natal.",
                "cost": 4,
                "image": "https://rickandmortyapi.com/api/character/avatar/6.jpeg",
                "attack": 5,
                "health": 5,
                "rarity": "epic",
                "species": "Alien",
                "gender": "Female",
                "age": 28,
                "origin": "Abadango"
            },
        ]

        const pack = document.getElementById("pack");
        const container = document.getElementById("cards-container-pack");

        // Función para obtener la rareza máxima
        function getMaxRarity(cards) {
            let maxRarity = 'normal';
            cards.forEach(card => {
                if (card.rarity === 'legendary') {
                    maxRarity = 'legendary';
                } else if (card.rarity === 'epic' && maxRarity !== 'legendary') {
                    maxRarity = 'epic';
                } else if (card.rarity === 'rare' && maxRarity === 'normal') {
                    maxRarity = 'rare';
                }
            });
            return maxRarity;
        }

        const maxRarity = getMaxRarity(cards);
        pack.src = packImages[rarity];

        // Función para definir el color del confeti
        function getConfettiColor(rarity) {
            const colors = {
                normal: "#c5c5c5",
                rare: "#4287f5",
                epic: "#9b59b6",
                legendary: "#f39c12"
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
                            <div>❤️ ${c.health}</div>
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