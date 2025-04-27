"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    
    if (savedUser) {
        // Mostrar los datos del usuario
        document.getElementById('username').textContent = savedUser.username;
        document.getElementById('emailprofile').textContent = savedUser.email;
        document.getElementById('userTokensCount').textContent = savedUser.tokens || 0;
        document.getElementById('userAvatar').src = savedUser.avatarUrl || 'resources/img/default-avatar.png';

        // Mostrar la información de tickets en el div fijo
        document.getElementById('tokensCount').textContent = savedUser.tokens || 0;  

        // Modificar el enlace de inicio de sesión para que apunte al perfil
        const loginLink = document.getElementById('login-link');
        loginLink.textContent = savedUser.username;
        loginLink.href = '/profile'; 
    } else {
        window.location.href = '/login';
    }
});
