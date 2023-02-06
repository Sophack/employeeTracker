DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;


CREATE TABLE department (
    -- setting the id and name columns
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
  
);

CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
-- rows will hold null values so it can be changed/updated without adding to the field
    title VARCHAR(100) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
  CONSTRAINT fk_department 
  FOREIGN KEY (department_id) 
  REFERENCES department(id) 
  ON DELETE CASCADE 
); 

CREATE TABLE employee ( 
    -- employees with auto incrementing ids 
    id INT AUTO_INCREMENT PRIMARY KEY, 
    first_name VARCHAR(100) NOT NULL, 
    last_name VARCHAR(100) NOT NULL, 
    role_id INT,
  manager_id INT,
  -- utilize the primary key 
  CONSTRAINT fk_role
  FOREIGN KEY (role_id) 
  REFERENCES role(id) 
  ON DELETE CASCADE,
  CONSTRAINT fk_manager  
  FOREIGN KEY (manager_id) 
  REFERENCES employee(id) 
  -- once its deleted it will be set to NULL
  ON DELETE SET NULL
);


