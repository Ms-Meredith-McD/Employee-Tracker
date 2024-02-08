// prompted to enter the name of the department and that department is added to the database

const getChoices = require('../getChoices.js');
const inquirer = require('inquirer');
const db = require("../../config/connect.js");

function addDepartment(mainMenuFunction) {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'departmentName',
                message: 'Please enter the new department name:',
            },
        ])
        .then(answers => {
            const departmentName = answers.departmentName;

            // Insert the new department into the database
            const query = "INSERT INTO company_db.department (name) VALUES (?)";
            db.query(query, [departmentName], (error, results) => {
                if (error) {
                    console.error("Error getting department name:", error);
                    return;
                }

                console.log(`Department "${departmentName}" added successfully!`);

                // Call the mainMenuFunction
                mainMenuFunction();
            });
        });
}

module.exports = addDepartment