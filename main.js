const inquirer = require('inquirer');
const { askQuestions, processAnswers } = require('./prompts');
const { connection } = require('./dbConnection');

// Use inquirer to prompt user input
inquirer.prompt(askQuestions(process.argv[2]))
  .then((answers) => {
    return processAnswers(process.argv[2], connection, answers);
  })
  .then(() => {
    console.log('Operation completed successfully.');
    connection.end();
  })
  .catch((err) => {
    console.error(err);
    connection.end();
  });
