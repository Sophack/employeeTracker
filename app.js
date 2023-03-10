// import

const inquirer = require('inquirer');
const fs = require("fs");
const mysql = require('mysql2');
require('console.table');
// require('dotenv').config();

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    database: 'employee_db',
    password: 'password',
})

connection.connect( (err) => {
    if (err) throw err; 

   promptMenu();
  });

const promptMenu = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: [
            'view all departments', 
            'view all roles', 
            'view all employees', 
            'add a department',
            'add a role',
            'add an employee', 
            'delete a department',
            'delete an employee',
            'update an employee role', 
            'exit']
        }])

//once the user has selected the prompt, execute the corresponding functions: 

        .then(userChoice => {
            switch (userChoice.menu) {
                case 'view all departments':
                    selectDepartments();
                    break;
                case 'view all roles':
                    selectRoles();
                    break;
                case 'view all employees':
                    selectEmployees();
                    break;
                case 'add a department':
                    promptAddDepartment();
                    break;
                case 'add a role':
                    promptAddRole();
                    break;
                case 'add an employee':
                    promptAddEmployee();
                    break;
                case 'delete a department':
                    deleteDepartment();
                    break;  
                case 'delete an employee':
                    deleteEmployee();
                    break;
                case 'update an employee role':
                    updateEmployeeRole();
                    break;

            //exit option
                default:
                    process.exit();
            }
        });
};



const selectDepartments = () => {
    connection.query(
        'SELECT * FROM department;',
        (err, results) => {
            console.table(results); 
            promptMenu();
        });
};

const selectRoles = () => {
    connection.query(
        'SELECT * FROM role;',
        (err, results) => {
            console.table(results); 
            promptMenu();
        }
    )
};

const selectEmployees = () => {
    connection.query(
        "SELECT E.id, E.first_name, E.last_name, R.title, D.name AS department, R.salary, CONCAT(M.first_name,' ',M.last_name) AS manager FROM employee E JOIN role R ON E.role_id = R.id JOIN department D ON R.department_id = D.id LEFT JOIN employee M ON E.manager_id = M.id;",
        (err, results) => {
            console.table(results); 
            promptMenu();
        }
    )
};

const promptAddDepartment = () => {
    inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: 'Name the department you would like to add?',
        validate: departmentName => {
            if (departmentName) {
                return true;
            } else {
                console.log('Please enter the name of your department!');
                return false;
            }
        }
    }
    ])
        .then(name => {
            connection.promise().query("INSERT INTO department SET?", name);
            selectDepartments();
        })
}


const promptAddRole = () => {

    return connection.promise().query(
        "SELECT department.id, department.name FROM department;"
    )
        .then(([departments]) => {
            let departmentChoices = departments.map(({
                id,
                name
            }) => ({
                name: name,
                value: id
            }));

            inquirer.prompt(
                [{
                    type: 'input',
                    name: 'title',
                    message: 'Enter the name of your title (Required)',
                    validate: titleName => {
                        if (titleName) {
                            return true;
                        } else {
                            console.log('Please enter your title name!');
                            return false;
                        }
                    }
                },
                {
                    type: 'list',
                    name: 'department',
                    message: 'Which department are you from?',
                    choices: departmentChoices
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Enter your salary (Required)',
                    validate: salary => {
                        if (salary) {
                            return true;
                        } else {
                            console.log('Please enter your salary!');
                            return false;
                        }
                    }
                }
                ]
            )
                .then(({ title, department, salary }) => {
                    const query = connection.query(
                        'INSERT INTO role SET ?',
                        {
                            title: title,
                            department_id: department,
                            salary: salary
                        },
                        function (err, res) {
                            if (err) throw err;
                        }
                    )
                }).then(() => selectRoles())

        })
}

