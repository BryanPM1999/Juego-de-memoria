document.addEventListener("DOMContentLoaded", () => {
    const btnJugarAhora = document.getElementById('btnJugarAhora');
    const formulario = document.getElementById('formulario');
    const btnJugar = document.getElementById('btnJugar');
    const inputNombre = document.getElementById('nombre');

    // Mostrar el formulario al hacer clic en "Jugar Ahora"
    btnJugarAhora.addEventListener('click', () => {
        formulario.style.display = 'block';
        btnJugarAhora.style.display = 'none'; // Ocultar botón "Jugar Ahora"
    });

    // Redirigir a Juego.html con el nombre como parámetro
    btnJugar.addEventListener('click', () => {
        const nombre = inputNombre.value.trim();
        if (nombre) {
            window.location.href = `Juego.html?nombre=${encodeURIComponent(nombre)}`;
        } else {
            alert('Por favor, ingresa tu nombre antes de jugar.');
        }
    });
});
