'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelector('.btn--new');

let scores, current, activePlayer, playing;
//Starting conditions
const init = function () {
  scores = [0, 0];
  current = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  current = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//--------------------------------------------------------------------------//
//Roll Dice
rollDiceBtn.addEventListener('click', function () {
  if (playing) {
    let randDice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `./img/dice-${randDice}.png`;
    if (randDice !== 1) {
      current += randDice;
      document.getElementById(`current--${activePlayer}`).textContent = current;
    } else {
      switchPlayer();
    }
  }
});

//Hold score
holdBtn.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's scores
    scores[activePlayer] += current;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score to active player's score
    if (scores[activePlayer] >= 100) {
      //Finish the Game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

//Reset New Game
newGameBtn.addEventListener('click', init);