const promptAddEmployee = (roles) => {

    return connection.promise().query(
        "SELECT R.id, R.title FROM role R;"
    )
        .then(([employees]) => {
            let titleChoices = employees.map(({
                id,
                title

            }) => ({
                value: id,
                name: title
            }))

            connection.promise().query(
                "SELECT E.id, CONCAT(E.first_name,' ',E.last_name) AS manager FROM employee E;"
            ).then(([managers]) => {
                let managerChoices = managers.map(({
                    id,
                    manager
                }) => ({
                    value: id,
                    name: manager
                }));

                inquirer.prompt(
                    [{
                        type: 'input',
                        name: 'firstName',
                        message: 'What is the employees first name (Required)',
                        validate: firstName => {
                            if (firstName) {
                                return true;
                            } else {
                                console.log('Please enter the employees first name!');
                                return false;
                            }
                        }
                    },
                    {
                        type: 'input',
                        name: 'lastName',
                        message: 'What is the employees last name (Required)',
                        validate: lastName => {
                            if (lastName) {
                                return true;
                            } else {
                                console.log('Please enter the employees last name!');
                                return false;
                            }
                        }
                    },
                    {
                        type: 'list',
                        name: 'role',
                        message: 'What is the employees role?',
                        choices: titleChoices
                    },
                    {
                        type: 'list',
                        name: 'manager',
                        message: 'Who is the employees manager?',
                        choices: managerChoices
                    }

                    ])
                    .then(({ firstName, lastName, role, manager }) => {
                        const query = connection.query(
                            'INSERT INTO employee SET ?',
                            {
                                first_name: firstName,
                                last_name: lastName,
                                role_id: role,
                                manager_id: manager
                            },
                            function (err, res) {
                                if (err) throw err;
                                console.log({ role, manager })
                            }
                        )
                    })
                    .then(() => selectEmployees())
            })
        })
}
  // Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
 function findAllEmployees() {
    return connection.promise().query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }
function findAllRoles() {
    return connection.promise().query(
      "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
    );
  }

function updateEmployeeRole0(employeeId, roleId) {
    return connection.promise().query(
      "UPDATE employee SET role_id = ? WHERE id = ?",
      [roleId, employeeId]
    );
  }

function updateEmployeeRole() {
    findAllEmployees()
      .then(([rows]) => {
        let employees = rows;
        const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
          name: `${first_name} ${last_name}`,
          value: id
        }));
  
        inquirer.prompt([
          {
            type: "list",
            name: "employeeId",
            message: "Which employee's role do you want to update?",
            choices: employeeChoices
          }
        ])
          .then(res => {
            let employeeId = res.employeeId;
            findAllRoles()
              .then(([rows]) => {
                let roles = rows;
                const roleChoices = roles.map(({ id, title }) => ({
                  name: title,
                  value: id
                }));
  
                inquirer.prompt([
                  {
                    type: "list",
                    name: "roleId",
                    message: "Which role do you want to assign the selected employee?",
                    choices: roleChoices
                  }
                ])
                  .then(res => updateEmployeeRole0(employeeId, res.roleId))
                  .then(() => console.log("Updated employee's role"))
                  .then(() => promptMenu())
              });
          });
      })
  }


// BONUS FEATURES 
//using Mysql so we need to establish connection 

function removeEmployee(employeeId) {
    return connection.promise().query(
        "DELETE FROM employee WHERE id = ?",
        employeeId
      );
    }

//this is a local function so no need mysql connection 

function deleteEmployee() {
    findAllEmployees()
      .then(([rows]) => {
        let employees = rows;
        const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
          name: `${first_name} ${last_name}`,
          value: id
        }));
  
        inquirer.prompt([
          {
            type: "list",
            name: "employeeId",
            message: "which employee do you want to remove?",
            choices: employeeChoices
          }
        ])
        //local function so no need to add connection
          .then(res => removeEmployee(res.employeeId))
          .then(() => console.log("employee deleted"))
          .then(() => promptMenu())
      })
  }



  // Remove a department
function removeDepartment(departmentId) {
    return connection.promise().query(
      "DELETE FROM department WHERE id = ?",
      departmentId
    );
  }

    // Find all departments
function findAllDepartments() {
        return connection.promise().query(
          "SELECT department.id, department.name FROM department;"
        );
      }

  // Delete a department
function deleteDepartment() {
    findAllDepartments()
      .then(([rows]) => {
        let departments = rows;
        const departmentChoices = departments.map(({ id, name }) => ({
          name: name,
          value: id
        }));
  
        inquirer.prompt({
          type: "list",
          name: "departmentId",
          message:
            "Which department would you like to remove? (Warning: This will also remove associated roles and employees)",
          choices: departmentChoices
        })
          .then(res => removeDepartment(res.departmentId))
          .then(() => console.log(`department deleted`))
          .then(() => promptMenu())
      })
  }