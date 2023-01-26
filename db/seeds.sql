-- values for the department table 
 
INSERT INTO department (dept) VALUES ('engineering'); 
INSERT INTO department (dept) VALUES ('finance'); 
INSERT INTO department (dept) VALUES ('legal');
INSERT INTO department (dept) VALUES ('training');

-- values for the role table 
INSERT INTO department (title, salary, dept_id) VALUES ('IT', 90000, 1);
INSERT INTO department (title, salary, dept_id) VALUES ('Engineer', 80000, 2);
INSERT INTO department (title, salary, dept_id) VALUES ('Accountant', 70000, 3);
INSERT INTO department (title, salary, dept_id) VALUES ('Intern', 60000, 4); 


-- values for the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jim", "Halpert", 1, null); 

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Dwight", "Scrute", 1, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Michael", "Scott", 2, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Phyllis", "Lapin-Vance", 3, null);
