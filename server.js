const express = require("express");
// Import and require mysql2
const mysql = require("mysql2");

const inquirer = require("inquirer");

// import {mypass} from 'env';

const viewEmployee = require("./utils/answerchoices");

const PORT = process.env.PORT || 3002;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Flush@13",
    database: "staff_db",
  },
  console.log(`Connected to the books_db database.`)
);

const questions = [
  {
    type: "list",
    message: "what would you like to do?",
    name: "options",
    choices: [
      "View all employees",
      "add employee",
      "update Employee",
      "view all roles",
      "add role",
      "view all departments",
      "add department",
      "delete an employee",
    ],
  },
];

inquirer.prompt(questions).then((answers) => {
  if (answers.options === "View all employees") {
    db.query("SELECT * FROM employee", function (err, results) {
      return console.table(results);
    });
  }

  const questions2 = [
    {
      type: "input",
      name: "name",
      message: "What is the name of the employee?",
    },
    {
      type: "input",
      name: "lastname",
      message: "What is the last name of the employee?",
    },
  ];

  if (answers.options === "add employee") {
    inquirer.prompt(questions2).then((answers) => {
      //   const questions2 = [  {
      //   type: "input",
      //   name: "title",
      //   message: "What is the name of the employee?",
      // }]

      db.query(
        "INSERT INTO employee SET ?",
        { first_name: answers.name, last_name: answers.lastname },
        (err, res) => {
          if (err) throw err;
          console.log("Employee has been added");
          runPrompt();
        }
      );
    });
  }
  const questions3 = [
    {
      type: "input",
      name: "delete",
      message: "Which employee would you like to delete?",
    },
  ];

  if (answers.options === "delete an employee") {
    inquirer.prompt(questions3).then((answers) => {
      db.query(
        `DELETE FROM employee WHERE id = ?`,
        answers.delete,
        (err, result) => {
          if (err) {
            console.log(err);
          }
          console.log(result);
        }
      );
    });
  }

  if (answers.options === "view all departments") {
    db.query("SELECT * FROM department", function (err, results) {
      return console.log(results);
    });
  }
}); //the whole block
