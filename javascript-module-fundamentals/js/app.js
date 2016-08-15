import assignPlayerName from './player.js';
import { printGame, calculateScore, getProblemCount } from './game.js';

console.log('Built with webpack and babel loader');

// add click handler to the start game button
document.getElementById('startGame').addEventListener('click', function() {
  assignPlayerName(document.getElementById('playername').value);
  printGame();
});

// add click handler to the calculate score button
document.getElementById('calculate').addEventListener('click', function() {
  calculateScore();
});

// set the default number of problems
document.getElementById('problemCount').value = getProblemCount();
