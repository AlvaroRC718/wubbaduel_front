"use strict";
document.querySelectorAll('.play-button').forEach(button => {
    button.addEventListener('click', async () => {
        const rarity = button.getAttribute('data-pack');
        const packCosts = {
            normal: 100,
            rare: 250,
            epic: 500,
            legendary: 1000
        };
        const cost = packCosts[rarity];

        try {
            const savedUser = JSON.parse(localStorage.getItem('user'));

            if (!savedUser) {
                window.location.href = "/login";
                return;
            }
            
            const tokenResponse = await fetch('http://localhost:8080/api/user/tokens', {
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

                if (!response.ok) {
                    alert("Error al restar los tickets. Intenta de nuevo.");
                    return;
                }

                window.location.href = '/openpack';
            } else {
                alert("No tienes suficientes tickets para este sobre.");
            }

        } catch (error) {
            console.error("Error al validar la compra del sobre:", error);
            alert("Hubo un problema. Inténtalo más tarde.");
        }
    });
});
