const inquirer = require('inquirer');
const { askQuestions, processAnswers } = require('./prompts');
const { connection } = require('./dbConnection');

// Listen for SIGINT signal and handle it gracefully
process.on('SIGINT', () => {
  console.log('Received SIGINT signal, exiting gracefully...');
  connection.end();
  process.exit(0);
});

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
    process.exit(1); // Exit with error code 1
  });