import { createIcons, icons } from 'lucide';
import './style.scss';

createIcons({ icons });

const STATUS = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
};

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;
let isGameFinished = false;

const messageEl = document.querySelector('.feedback-card__text');
const scoreEl = document.querySelector('.js-score');
const highscoreEl = document.querySelector('.js-highscore');
const inputEl = document.querySelector('.play-card__input');
const btnCheck = document.querySelector('.js-check-btn');
const btnAgain = document.querySelector('.js-again-btn');

const modalEl = document.querySelector('.modal');
const modalTitleEl = document.querySelector('.modal__title');
const modalMessageEl = document.querySelector('.modal__message');
const modalOverlayEl = document.querySelector('.modal__overlay');
const modalClose = document.querySelector('.js-modal-close');
const modalBtnAgain = document.querySelector('.js-modal-again-btn');

const setStatus = (type) => {
  messageEl.classList.remove(STATUS.WARNING, STATUS.ERROR, STATUS.SUCCESS);

  if (type) {
    messageEl.classList.add(type);
  }
};

const displayMessage = function (message) {
  messageEl.textContent = message;
};

const openModal = function (title, text) {
  modalEl.classList.remove('hidden');
  modalTitleEl.textContent = title;
  modalMessageEl.textContent = text;
};

const closeModal = function () {
  modalEl.classList.add('hidden');
};

inputEl.addEventListener('input', () => {
  const value = Number(inputEl.value);
  if (value > 20) {
    inputEl.value = 20;
  }
  if (value < 1) {
    inputEl.value = 1;
  }
});

btnCheck.addEventListener('click', function () {
  const getNumber = Number(inputEl.value);

  if (isGameFinished) {
    openModal('Game Finished', 'The game has ended.');
    modalBtnAgain.textContent= 'Play Again'
    return;
  }

  if (!getNumber) {
    openModal('Empty Number !', 'Please enter a number between 1 and 20.');
    modalBtnAgain.textContent= 'OK'
    return;
  }

  if (getNumber === secretNumber) {
    displayMessage('Correct Number !');
    isGameFinished = true;
    setStatus(STATUS.SUCCESS);

    if (score > highscore) {
      highscore = score;
      highscoreEl.textContent = highscore;
    }
  } else {
    if (score > 1) {
      displayMessage(getNumber > secretNumber ? 'Too High !' : 'Too Low !');
      setStatus(getNumber > secretNumber ? STATUS.WARNING : STATUS.ERROR);
      score--;
      scoreEl.textContent = score;
    } else {
      openModal('Game Over', 'You lost the Game !');
      modalBtnAgain.textContent= 'Play Again'
      setStatus(STATUS.ERROR);
      scoreEl.textContent = 0;
    }
  }
});

const handleButtonAgain = function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  isGameFinished = false;

  inputEl.value = '';

  scoreEl.textContent = score;
  highscoreEl.textContent = highscore;

  setStatus(null);
  displayMessage('Start guessing...');
};

btnAgain.addEventListener('click', function () {
  handleButtonAgain();
});

const closeElements = [modalClose, modalOverlayEl];

closeElements.forEach((el) => {
  el.addEventListener('click', closeModal);
});

modalBtnAgain.addEventListener('click', function () {
  handleButtonAgain();
  closeModal();
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalEl.classList.contains('hidden')) {
    closeModal();
  }
});


