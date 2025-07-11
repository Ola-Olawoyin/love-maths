document.addEventListener('DOMContentLoaded', function () {
  let buttons = document.getElementsByTagName('button');

  for (let button of buttons) {
    button.addEventListener('click', function () {
      if (this.getAttribute('data-type') === 'submit') {
        checkAnswer();
      } else {
        let gameType = this.getAttribute('data-type');
        runGame(gameType);
      }
    });
  }
  runGame('addition');
  runGame('multiply');
  runGame('subtract');
  runGame('division');
});

/**
 * The main game 'loop', called when the script is first loaded
 * and after the user's answer has been processed
 */

function runGame(gameType) {
  //Create two random numbers between 1 and 25
  let num1 = Math.floor(Math.random() * 100) + 1;
  let num2 = Math.floor(Math.random() * 100) + 1;

  if (gameType === 'addition') {
    displayAdditionQuestion(num1, num2);
  } else if (gameType === 'multiply') {
    displayMultiplyQuestion(num1, num2);
  } else if (gameType === 'subtract') {
    displaySubtractQuestion(num1, num2);
  } else if (gameType === 'division') {
    displayDivisionQuestion(num1, num2);
  } else {
    alert(`Unknown game type: ${gameType}`);
    throw `Unknown game type: ${gameType}. Aborting!`;
  }
}
/**
 * Checks the answer against the first element  in the
 * returned calculateCorrectAnswer array
 */
function checkAnswer() {
  let userAnswer = parseInt(document.getElementById('answer-box').value);
  let calculatedAnswer = calculateCorrectAnswer();
  let isCorrect = userAnswer === calculatedAnswer[0];

  if (isCorrect) {
    alert('Hey! You got it right! 😉');
    incrementScrore();
  } else {
    alert(
      `Nice try, but ${userAnswer} is not the right answer. The right answer is: ${calculatedAnswer[0]}!`
    );
    incrementWrongAnswer();
  }
  runGame(calculatedAnswer[1]);
}
/**
 * Gets the operands (the numbers) and the operator(plus, minus etc)
 * directly from the dom, and returns the correct answer.
 */
function calculateCorrectAnswer() {
  let operand1 = parseInt(document.getElementById('operand1').innerText);
  let operand2 = parseInt(document.getElementById('operand2').innerText);
  let operator = document.getElementById('operator').innerText;

  if (operator === '+') {
    return [operand1 + operand2, 'addition'];
  } else if (operator === 'X') {
    return [operand1 * operand2, 'multiply'];
  } else if (operator === '-') {
  } else {
    alert(`Unimplemented operator ${operator}`);
    throw `Unimplemented operator ${operator}. Aborting! `;
  }
}
/**
 * Gets the current score from the DOM and increment it by 1
 */
function incrementScrore() {
  let oldScore = parseInt(document.getElementById('score').innerText);
  document.getElementById('score').innerText = ++oldScore;
}
/**
 * Gets the current tally of incorrect score from the DOM and increment it by 1
 */
function incrementWrongAnswer() {
  let oldScore = parseInt(document.getElementById('incorrect').innerText);
  document.getElementById('incorrect').innerText = ++oldScore;
}

function displayAdditionQuestion(operand1, operand2) {
  document.getElementById('operand1').textContent = operand1;
  document.getElementById('operand2').textContent = operand2;
  document.getElementById('operator').textContent = '+';
}

function displaySubtractQuestion(operand1, operand2) {
  document.getElementById('operand1').textContent =
    operand1 > operand2 ? operand1 : operand2;
  document.getElementById('operand2').textContent =
    operand1 > operand2 ? operand2 : operand1;
  document.getElementById('operator').textContent = '-';
}

function displayMultiplyQuestion(operand1, operand2) {
  document.getElementById('operand1').textContent = operand1;
  document.getElementById('operand2').textContent = operand2;
  document.getElementById('operator').textContent = 'X';
}

function displayDivisionQuestion(operand1, operand2) {
  document.getElementById('operand1').textContent =
    operand1 % operand2 === 0 ? operand1 : operand2;
  document.getElementById('operand2').textContent =
    operand1 % operand2 === 0 ? operand2 : operand1;
  document.getElementById('operator').textContent = '/';
}
