"use strict";
document.addEventListener('DOMContentLoaded', () => {
    // Si existe un usuario, redirigir a /profile
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
        window.location.href = '/profile';
        return; 
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

                localStorage.setItem('user', JSON.stringify(data));
                window.location.href = '/profile';
            } else {
                const error = await response.json();
                errorGeneral.textContent = error.message || 'Error al iniciar sesión.';
            }
        } catch (err) {
            console.error('Error de red:', err);
            errorGeneral.textContent = 'No se pudo conectar con el servidor.';
        }
    });
});
