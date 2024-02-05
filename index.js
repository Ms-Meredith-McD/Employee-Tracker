// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown.js')


// TODO: Create an array of questions for user input

const data = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'choices',
        choices: [
        'View All Departments', 
        'Add A Department',
        'View All Roles', 
        'Add A Role',
        'View All Employees',
        'Add An Employee',
        'Update An Employee Role'
    ]
    }
]



// write a GET function to show all departments

// write a GET function to show all roles
// job title, role id, department, salary

// write a GET function to show all employees
// first name, last name, job title, department, salary, manager

// write a POST function to add a department
// prompt for dept name

// write a POST function to add a role
// prompt for role name, salary, department

// write a POST function to add an employee
// prompt for first name, last name, role, and manager

// write a PUT function to update an employee role
// prompt to select an employee and update their new role
