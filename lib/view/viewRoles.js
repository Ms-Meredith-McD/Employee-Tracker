// job title, role id, the department that role belongs to, and the salary for that role

const mainMenu = require('../mainMenu.js');
const db = require("../../config/connect.js");

function viewRoles(mainMenuFunction) {
    const query = "SELECT role.id AS 'ROLE ID', role.title AS ROLE, role.salary AS SALARY, department.name AS DEPARTMENT FROM company_db.role role JOIN company_db.department department ON role.department_id = department.id";

    db.query(query, (error, results) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log("List of Roles:");

        console.table(results);

        // Call the mainMenuFunction
        mainMenuFunction();
    })};

module.exports = viewRoles