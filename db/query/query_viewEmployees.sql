USE company_db;
SELECT
    employee.id AS 'EMPLOYEE ID',
    employee.first_name AS 'FIRST NAME',
    employee.last_name AS 'LAST NAME',
    -- if/then
    CASE 
        WHEN role.title IS NULL THEN '**NEEDS UPDATING**'
        ELSE role.title 
    END AS TITLE,
    CASE 
        WHEN role.salary IS NULL THEN '**NEEDS UPDATING**'
        ELSE role.salary 
    END AS SALARY,
    CASE 
        WHEN department.name IS NULL THEN '**NO DEPARTMENT**'
        ELSE department.name 
    END AS DEPARTMENT,
    CASE
        -- null -- display **MANAGER**
        WHEN employee.manager_id IS NULL THEN '<NONE>'
        -- update when manager is null
        WHEN manager.id IS NULL THEN '**NEEDS UPDATING**'
        --  concat together manager's first name and last name 
        ELSE CONCAT(manager.first_name, ' ', manager.last_name)
    END AS SUPERVISOR
FROM
    employee
LEFT JOIN
    role ON employee.role_id = role.id
LEFT JOIN
    department ON role.department_id = department.id
-- LEFT JOIN  merging with NULL values
LEFT JOIN
    --the manager of the employee is where the employees manager_id matches the id of the manager
    employee manager ON employee.manager_id = manager.id;
