"use strict";

document.addEventListener('DOMContentLoaded', () => {
    const section = document.getElementById('div-social-cards');

    const pageSize = 9;
    let currentPage = 0;
    let totalPages = 0;

    function fetchUsers(page = 0) {
        let savedUser = null;
        const encryptedUser = localStorage.getItem('user');
        if (encryptedUser) {
            try {
                const bytes = CryptoJS.AES.decrypt(encryptedUser, 'wubbaduel');
                const decrypted = bytes.toString(CryptoJS.enc.Utf8);
                savedUser = JSON.parse(decrypted);
            } catch (e) {
                console.error("Error al desencriptar el usuario:", e);
            }
        }

        const body = savedUser && savedUser.id
            ? { page, userId: savedUser.id }
            : { page };

        fetch('http://localhost:8080/api/user/list', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
            .then(res => {
                if (!res.ok) throw new Error('Error al obtener usuarios');
                return res.json();
            })
            .then(data => {
                const users = data.users || data;
                const totalUsers = data.totalUsers || 0;
                totalPages = Math.ceil(totalUsers / pageSize);
                section.innerHTML = "";

                users.forEach(user => {
                    const card = document.createElement('div');
                    card.className = 'social-card';
                    card.style.cursor = 'pointer';
                    card.innerHTML = `
                        <img src="${user.avatar || 'resources/img/default-avatar.png'}" alt="Avatar de ${user.username}" class="avatar">
                        <div class="social-info">
                            <h3>${user.username}</h3>
                            <p class="social-email">${user.email}</p>
                            <p class="social-tickets">${user.tokens}<img src="resources/img/ticket.webp" alt="ticket" /></p>
                        </div>
                    `;
                    card.addEventListener('click', () => {
                        sessionStorage.setItem('socialUser', JSON.stringify(user));
                        window.location.href = '/socialprofile';
                    });
                    section.appendChild(card);
                });

                renderPaginationButtons();
            })
            .catch(console.error);
    }

    function renderPaginationButtons() {
        const divButtons = document.getElementById('divButtons');
        divButtons.innerHTML = "";

        const prevBtn = document.createElement('button');
        prevBtn.textContent = 'Anterior';
        prevBtn.disabled = currentPage === 0;
        prevBtn.addEventListener('click', () => {
            if (currentPage > 0) {
                currentPage--;
                fetchUsers(currentPage);
            }
        });
        divButtons.appendChild(prevBtn);

        for (let i = 0; i < totalPages; i++) {
            const btn = document.createElement('button');
            btn.textContent = (i + 1).toString();
            if (i === currentPage) btn.disabled = true;
            btn.addEventListener('click', () => {
                currentPage = i;
                fetchUsers(currentPage);
            });
            divButtons.appendChild(btn);
        }

        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'Siguiente';
        nextBtn.disabled = currentPage === totalPages - 1;
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages - 1) {
                currentPage++;
                fetchUsers(currentPage);
            }
        });
        divButtons.appendChild(nextBtn);
    }

    fetchUsers(currentPage);
});
