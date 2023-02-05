DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;


CREATE TABLE department(
    -- setting the id and name columns
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

-- column will hold NOT NULL values so the field will always contain a value 
-- will prevent from inserting or updating a new record without adding value to the field 

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
-- rows will hold null values so it can be changed/updated without adding to the field
    title VARCHAR(100) NULL,
    salary DECIMAL NOT NULL,
    dept_id INT REFERENCES department.id, 
    PRIMARY KEY (id)
); 

CREATE TABLE employee ( 
    -- employees with auto incrementing ids 
    id NOT NULL AUTO_INCREMENT, 
    first_name VARCHAR(100) NULL, 
    last_name VARCHAR (100) NULL, 
    role_id INT REFERENCES role.id 
    manager_id INT,
    PRIMARY KEY (id)
);

-- need to add a foreign key?

