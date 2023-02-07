USE employee_db; 

-- values for the department 

INSERT INTO department
    (name)
VALUES
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Sales');

-- values for the role table 

INSERT INTO role
    (title, salary, department_id) 
VALUES 
    ('Engineer', 120000, 1),
    ('Lead Engineer', 150000, 1),
    ('Lawyer', 190000, 2),
    ('Legal Team Lead', 250000, 2),
    ('Salesperson', 80000, 3),
    ('Sales Lead', 100000, 3),
    ('Accountant', 125000, 4),
    ('Account Manager', 160000, 4);
    


-- values for the employee table

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Karen', 'Filipelli', 1, NULL),
    ('Michael', 'Scott', 2, NULL),
    ('Pam', 'Beasly', 3, 2),
    ('Kevin', 'Malone', 1, 3),
    ('Kelly', 'Kapoor', 4, 3),
    ('Ryan', 'Howard', 6, 4),
    ('Jan', 'Levinson', 5, 6),
    ('Saraf', 'Nawar', 8, NULL);