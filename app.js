const elements = {
    wordElement: document.getElementById('word'),
    wrongLettersElement: document.getElementById('wrong-letters'),
    playAgainBtn: document.getElementById('play-btn'),
    popupElement: document.getElementById('popup-container'),
    notification: document.getElementById('notification-container'),
    finalMessage: document.getElementById('final-message'),
    figureParts: document.querySelectorAll('.figure-part')
}

const words = ['application', 'programming', 'interface', 'wizard'];
const correctLetters = [];
const wrongLetters = [];

let selectedWord = words[Math.floor(Math.random() * words.length)];

console.log(selectedWord);

// Show the hidden word
const displayWord = () => {
    elements.wordElement.innerHTML = `
    ${selectedWord
      .split('')
      .map(
        letter => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
          </span>
        `
      )
      .join('')}
  `;

    const innerWord = elements.wordElement.innerText.replace(/\n/g, '');

    if (innerWord === selectedWord) {
        elements.finalMessage.innerText = 'Congratulations! You won! 😃';
        elements.popupElement.style.display = 'flex';
    }
};

// Update wrong letters
const updateWrongLettersEl = () => {
    // Display wrong letters

    elements.wrongLettersElement.innerHTML =
        `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    elements.figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    // Check if lost

    if (wrongLetters.length === elements.figureParts.length) {
        elements.finalMessage.innerText = 'You lost 😢';
        elements.popupElement.style.display = 'flex';
    }
};

const showNotification = () => {
    elements.notification.classList.add('show');
    setTimeout(() => {
        elements.notification.classList.remove('show');
    }, 2000);
};

// Restart game
const playAgain = () => {
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLettersEl();

    elements.popupElement.style.display = 'none';
};
// Keydown letter

window.addEventListener('keydown', e => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;
        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                showNotification();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLettersEl();
            } else {
                showNotification();
            }
        }
    }
});

elements.playAgainBtn.addEventListener('click', playAgain);

displayWord();