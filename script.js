'use strict';
/*
Jonas Schmedtmann Problem-Solving structure :
1). Understanding The problem:
    a). At the start of the game, player 1 is active
    it has an indication, the bg is lighter
    b). If i press roll dice a random dice pic 1-6 will
    show in the center of the screen.
    c). My current score will also increase based on that dice
    number.
    d). If my current score is 4, and the dice i got next
    is 6, that means my total score is 10
    e). If i keep rolling and encounter dice no.1, my current score
    is reset to `0` and the player change.

    // Hold
    d). If i keep rolling the dice and choose to hold the current
    score, that current score will be added to the total score
    and the players will be switched.

    // New game
    e). When i click new game, both players total score, current score
    will be reset, and player 1 will be active

    // Winning the game
    f). The first player who reaches the total score of >=100 wins the game

2). Divide & conquer:
    a). When i press roll dice, the picture of the dice in the middle of the screen
    changes based on the random dice number i got.
    b). When i click new game, the picture dissapear and will reapear when i roll dice.
*/

// Problem Solving + Diagram Chart is good

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
let totalScore0Element = document.getElementById('score--0');
let totalScore1Element = document.getElementById('score--1');
let currentScore0El = document.getElementById('current--0');
let currentScore1El = document.getElementById('current--1');
const showModal = document.querySelector('.player-winner-modal');
const overlay = document.querySelector('.congratulations-overlay');

const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');

// Starting conditions
totalScore0Element.textContent = 0;
totalScore1Element.textContent = 0;
diceElement.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const showModalWindow = () => {
  showModal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

showModal.classList.add('hidden');
overlay.classList.add('hidden');

const init = () => {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  totalScore0Element.textContent = 0;
  totalScore1Element.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  playing = true;
  activePlayer = 0;
  currentScore = 0;
  scores = [0, 0];
};

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
// Rolling dice functionality
btnRoll.addEventListener('click', () => {
  // What we need to do :

  if (playing) {
    // 1. Generating a random dice roll
    let randomDice = Math.trunc(Math.random() * 6 + 1);

    // 2. Display dice
    diceElement.classList.remove('hidden');
    diceElement.src = `Pictures/dice-${randomDice}.png`;
    console.log(randomDice);

    // 3. Check for rolled 1: If true,
    if (randomDice !== 1) {
      // Add dice number to current score
      currentScore += randomDice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// Hold dice functionality
btnHold.addEventListener('click', () => {
  if (playing) {
    //  1. Add current score to activate player's score
    scores[activePlayer] += currentScore;
    // Scores[1] += currentScore ->It's like saying this

    let activePlayerScore = (document.getElementById(
      `score--${activePlayer}`
    ).textContent = scores[activePlayer]);

    if (activePlayerScore >= 100) {
      playing = false;
      diceElement.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      showModalWindow();
      // Congratulations message
      document.querySelector(
        '.player-winner-modal-congratulate'
      ).textContent = `Congratulations, Player ${
        activePlayer + 1
      } win the game`;
    } else {
      switchPlayer();
    }
  }
});

// New game functionality
btnNew.addEventListener('click', init);

// Show & Hidden modal
document.querySelector('.btn--closeModal').addEventListener('click', () => {
  showModal.classList.add('hidden');
  overlay.classList.add('hidden');
});

// Play again BTN-MODAL
document.querySelector('.btn--playAgain').addEventListener('click', () => {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  totalScore0Element.textContent = 0;
  totalScore1Element.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  playing = true;
  activePlayer = 0;
  currentScore = 0;
  scores[0] = 0;
  scores[1] = 0;
  showModal.classList.add('hidden');
  overlay.classList.add('hidden');
});
