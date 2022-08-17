const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const util = require('util');
// const dotenv = require('dotenv');
// dotenv.config()

// const table = cTable.getTable([
//     {
//       name: 'foo',
//       age: 10
//     }, {
//       name: 'bar',
//       age: 20
//     }
//   ]);

//   console.log(table);


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'operation_viewer'
  });

const asyncQuery = util.promisify(connection.query).bind(connection)


function start(){
    inquirer
    .prompt([{
            type: 'list',
            name: 'userChoice',
            message: "What would like to do?",
            choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee","update an employee role", "quit application"]
        },
        
    ])

    .then(input => {
        console.log(input)
        if (input.userChoice === "view all departments"){
            queryDepartments()
        }
        else if (input.userChoice === "view all roles") {
            queryRoles()
        }
        else if (input.userChoice === "view all employees"){
            queryEmployees()
        }
        else if (input.userChoice === "add a department") {
            addDepartment()
        }
        else if (input.userChoice === "add a role"){
            addRoles()
        }
        else if (input.userChoice === "add an employee") {
            addEmployee()
        }
        else if (input.userChoice === "update an employee role"){
        editEmployee()
        }
        else {
            console.log("goodbye");
            return 
        }
    })
}
function addDepartment(){
    inquirer
    .prompt([{
            type: 'input',
            name: 'departmentName',
            message: "What is the department name?"
        },
        
    ])

    .then(input => {
        console.log(input)
        insertDepartment(input.departmentName)
        
    })
}
// id: 'roleName',
//             title: 'What role do they work in?',
//             salary: 'What is the salary?' ,
//             department_id: 'What department do you they work in' ,
//end of department, beginning of roles
function addRoles(){


inquirer
    .prompt([{
            type: 'input',
            name: "title",
            message: "What role do they work in?",
        },
        {
            type: 'input',
            name: "salary",
            message: "What is the salary?",
        },
        {
            type: 'input',
            name: "department_id",
            message: "What department id do they work in",
        }
        
    ])
    .then(input => {
        console.log(input.managerName)
        insertRole(input.title,input.salary,input.department_id)
    })
}
// id: 'employeeName',
//             first_name: 'What is the first name of employee?',
//             last_name_:  'What is the last name of employee?'
//             role_id:'What is their role id?'
//             manager_id: 'who is their manager?'
//             employee (null if employee has no manager),
// end of roles, beginning of employee
function addEmployee(){
inquirer
    .prompt([{
            type: 'input',
            name: "firstName",
            message: "What is the first name of employee?",

        },
        {
            type: 'input',
            name: "lastName",
            message: "What is the last name of employee?",

        },
        {
            type: 'input',
            name: "role_id",
            message: "What is their role id?",

        },
        {
            type: 'input',
            name: "manager_id",
            message: "What is their manager id?",

        },
        

    ])

    .then(input => {
        console.log(input.managerName)
        insertEmployee (input.firstName, input.lastName, input.role_id, input.manager_id)

    })
}

function editEmployee(){
    inquirer
        .prompt([{
                type: 'input',
                name: "employeeId",
                message: "What is the id of employee to update?",
    
            },
            {
                type: 'input',
                name: "roleId",
                message: "What is the new role id for this employee?",
    
            },
            
    
        ])
    
        .then(input => {
            console.log(input.managerName)
            updateEmployee (input.employeeId, input.roleId)
    
        })
    }

async function queryDepartments(){
    const allDepartments = await asyncQuery("SELECT * FROM departments;")
    const table = cTable.getTable(allDepartments)
    console.log(table);
    start()
}
async function queryRoles(){
    const allRoles = await asyncQuery("SELECT roles.id, roles.title, roles.salary, departments.name AS 'department' FROM roles JOIN departments ON roles.department_id = departments.id;")
    const table = cTable.getTable(allRoles)
    console.log(table);
    start()
}
async function queryEmployees(){
    const allEmployees = await asyncQuery("SELECT e.id, e.first_name, e.last_name, r.title, r.salary, d.name AS 'department', m.last_name AS 'manager' FROM employees e LEFT JOIN roles r ON e.role_id = r.id LEFT JOIN departments d ON r.department_id = d.id LEFT JOIN employees m ON e.manager_id = m.id;")
    const table = cTable.getTable(allEmployees)
    console.log(table);
    start()
}

async function insertDepartment(departmentName){
    await asyncQuery("INSERT INTO departments (name) VALUES (?);", [departmentName])
    const allDepartments = await asyncQuery("SELECT * FROM departments;")
    const table = cTable.getTable(allDepartments)
    console.log(table);
    start()
}

async function insertRole(roleName, salary, deptId){
    await asyncQuery("INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);", [roleName, salary, deptId])
    const allRoles = await asyncQuery("SELECT roles.id, roles.title, roles.salary, departments.name AS 'department' FROM roles JOIN departments ON roles.department_id = departments.id;")
    const table = cTable.getTable(allRoles)
    console.log(table);
    start()
}

async function insertEmployee(firstName, lastName, roleId, managerId){
    await asyncQuery("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);", [firstName, lastName, roleId, managerId])
    const allEmployees = await asyncQuery("SELECT e.id, e.first_name, e.last_name, r.title, r.salary, d.name AS 'department', m.last_name AS 'manager' FROM employees e LEFT JOIN roles r ON e.role_id = r.id LEFT JOIN departments d ON r.department_id = d.id LEFT JOIN employees m ON e.manager_id = m.id;")
    const table = cTable.getTable(allEmployees)
    console.log(table);
    start()
}

async function updateEmployee(employeeId, roleId){
    await asyncQuery("UPDATE employees SET role_id = ? WHERE id = ?;", [roleId, employeeId])
    const allEmployees = await asyncQuery("SELECT e.id, e.first_name, e.last_name, r.title, r.salary, d.name AS 'department', m.last_name AS 'manager' FROM employees e LEFT JOIN roles r ON e.role_id = r.id LEFT JOIN departments d ON r.department_id = d.id LEFT JOIN employees m ON e.manager_id = m.id;")
    const table = cTable.getTable(allEmployees)
    console.log(table);
    start()
}    


start()