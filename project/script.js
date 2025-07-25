const quoteDisplay = document.getElementById('quote-display');
const quoteInput = document.getElementById('quote-input');
const timerElement = document.getElementById('timer');
const wpmElement = document.getElementById('wpm');
const restartBtn = document.getElementById('restart-btn');

const quotes = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing speed is measured in words per minute.",
  "Practice daily to improve your accuracy.",
  "JavaScript makes interactive web pages.",
  "Learning to code is a valuable skill."
];

let startTime;
let timerInterval;

function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function renderQuote(quote) {
  quoteDisplay.innerHTML = '';
  quote.split('').forEach(char => {
    const span = document.createElement('span');
    span.innerText = char;
    quoteDisplay.appendChild(span);
  });
  quoteInput.value = '';
}

function startTimer() {
  timerElement.innerText = '0';
  startTime = new Date();
  timerInterval = setInterval(() => {
    const time = Math.floor((new Date() - startTime) / 1000);
    timerElement.innerText = time;
  }, 1000);
}

function calculateWPM() {
  const words = quoteInput.value.trim().split(/\s+/).length;
  const minutes = (parseInt(timerElement.innerText) || 1) / 60;
  return Math.round(words / minutes);
}

quoteInput.addEventListener('input', () => {
  const arrayQuote = quoteDisplay.querySelectorAll('span');
  const arrayValue = quoteInput.value.split('');
  let correct = true;

  arrayQuote.forEach((charSpan, index) => {
    const char = arrayValue[index];
    if (char == null) {
      charSpan.classList.remove('correct', 'incorrect');
      correct = false;
    } else if (char === charSpan.innerText) {
      charSpan.classList.add('correct');
      charSpan.classList.remove('incorrect');
    } else {
      charSpan.classList.add('incorrect');
      charSpan.classList.remove('correct');
      correct = false;
    }
  });

  if (correct && arrayValue.length === arrayQuote.length) {
    clearInterval(timerInterval);
    const wpm = calculateWPM();
    wpmElement.innerText = wpm;
  }
});

function initTest() {
  const quote = getRandomQuote();
  renderQuote(quote);
  clearInterval(timerInterval);
  startTimer();
  timerElement.innerText = '0';
  wpmElement.innerText = '0';
}

restartBtn.addEventListener('click', initTest);

// Start on load
initTest();
