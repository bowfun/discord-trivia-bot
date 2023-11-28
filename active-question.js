/* eslint-disable indent */
const fs = require('fs');

let runningQuestionID = 0;
let maxAnswers = 0;
let totalAnswers = 0;

// When a /start-trivia command is used.
function startQuiz(quizID) {
    runningQuestionID = quizID;
}

// Successful answer on a quiz!
function quizAnswered(userID) {
    totalAnswers = totalAnswers + 1;
    if (maxAnswers === totalAnswers) {
        endQuiz();
    }
    const jsonData = JSON.stringify(userData, null, 2);
    // Write to the file
    fs.writeFileSync('data.json', jsonData);
    console.debug('Data has been written to data.json');
}

// This clears the quiz and prepares for another.
function endQuiz() {
    runningQuestionID = 0;
    totalAnswers = 0;
    maxAnswers = 0;
}

// This returns the running question, simple :)
function getRunningID() {
    return runningQuestionID;
}

module.exports = getRunningID;
