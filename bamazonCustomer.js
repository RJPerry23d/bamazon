var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "J0naspup",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Choice 1",
        "Choice 2",
        "Choice 3",
        "Choice 4"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "enter case":
          firstSearch();
          break;

        case "enter case":
          secondSearch();
          break;

        case "enter case":
          thirdSearch();
          break;

        case "enter case":
          fourthSearch();
          break;
      }
    });
}