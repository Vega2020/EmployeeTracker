//Set up dependencies:
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "",
    database: "company"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    startTracker();
  });


function startTracker() {
    inquirer
      .prompt([{
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "Add department",
          "Add role",
          "Add employee",
          "View department",
          "View role",
          "View employee",
          "Update employee role",
          "exit"
        ],
      }])
      .then(function(answer) {
        console.log(answer);
        switch (answer.action) {
        case "Add department":
          addDept();
          break;
  
        case "Add role":
          addRole();
          break;
  
        case "Add employee":
          addEmp();
          break;
  
        case "View department":
          viewDept();
          break;

        case "View role":
          viewRole();
          break;
           
        case "View employee":
           viewEmp();
           break;
           
        case "Update employee role":
           updateEmp();
           break;
  
        case "exit":
          connection.end();
          break;
        }
      });
  }

// write a function to add departments, 
function addDept() {
  inquirer
    .prompt({
      name: "name",
      type: "input",
      message: "Department Name:"
    })
    .then(function(answer) {
      var query = "INSERT INTO department (name) VALUES (?)";
      connection.query(query, [answer.name], function(err, res) {
        if (err) {throw err;}
        else {
        console.log("Department added!");
        startTracker();
        }
      });
    });
};

// write a function to add roles, 
function addRole() {
    inquirer
      .prompt([{
        name: "title",
        type: "input",
        message: "Name the new role:"
      },
      {
        name: "salary",
        type: "number",
        message: "What salary does this role receive?"
      }])
      .then(function(answer) {
        var query = "INSERT into role (title, salary, department_id) VALUES (?, ?)";
        connection.query(query, [answer.title, answer.salary], function(err, res) {
          if (err) {throw err;}
          else {
          console.log("Role added!");
          startTracker();
          }
        });
      });
  };

//write a function to add employees
function addEmp() {
  inquirer
    .prompt([{
      name: "first_name",
      type: "input",
      message: "Employee first name:"
    },
    {
      name: "last_name",
      type: "input",
      message: "Employee last name:"
    }])
    .then(function(answer) {
      var query = "INSERT into employee (first_name, last_name) VALUES (?, ?)";
      connection.query(query, [answer.first_name, answer.last_name], function(err, res) {
        if (err) {throw err;}
        else {
        console.log("Role added!");
        startTracker();
        }
      });
    });
};


// write a function to view departments

  

// write a function to view  roles, 
  


// write a function to view  employees,



// write a function to Update employee roles