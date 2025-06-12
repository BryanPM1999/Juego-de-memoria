
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