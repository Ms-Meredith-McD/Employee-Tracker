// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown.js')


// TODO: Create an array of questions for user input

const data = [
    {
        type: 'input',
        message: 'What would you like to title your project?',
        name: 'title',
    },
    {
        type: 'input',
        message: 'Please describe your project.',
        name: 'description',
    },
    {
        type: 'input',
        message: 'Please share installation instructions.',
        name: 'install',
    },
    {
        type: 'input',
        message: 'Please share usage instructions.',
        name: 'usage',
    },
    {
        type: 'list',
        message: 'Which license would you like to use?',
        name: 'license',
        choices: ['MIT', 'Apache 2.0', 'Mozilla Public License 2.0']
    },
    {
        type: 'input',
        message: 'Please share instructions for contributors.',
        name: 'contributors',
    },
    {
        type: 'input',
        message: 'Please share test instructions.',
        name: 'test',
    },
    {
        type: 'input',
        message: 'What is your GitHub username?',
        name: 'github',
    },
    {
        type: 'input',
        message: 'What is your email address?',
        name: 'email',
    }
]



// TODO: Create a function to initialize app, so when someone types node "employees.js" to start it up, put something in there to get the first function to get it going
function init() {
    inquirer.prompt(data).then((answers) => {
        const markdown = generateMarkdown(answers);
        writeToFile('sample.md', markdown);
    });
}
// Function call to initialize app (this is done)
init();