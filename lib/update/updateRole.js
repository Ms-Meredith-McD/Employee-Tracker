// select an employee to update and their new role and this information is updated in the database 

const mainMenu = require('../mainMenu.js');
const inquirer = require('inquirer');
const db = require("../../config/connect.js");

function updateEmployeeRole(mainMenuFunction) {
    // Get the list of all employees
    const employeesQuery = "SELECT id, CONCAT(first_name, ' ', last_name) AS employee_name FROM company_db.employee";
    db.query(employeesQuery, (error, employeeResults) => {
        if (error) {
            console.error("Error getting employees:", error);
            return;
        }

        //Pull data out of array and prep for use in inquirer
        const employeeChoices = employeeResults.map(employee => ({ value: employee.id, name: employee.employee_name }));

        // Get the list of all roles
        const rolesQuery = "SELECT id, title FROM company_db.role";
        db.query(rolesQuery, (error, roleResults) => {
            if (error) {
                console.error("Error getting roles:", error);
                return;
            }

            //Pull data out of array and prep for use in inquirer
            const roleChoices = roleResults.map(role => ({ value: role.id, name: role.title }));

            // Prompt the user to select an employee and a new role
            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'employeeId',
                        message: 'Please select the employee to update:',
                        choices: employeeChoices,
                    },
                    {
                        type: 'list',
                        name: 'newRoleId',
                        message: 'Please select the new role for the employee:',
                        choices: roleChoices,
                    },
                ])
                .then(answers => {
                    const { employeeId, newRoleId } = answers;

                    // Update the employee's role in the database
                    const updateQuery = "UPDATE company_db.employee SET role_id = ? WHERE id = ?";
                    db.query(updateQuery, [newRoleId, employeeId], (error, updateResults) => {
                        if (error) {
                            console.error("Error updating employee role", error);
                            return;
                        }

                        console.log("Employee's role has been updated successfully!");

                        // Call the mainMenuFunction
                        mainMenuFunction();
                    });
                });
        });
    });
}

module.exports = updateEmployeeRole