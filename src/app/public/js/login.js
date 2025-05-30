"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const encryptedUser = localStorage.getItem('user');
    if (encryptedUser) {
        try {
            const bytes = CryptoJS.AES.decrypt(encryptedUser, 'wubbaduel');
            const decryptedStr = bytes.toString(CryptoJS.enc.Utf8);
            if (decryptedStr) {
                const savedUser = JSON.parse(decryptedStr);
                if (savedUser) {
                    window.location.href = '/profile';
                    return;
                }
            }
        } catch (error) {
            console.error("Error al desencriptar el usuario:", error);
        }
    }

    const form = document.querySelector('.tarjeta-formulario');
    const errorGeneral = document.getElementById('errorGeneral');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Inicio de sesión exitoso:', data);

                const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), 'wubbaduel').toString();
                localStorage.setItem('user', encrypted);

                window.location.href = '/profile';
            } else {
                const error = await response.json();
                errorGeneral.textContent = error.message || 'Error al iniciar sesión.';
            }
        } catch (err) {
            console.error('Error de red:', err);
            errorGeneral.textContent = 'Contraseña o email incorrectos.';
        }
    });
});
