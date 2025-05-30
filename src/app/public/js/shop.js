"use strict";
document.querySelectorAll('.play-button').forEach(button => {
    button.addEventListener('click', async () => {
        const rarity = button.getAttribute('data-pack');
        const packCosts = {
            NORMAL: 100,
            RARE: 250,
            EPIC: 500,
            LEGENDARY: 1000
        };
        const cost = packCosts[rarity];

        try {
            // Desencriptar el usuario desde localStorage con clave 'wubbaduel'
            const encryptedUser = localStorage.getItem('user');
            if (!encryptedUser) {
                window.location.href = "/login";
                return;
            }

            const bytes = CryptoJS.AES.decrypt(encryptedUser, 'wubbaduel');
            const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
            const savedUser = JSON.parse(decryptedData);

            if (!savedUser) {
                window.location.href = "/login";
                return;
            }

            const tokenResponse = await fetch('http://localhost:8080/api/user/get-tokens', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: savedUser.id })
            });

            if (!tokenResponse.ok) {
                alert("Error al consultar tus tickets. Intenta de nuevo.");
                return;
            }

            const { tokens } = await tokenResponse.json();

            if (tokens >= cost) {
                localStorage.setItem('packInfo', JSON.stringify({
                    rarity: rarity,
                    canOpen: true
                }));

                const response = await fetch("http://localhost:8080/api/user/tokens", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId: savedUser.id, tokens: -cost }),
                });
                const data = await response.json();

                if (response.ok) {
                    // Actualizar los tokens del usuario y volver a encriptar
                    savedUser.tokens = data.tokens;
                    const updatedUserEncrypted = CryptoJS.AES.encrypt(JSON.stringify(savedUser), 'wubbaduel').toString();
                    localStorage.setItem('user', updatedUserEncrypted);

                    window.location.href = '/openpack';
                } else {
                    alert("Error al restar los tickets. Intenta de nuevo.");
                    return;
                }

            } else {
                alert("No tienes suficientes tickets para este sobre.");
            }

        } catch (error) {
            console.error("Error al validar la compra del sobre:", error);
            alert("Hubo un problema. Inténtalo más tarde.");
        }
    });
});

const PACK_PROBABILITIES = {
    NORMAL: {
        NORMAL: 0.85,
        RARE: 0.13,
        EPIC: 0.015,
        LEGENDARY: 0.005,
    },
    RARE: {
        NORMAL: 0.50,
        RARE: 0.40,
        EPIC: 0.08,
        LEGENDARY: 0.02,
    },
    EPIC: {
        NORMAL: 0.20,
        RARE: 0.40,
        EPIC: 0.30,
        LEGENDARY: 0.10,
    },
    LEGENDARY: {
        NORMAL: 0.05,
        RARE: 0.15,
        EPIC: 0.50,
        LEGENDARY: 0.30,
    }
};

function openRatiosModal(packType) {
    const ratios = PACK_PROBABILITIES[packType];
    const modal = document.getElementById("ratiosModal");
    const list = document.getElementById("ratiosList");
    const title = document.getElementById("modalTitle");

    title.textContent = `Ratios de aparición`;
    list.innerHTML = '';

    Object.entries(ratios).forEach(([rarity, probability]) => {
        const li = document.createElement('li');

        const img = document.createElement('img');
        img.src = `resources/img/${rarity.toLowerCase()}.png`;
        img.alt = `${rarity} card`;
        img.classList.add('rarity-icon');

        const text = document.createTextNode(`${rarity}: ${(probability * 100).toFixed(1)}%`);

        li.appendChild(img);
        li.appendChild(text);
        list.appendChild(li);
    });

    modal.style.display = "flex";
}

function closeRatiosModal() {
    document.getElementById("ratiosModal").style.display = "none";
}

document.querySelectorAll('.ratios-button').forEach(button => {
    button.addEventListener('click', () => {
        const packType = button.getAttribute('data-pack');
        openRatiosModal(packType);
    });
});

window.addEventListener('click', function (event) {
    const modal = document.getElementById("ratiosModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
});
