const express = require("express");
// Import and require mysql2
const mysql = require("mysql2");
const pass = require('dotenv').config();

const inquirer = require("inquirer");

// import {mypass} from 'env';

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
    password: process.env.DB_PASSWORD,
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
      "update employee role",
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

  if (answers.options === "view all departments") {
    db.query("SELECT * FROM department", function (err, results) {
      return console.table(results);
    });
  }

  if (answers.options === "view all roles") {
    db.query("SELECT * FROM roles", function (err, results) {
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
      db.query(
        "INSERT INTO employee SET ?",
        { first_name: answers.name, last_name: answers.lastname },
        (err, res) => {
          if (err) throw err;
          console.log("Employee has been added");
        }
      );
    });
  }

  const questions3 = [
    {
      type: "input",
      name: "rolename",
      message: "What is the title of the new role?",
    },
    {
      type: "input",
      name: "salary",
      message: "What is the salary of the new role?",
    },
  ];

  if (answers.options === "add role") {
    inquirer.prompt(questions3).then((answers) => {
      db.query(
        "INSERT INTO roles SET ?",
        { title: answers.rolename, salary: answers.salary },
        (err, res) => {
          if (err) throw err;
          console.log("role has been added");
        }
      );
    });
  }

  const questions4 = [
    {
      type: "input",
      name: "departmentname",
      message: "What is the name of the new department",
    },
  ];

  if (answers.options === "add department") {
    inquirer.prompt(questions4).then((answers) => {
      db.query(
        "INSERT INTO department SET ?",
        { name: answers.departmentname },
        (err, res) => {
          if (err) throw err;
          console.log("Department has been added");
        }
      );
    });
  }

  const questions5 = [
    {
      type: "input",
      name: "roleupdate",
      message: "What is the new role to update?",
    },

    {
      type: "input",
      name: "roleid",
      message: "Which role id would like to update?",
    },
  ];

  if (answers.options === "update employee role") {
    inquirer.prompt(questions5).then((answers) => {
      db.query(
        `UPDATE roles SET title = ? WHERE id = ?`,
        [answers.roleupdate, answers.roleid],
        (err, result) => {
          if (err) {
            console.log(err);
          }
          console.log(result);
          inquirer.prompt();
        }
      );
    });
  }

  const questions6 = [
    {
      type: "input",
      name: "delete",
      message: "Which employee would you like to delete?",
    },
  ];

  if (answers.options === "delete an employee") {
    inquirer.prompt(questions6).then((answers) => {
      db.query(
        `DELETE FROM employee WHERE id = ?`,
        answers.delete,
        (err, result) => {
          if (err) {
            console.log(err);
          }
          console.log(result);
          inquirer.prompt();
        }
      );
    });
  }
}); //the whole block
