// employee ids, first names, last names, job titles, departments, salaries, and managers
const mainMenu = require('../mainMenu.js');
const db = require("../../config/connect.js");

function viewEmployees(mainMenuFunction) {

    const query = "SELECT employee.id AS 'EMPLOYEE ID', employee.first_name AS 'FIRST NAME', employee.last_name AS 'LAST NAME', CASE WHEN role.title IS NULL THEN '**NEEDS UPDATING**' ELSE role.title END AS TITLE, CASE WHEN role.salary IS NULL THEN '**NO ROLE NEEDS UPDATING**' ELSE role.salary END AS SALARY,CASE WHEN department.name IS NULL THEN '**NEEDS UPDATING**' ELSE department.name END AS DEPARTMENT,CASE WHEN employee.manager_id IS NULL THEN '<IS A MANAGER>' WHEN manager.id IS NULL THEN '**NEEDS UPDATING**' ELSE CONCAT(manager.first_name, ' ', manager.last_name) END AS SUPERVISOR FROM  employee LEFT JOIN  role ON employee.role_id = role.id LEFT JOIN  department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id;"
    
    db.query(query, (error, results) => {
        if (error) {
            console.error(error);
            return;
        }

        // Log the results to the console
        console.log("List of Employees:");

        console.table(results);

        // Call the mainMenuFunction
        mainMenuFunction();
    })};


module.exports = viewEmployees