INSERT INTO department (name)
VALUES  ('Finance'),
        ('IT'),
        ('Human Resources'),
        ('Executive Leadership');

INSERT INTO role (title, salary, department_id)
VALUES  ('Accountant', 80000, 1),
        ('Developer', 100000, 2),
        ('HR Manager', 95000, 3),
        ('CFO', 200000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Sally', 'Johnson', 4, null),



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Joe', 'London', 2, 1),       