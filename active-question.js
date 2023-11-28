/* eslint-disable brace-style */
/* eslint-disable indent */
const fs = require('fs');

let runningQuestionID = 0;
let maxAnswers = 0;
let totalAnswers = 0;

// When a /start-trivia command is used.
const startQuiz = (quizID, maximumAnswers) => {
    runningQuestionID = quizID;
    maxAnswers = maximumAnswers;
};

// Function to update trivia questions for a user
const updateTriviaCount = (userId) => {
    // Read existing data from the file
    let userData;
    try {
        const data = fs.readFileSync('data.json', 'utf8');
        userData = JSON.parse(data);
    } catch (err) {
        // If the file doesn't exist or is empty, initialize userData as an empty array
        userData = [];
    }
    // Find the user in the existing data
    const userIndex = userData.findIndex(user => user.userId === userId);
    if (userIndex !== -1) {
        // User found, increment trivia count
        userData[userIndex].triviaQuestionsAnswered += 1;
    } else {
        // User not found, add a new entry with trivia count set to 1
        userData.push({ userId, triviaQuestionsAnswered: 1 });
    }
    // Convert the updated data to JSON format
    const jsonData = JSON.stringify(userData, null, 2);
    // Write the updated data back to the file
    fs.writeFileSync('data.json', jsonData);
    console.log(`Trivia count updated for ${userId}.`);
};

// Successful answer on a question!
const triviaAnswered = (userID) => {
    // Increment totalAnswers
    totalAnswers += 1;
    // If maxAnswers is reached, end it.
    if (maxAnswers === totalAnswers) {
        endQuiz();
    }
    // Update trivia count for the user
    updateTriviaCount(userID);
};

// This clears the quiz and prepares for another.
const endQuiz = () => {
    runningQuestionID = 0;
    totalAnswers = 0;
    maxAnswers = 0;
};

// This returns the running question, simple :)
const getRunningID = () => {
    return runningQuestionID;
};

module.exports = { getRunningID, triviaAnswered, endQuiz, startQuiz };
