const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const util = require('util');
const dotenv = require('dotenv');
dotenv.config()

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
    password: process.env.SEQUEL_PASSWORD,
    database: 'operation_viewer'
  });

const asyncQuery = util.promisify(connection.query)


function start(){
    inquirer
    .prompt([{
            type: 'list',
            name: 'userChoice',
            message: "What would like to do?",
            choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee","update an employee role"]
        },
        
    ])

    .then(input => {
        console.log(input)
        
    })
}
function addDepartment(){
    inquirer
    .prompt([{
            type: 'input',
            name: 'departmentName',
            message: "What is the department name?"
        },
        {
            type: 'input',
            name: 'departmentId',
            message: "What is the department id?"
        },
        
    ])

    .then(input => {
        console.log(input)
        
    })
}

//end of department, beginning of roles
function roles(){


inquirer
    .prompt([{
            type: 'input',
            id: 'roleName',
            title: 'What is the name of your engineer?',
            salary: 'What is the salary?' ,
            department_id: 'What department do you work do they work in' ,
        },
        
    ])
    .then(input => {
        console.log(input.managerName)
        const newEngineer = new Engineer(input.engineerName, input.engineerId, input.engineerEmail, input.engineerGithub)
        allEmployees.push(newEngineer)
        menu()
    })
}
// end of roles, beginning of employee
function employee(){
inquirer
    .prompt([{
            type: 'input',
            id: 'employeeName',
            first_name: 'What is the first name of employee?',
            last_name_:  'What is the last name of employee?'
            role_id:'What is their role id?'
            manager_id: 'who is their manager?'
            employee (null if employee has no manager),
        },
        

    ])

    .then(input => {
        console.log(input.managerName)
        const newIntern = new Intern(input.internName, input.internId, input.internEmail, input.internSchool)
        allEmployees.push(newIntern)
        menu()

    })
}