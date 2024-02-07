INSERT INTO department (name)
VALUES  ('IT'),
        ('Human Resources'),
        ('Finance'),
        ('Marketing');
        

INSERT INTO role (title, salary, department_id)
VALUES  ('IT Manager', 180000, 1),
        ('Developer', 100000, 1),
        ('HR Director', 100000, 2),
        ('HR Generalist', 75000, 2),
        ('Accounting Manager', 120000, 3),
        ('Accountant', 80000, 3),
        ('Marketing Manager', 100000, 4),
        ('Graphic Designer', 80000, 4);



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Sally', 'Johnson', 1, null),
        ('Joe', 'London', 2, 1),    
        ('Henry', 'Miller', 3, null),
        ('Mary', 'Jones', 4, 2),
        ('Margaret', 'Samuels', 5, null),
        ('Mitch', 'Lawson', 6, 3),
        ('Francine', 'Styles', 7, null),
        ('Kris', 'McEnroe', 8, 4);









