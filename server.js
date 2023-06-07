// Import and require mysql2
const mysql = require("mysql2");
const pass = require("dotenv").config();

const inquirer = require("inquirer");

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

function workdb() {
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
        "salary budget",
      ],
    },
  ];

  inquirer.prompt(questions).then((answers) => {
    if (answers.options === "View all employees") {
      db.query("SELECT * FROM employee", async function (err, results) {
        console.log("\n");
        console.table(results);
        console.log("\n");
        workdb();
      });
    }

    if (answers.options === "view all departments") {
      db.query("SELECT * FROM department", function (err, results) {
        console.log("\n");
        console.table(results);
        console.log("\n");
        workdb();
      });
    }

    if (answers.options === "view all roles") {
      db.query("SELECT * FROM roles", function (err, results) {
        console.log("\n");
        console.table(results);
        console.log("\n");
        workdb();
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
            console.log("\n");
            workdb();
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
{
      type: "input",
        name: "dpID",
        message: "What is the department of the new role?"
}
    ];

    if (answers.options === "add role") {
      inquirer.prompt(questions3).then((answers) => {
        db.query(
          "INSERT INTO roles SET ?",
          { title: answers.rolename, salary: answers.salary, department_id: answers.dpID },
          (err, res) => {
            if (err) throw err;
            console.log("role has been added");
            console.log("\n");
            workdb();
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

            console.log("\n");
            workdb();
          }
        );
      });
    }

    const questions5 = [
      {
        type: "input",
        name: "roleupdate",
        message: "What new role would you like to add ? ",
      },

      {
        type: "input",
        name: "roleid",
        message: "Which role id would you like to update?",
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
            console.log("\n");
            workdb();
          }
        );
      });
    }

    const questions6 = [
      {
        type: "input",
        name: "delete",
        message: "Which employee(id) would you like to delete?",
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
            console.log("\n");
            console.log(result);
            console.log("\n");
            workdb();
          }
        );
      });
    }

    const questions7 = [
      {
        type: "input",
        name: "salary",
        message: "Enter a department ID to reivew the budget",
      },
    ];

    if (answers.options === "salary budget"){
      inquirer.prompt(questions7).then((answers) => {
        db.query(
          "SELECT SUM(salary) FROM roles where department_id= ?", answers.salary,
          (err, result) => {
            if (err) {
              console.log(err);
            }
            console.table(result);
            console.log("\n");
            workdb();
          }
        );
      });

    }
  }); //the whole block
}
workdb();
