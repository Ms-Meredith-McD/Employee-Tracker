INSERT INTO department (name)
VALUES  ('Finance'),
        ('IT'),
        ('Human Resources'),
        ('Executive Leadership');

INSERT INTO role (title, salary, department_id)
VALUES  ('Accountant', 80000, 1),
        ('Developer', 100000, 2),
        ('HR Director', 95000, 3),
        ('CTO', 200000, 4),
        ('CEO', 200000, 4),
        ('CFO', 200000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Sally', 'Johnson', 4, null),
        ('Henry', 'Miller', 5, null),
        ('Margaret', 'Samuels', 6, null);



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Joe', 'London', 2, 1),     
        ('Mary', 'Jones', 3, 2),
        ('Mitch', 'Lawson', 2, 4);