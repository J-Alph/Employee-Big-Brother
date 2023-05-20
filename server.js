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

// app.get('/db/seeds', (req, res) =>{
//   const bodyInfo = req.body;
//   console.log (bodyInfo);

//   res.json({
//     message: 'something posted',
//     data: bodyInfo,
//   });
// });

// app.post('/api/staff', (req, res) => {
//   const staffData = req.body;
//   console.log(staffData);

//   const query = 'INSERT INTO department (name) VALUES (?)';
//   const departmentArgs = staffData.department_name;

//   db.query(query, departmentArgs, (err, result) => {
//     if(err) {

//       res.status(400).json({
//         message: 'deparment is bad',
//         data: err,
//       });
//       console.err(err);
//      }else {
//         res.json({
//     message: 'Something good',
//     data: staffData,
//   });
//      }
//   });
// });

// app.get('/api/employee', (req,res) =>{
//   const query = `SELECT id, first_name FROM employee`;

//   db.query(query, (err, result) => {
//     if(err) {
//       console.log(err);
//       res.status(500).json({
//         message: 'error getting employees',
//         data: err,
//       })
//      }else {
//         res.json({
//          data: result,
//   });
//      }
//   });

// })

// Query database

// let rowDelete;

// db.query(`DELETE FROM favorite_books WHERE id = ?`, rowDelete, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

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
      "delete an employee"
    ],
  },
];

inquirer.prompt(questions).then((answers) => {
  if (answers.options === "View all employees") {
    console.log("hello");
    db.query("SELECT * FROM employee", function (err, results) {
      return console.log(results);
      runPrompt();
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

  db.query(`DELETE FROM favorite_books WHERE id = ?`, rowDelete, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});



});

// function runPrompt (){
//   return inquirer.prompt(questions)
//       .then ((answers) => {
//           const info = viewEmployee(answers)
//         console.log(info);
//       }
