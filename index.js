// Packages needed for the application
const inquirer = require('inquirer');
const fs = require('fs');
const db = require("./config/connect")

// User choices

const info = [
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


function init() {
    getChoice()
}

// write a GET function to show all departments
async function getChoice() {
    const choiceName = await inquirer.prompt(info)
    if (choiceName.choices == 'View All Departments'){
    db.query("SELECT * FROM department", (err, data) => {
        console.table(data)
        getChoice()
    })}  
}

// write a GET function to show all roles
// job title, role id, department, salary
// join with department table, foreign key is department ID
// SELECT * FROM role
// JOIN department on role.department_id = department.id

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
//GET the employee database, select employee by ID, (type in new role or select?)

init()
