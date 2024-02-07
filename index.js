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
        db.query('SELECT department.id, department.name FROM department', (err, departments) => {
            if (err) throw err;
    
          // Retrieve the existing departments
            const existingDepartments = departments.map((row) => row.name);
            
    
          // Prompt the user to enter the details of the new role
            async function promptUser() {
            const answers = await inquirer.prompt([
                {
                type: 'input',
                name: 'newRoleTitle',
                message: 'Enter the title of the new role:',
                },
                {
                type: 'input',
                name: 'newRoleSalary',
                message: 'Enter the salary for the new role:',
            },
            {
                type: 'list',
                name: 'newRoleDepartment',
                message: 'Select the department for the new role:',
                choices: existingDepartments,
            },
            ]);
    
            const newRoleTitle = answers.newRoleTitle;
            const newRoleSalary = answers.newRoleSalary;
            const newRoleDepartment = answers.newRoleDepartment;
    
            console.log(`${newRoleTitle} added`);
    
            // Get the department ID for the selected department
            const departmentId = departments.find((row) => row.name === newRoleDepartment).id;
    
            // Insert the new role into the role table
            db.query(
            'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
            [newRoleTitle, newRoleSalary, departmentId],
            (err, result) => {
                if (err) throw err;
    
                console.log('New role added successfully!');
                getChoice();
            }
            );
        }
    
        promptUser();
        });
    }
    if (choiceName.choices == 'Add An Employee') {
        db.query('SELECT role.id, role.title FROM role', (err, roles) => {
        if (err) throw err;
    
          // Retrieve the existing roles
        const existingRoles = roles.map((row) => row.title);
        console.log('Existing Roles:', existingRoles);
    
          // Prompt the user to enter the details of the new employee
        async function promptUser() {
            const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'newEmployeeFirstName',
                message: 'Enter the first name of the new employee:',
            },
            {
                type: 'input',
                name: 'newEmployeeLastName',
                message: 'Enter the last name of the new employee:',
            },
            {
                type: 'list',
                name: 'newEmployeeRole',
                message: 'Select the role for the new employee:',
                choices: existingRoles,
            },
            {
                type: 'input',
                name: 'newEmployeeManagerId',
                message: 'Enter the manager ID for the new employee (leave blank if none):',
            },
            ]);
    
            const newEmployeeFirstName = answers.newEmployeeFirstName;
            const newEmployeeLastName = answers.newEmployeeLastName;
            const newEmployeeRole = answers.newEmployeeRole;
            const newEmployeeManagerId = answers.newEmployeeManagerId || null;
    
            console.log(`${newEmployeeFirstName} ${newEmployeeLastName} added`);
    
            // Get the role ID for the selected role
            const role = roles.find((row) => row.title === newEmployeeRole);
            if (!role) {
            console.log('Invalid role selected');
            getChoice();
            return;
            }
            const roleId = role.id;
    
            // Insert the new employee into the employee table
            db.query(
            'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
            [newEmployeeFirstName, newEmployeeLastName, roleId, newEmployeeManagerId],
            (err, result) => {
                if (err) throw err;
    
                console.log('New employee added successfully!');
                getChoice();
            }
            );
}
    
        promptUser();
        });
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
