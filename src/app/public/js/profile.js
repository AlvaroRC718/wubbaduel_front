"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const savedUser = JSON.parse(localStorage.getItem('user'));

    if (!savedUser) {
        window.location.href = '/login';
        return;
    }

    // Mostrar los datos del usuario
    document.getElementById('username').textContent = savedUser.username;
    document.getElementById('emailprofile').textContent = savedUser.email;
    document.getElementById('userTokensCount').textContent = savedUser.tokens || 0;
    document.getElementById('userAvatar').src = savedUser.avatarUrl || 'resources/img/default-avatar.png';
    document.getElementById('tokensCount').textContent = savedUser.tokens || 0;

    const loginLink = document.getElementById('login-link');
    loginLink.textContent = savedUser.username;
    loginLink.href = '/profile';

    // Cerrar sesión
    document.getElementById('logoutButton').addEventListener('click', () => {
        localStorage.removeItem('user');
        window.location.href = '/login';
    });

    // Mostrar modal para eliminar cuenta
    document.getElementById('deleteAccountButton').addEventListener('click', () => {
        document.getElementById('passwordModal').style.display = 'block';
    });

    // Cancelar eliminación
    document.getElementById('cancelDelete').addEventListener('click', () => {
        document.getElementById('passwordModal').style.display = 'none';
        document.getElementById('passwordInput').value = '';
    });

    // Confirmar eliminación
    document.getElementById('confirmDelete').addEventListener('click', async () => {
        const password = document.getElementById('passwordInput').value;

        if (!password) {
            alert('Debes ingresar tu contraseña.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/delete-account', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: savedUser.email, password })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error del servidor:', errorText);
                alert('Error al eliminar la cuenta.');
                return;
            }

            alert('Cuenta eliminada exitosamente.');
            localStorage.removeItem('user');
            window.location.href = '/register';
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Hubo un problema al intentar eliminar la cuenta.');
        }

        document.getElementById('passwordModal').style.display = 'none';
    });
});


