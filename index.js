// Packages needed for the application
const inquirer = require('inquirer');
const db = require("./config/connect")
const prompt = require('inquirer').createPromptModule();

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
    console.log('Welcome to the EMS "Employee Management System" MEM 2024')
    getChoice()
}

// inquirer function with *if* for all choices plus appropriate query then circle back to getChoice() again
async function getChoice() {
    const choiceName = await inquirer.prompt(info)
    if (choiceName.choices == 'View All Departments') {
        db.query("SELECT * FROM department", (err, data) => {
            console.table(data)
            getChoice()
        })
    }
    if (choiceName.choices == 'View All Roles') {
        db.query("SELECT * FROM role JOIN department on role.department_id = department.id", (err, data) => {
            console.table(data)
            getChoice()
        })
    }
    if (choiceName.choices == 'View All Employees') {
        db.query(`SELECT e.id, e.first_name, e.last_name, role.title, department.name as department, role.salary, CONCAT(m.first_name, ' ', m.last_name) as "manager" 
        FROM employee as e
        JOIN role ON e.role_id = role.id 
        JOIN department ON role.department_id = department.id
        LEFT JOIN employee as m
        ON m.id = e.manager_id`, (err, data) => {
            console.table(data)
            getChoice()
        })
    }
    if (choiceName.choices == 'Add A Department') {
        db.query('SELECT department.name FROM department', (err, departments) => {
        if (err) throw err;
    
          // Retrieve the existing departments
        const existingDepartments = departments.map((row) => row.name);
        console.log('Existing Departments:', existingDepartments);
    
          // Prompt the user to enter the name of the new department
        async function promptUser() {
            const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'newDepartmentName',
                message: 'Enter the name of the new department:',
            },
            ]);
    
            const newDepartmentName = answers.newDepartmentName;
            console.log(`${newDepartmentName} added`);
    
            // Insert the new department into the department table
            db.query('INSERT INTO department (name) VALUES (?)', [newDepartmentName], (err, result) => {
            if (err) throw err;
    
            console.log('New department added successfully!');
            getChoice();
            });
        }
    
        promptUser();
        });
    }
    if (choiceName.choices == 'Add A Role') {
        // need to prompt for title, salary, department_id/department name
        db.query("INSERT INTO role (title, salary, department_id) VALUES.......",
        (err, data) => {
                console.table(data)
                getChoice()
            })
    }
    if (choiceName.choices == 'Add An Employee') {
        // need to prompt for first name, last name, role, and manager
        db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES.......",
        (err, data) => {
                console.table(data)
                getChoice()
            })
    }
    if (choiceName.choices == 'Update An Employee Role') {
        // need to prompt for first name, last name, role
        // get employee database, select by ID, then update?
        db.query("UPDATE employee (first_name, last_name, role) VALUES.......",
        (err, data) => {
                console.table(data)
                getChoice()
            })
    }
}


init()
