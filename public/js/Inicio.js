document.addEventListener("DOMContentLoaded", () => {
    const btnJugarAhora = document.getElementById('btnJugarAhora');
    const formulario = document.getElementById('formulario');
    const btnJugar = document.getElementById('btnJugar');
    const inputNombre = document.getElementById('nombre');
    const customAlertOverlay = document.getElementById('customAlertOverlay');
    const customAlertMessage = document.getElementById('customAlertMessage');
    const customAlertClose = document.getElementById('customAlertClose');

    // Función para mostrar la alerta personalizada
    function showAlert(message) {
        customAlertMessage.textContent = message;
        customAlertOverlay.classList.add('visible');
    }

    // Cierra la alerta al hacer clic en el botón OK
    customAlertClose.addEventListener('click', () => {
        customAlertOverlay.classList.remove('visible');
    });

    // Muestra el formulario para ingresar nombre
    btnJugarAhora.addEventListener('click', () => {
        formulario.classList.remove('hidden');
        formulario.classList.add('flex');
        btnJugarAhora.classList.add('hidden');
    });

    // Valida el nombre antes de continuar al juego
    btnJugar.addEventListener('click', () => {
        const nombre = inputNombre.value.trim();
        if (nombre) {
            // Redirige con nombre en la URL
            window.location.href = `${window.origin}/Juego-de-memoria/Juego.html`;
        } else {
            showAlert('Por favor, ingresa tu nombre antes de jugar.');
        }
    });
});
