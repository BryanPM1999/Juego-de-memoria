const totalCards = 12;
let cards = [];
let selectedCards = [];
let currentMove = 0;
let maxAttempts = 7;
let Pares_coincididos = 0;

function generateValues() {
    const values = [];
    for (let i = 0; i < totalCards / 2; i++) {
        values.push(i, i);
    }
    return values.sort(() => Math.random() - 0.5);
}

function updateStats() {
    document.querySelector('#stats').textContent = `Intentos restantes: ${maxAttempts}`;
}

function disableGame() {
    cards.forEach(c => c.removeEventListener('click', activate));
}

function showAlert(message) {
    alert(message); // Puedes reemplazar esto con un modal o mensaje personalizado si deseas
}

function activate(e) {
    const card = e.currentTarget;
    if (card.classList.contains('active') || selectedCards.includes(card) || currentMove >= 2 || maxAttempts <= 0) return;

    card.classList.add('active');
    selectedCards.push(card);
    currentMove++;

    if (currentMove === 2) {
        const [card1, card2] = selectedCards;
        const val1 = card1.querySelector('.face').textContent;
        const val2 = card2.querySelector('.face').textContent;

        if (val1 === val2) {
            Pares_coincididos++;
            selectedCards = [];
            currentMove = 0;

            if (Pares_coincididos === totalCards / 2) {
                showAlert('¡Felicidades! Has ganado.');
                disableGame();
            }
        } else {
            maxAttempts--;
            updateStats();
            setTimeout(() => {
                card1.classList.remove('active');
                card2.classList.remove('active');
                selectedCards = [];
                currentMove = 0;
                if (maxAttempts === 0) {
                    showAlert('¡Juego terminado! Has agotado tus intentos.');
                    disableGame();
                }
            }, 700);
        }
    }
}

// Inicializar juego
const game = document.querySelector('#game');
const values = generateValues();

for (let i = 0; i < totalCards; i++) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="back"></div>
        <div class="face">${values[i]}</div>
    `;
    card.addEventListener('click', activate);
    game.appendChild(card);
    cards.push(card);
}

updateStats();
