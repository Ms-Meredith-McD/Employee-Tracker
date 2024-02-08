const inquirer = require('inquirer');
const viewEmployees = require('./view/viewEmployees.js');
const viewDepartments = require('./view/viewDepartments.js');
const viewRoles = require('./view/viewRoles.js');
const addEmployee = require('./add/addEmployee.js');
const addDepartment = require('./add/addDepartment.js');
const addRole = require('./add/addRole.js');
const updateRole = require('./update/updateRole.js');


function mainMenu() {
    inquirer
    .prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "userSelection",
            choices: [
                { name:'View All Employees' , value: "viewEmployees" }, 
                { name:'View All Departments' , value: "viewDepartments" },
                { name:'View All Roles' , value: "viewRoles" },
                { name:'Add Employee' , value: "addEmployee" },
                { name:'Add Department' , value: "addDepartment" },
                { name:'Add Role' , value: "addRole" },
                { name:'Update Employee Role' , value: "updateRole" },
                { name:'EXIT APPLICATION' , value: "exit" },
            ],
        },
    ])
    .then((answer) => {
        if (answer.userSelection  === "viewEmployees") {
            viewEmployees(mainMenu);
        } else if (answer.userSelection  === "viewDepartments") {
            viewDepartments(mainMenu);
        } else if (answer.userSelection  === "viewRoles") {
            viewRoles(mainMenu);
        } else if (answer.userSelection  === "addEmployee") {
            addEmployee(mainMenu);
        } else if (answer.userSelection  === "addDepartment") {
            addDepartment(mainMenu);
        } else if (answer.userSelection  === "addRole") {
            addRole(mainMenu);
        } else if (answer.userSelection  === "updateRole") {
            updateRole(mainMenu);
        } else {
            console.log("Bye!");
            process.exit();
        }
    });
}


module.exports = mainMenu