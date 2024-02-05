// Packages needed for the application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown.js')


// User choices

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

// when application starts present questions and possibly a line that says "Employee Management System"


// write a GET function to show all departments
// no tables to join

// write a GET function to show all roles
// job title, role id, department, salary
// join with department table, foreign key is department ID

// write a GET function to show all employees
// first name, last name, job title, department, salary, manager
// join with role table and department table, foreign keys are department ID and role ID

// write a POST function to add a department
// prompt for dept name

// write a POST function to add a role
// prompt for role name, salary, department

// write a POST function to add an employee
// prompt for first name, last name, role, and manager

// write a PUT function to update an employee role
// prompt to select an employee and update their new role
// get the employee database, select employee by ID, (type in new role or select?)
