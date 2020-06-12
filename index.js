//Set up dependencies:
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

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
          "View departments",
          "View roles",
          "View employees",
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
  
        case "View departments":
          viewDept();
          break;

        case "View roles":
          viewRole();
          break;
           
        case "View employees":
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
};

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
        var query = "INSERT into role (title, salary) VALUES (?, ?)";
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
      var query = "INSERT INTO employee (first_name, last_name) VALUES (?, ?)";
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
function viewDept() {
  let query = "SELECT * FROM department";
  connection.query(query, function(err, res){
    if (err) {throw err;}
    else {
    console.table(res);
    inquirer.prompt(
      {
        name: "return",
        type: "confirm",
        message: "Return to menu?"
      }
    ).then(function(answer) {
      if (answer.return === true) {
        startTracker();
      } else {
        connection.end();
      };
    });
    };
  });
};

// write a function to view roles, 
function viewRole() {
  let query = "SELECT * FROM role";
  connection.query(query, function(err, res){
    if (err) {throw err;}
    else {
    console.table(res);
    inquirer.prompt([
      {
        name: "return",
        type: "confirm",
        message: "Return to menu?"
      }
    ]).then(function(answer) {
      console.log(answer);
      if (answer.return === true) {
        startTracker();
      } else if (answer.return === false) {
        connection.end();
      };
    });
    };
  });
}; 

// write a function to view  employees,
function viewEmp() {
  let query = "SELECT * FROM employee";
  connection.query(query, function(err, res){
    if (err) {throw err;}
    else {
    console.table(res);
    inquirer.prompt([
      {
        name: "return",
        type: "confirm",
        message: "Return to menu?"
      }
    ]).then(function(answer) {
      console.log(answer);
      if (answer.return === true) {
        startTracker();
      };
      if (answer.return === false) {
        connection.end();
      };
    });
    };
  });
}; 

// write a function to Update employee roles
function updateEmp() {
  let employeeRoster = [];
  let rolesList = [];
  connection.query("SELECT id, first_name, last_name FROM employee", function(err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      employeeRoster.push("ID#" + res[i].id + " " + res[i].first_name + " " + res[i].last_name);
      console.log(employeeRoster);
    };
  });
  connection.query("SELECT id, title FROM employee",
  function(err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      rolesList.push("ID#" + res[i].title);
      console.log(rolesList);
    };
  });
  inquirer
    .prompt([{
      name: "employeeNum",
      type: "rawlist",
      message: "Choose ID number of employee to update",
      choices: [employeeRoster]
    },
  {
    name: "newRole",
    type: "rawlist",
    message: "Choose ID number of new role for this employee",
    choices: [rolesList]
  }])
    .then(function({employeeNum, newRole}) {
      let query = "UPDATE employee SET role_id = ? WHERE id = ?";
      connection.query(query, [answer.newRole, answer.employeeNum], function(err, res) {
        if (err) {throw err;}
        else {
        console.log("Employee role updated!");
        startTracker();
        }
      });
    });
};