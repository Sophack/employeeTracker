DROP DATABASE IF EXISTS employee_db; 

-- creating a database called employee_db; 

USE employee_db;
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

-- GETTING THE FOLLOWING ERROR
-- Running on a local VS Code session.
-- Starting embedded MySQL Shell, using config dir 'C:\Users\saraf\AppData\Roaming\MySQL\mysqlsh-gui' ...
-- Please enter the single instance token: 
-- 15:25:11.239992 INFO: Token read from STDIN

-- 15:25:11.279981 INFO: Starting MySQL Shell GUI web server...

-- 15:25:11.282980 INFO: 	Checking web server certificate...

-- 15:25:11.550975 INFO: 	Certificate is installed.

-- 15:25:11.630435 INFO: 	Port: 33336

-- 15:25:11.631627 INFO: 	Secure: True

-- 15:25:11.631998 INFO: 	Webroot: c:\Users\saraf\.vscode\extensions\oracle.mysql-shell-for-vs-code-1.6.2-win32-x64\shell\lib\mysqlsh\plugins\gui_plugin\core\webroot

-- 15:25:11.634015 INFO: 	Mode: Single user

-- Could not establish websocket connection: Unexpected server response: 400
