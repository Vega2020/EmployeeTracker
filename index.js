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
    database: "top_songsDB"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    startTracker();
  });

// write a function to add departments, 

function startTracker() {
    inquirer
      .prompt({
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
        ]
      })
      .then(function(answer) {
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

// write a function to add roles, 


//write a function to add employees




// write a function to view departments

  

// write a function to view  roles, 
  


// write a function to view  employees,



// write a function to Update employee roles