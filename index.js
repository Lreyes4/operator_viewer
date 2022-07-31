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

function viewDepartments(){
    inquirer
    .prompt([{
            type: 'input',
            name: 'departmentName',
            id: "What is the department name?"
        },
        
    ])

    .then(input => {
        console.log(input)
        const newDepartment = new Department(input.departmetnName, input.managerId, input.email, input.managerOfficeNum)
        allEmployees.push(newDepartment)
        menu()
    })
}

//end of department, beginning of roles
function roles(){


inquirer
    .prompt([{
            type: 'input',
            id: 'engineerName',
            title: 'What is the name of your engineer?',
            salary: ,
            department_id: ,

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
            id: 'internName',
            first_name: 'What is the name of your intern?',
            last_name_: 
            role_id:
            manager_id:
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