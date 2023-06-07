const inquirer = require('inquirer');
const viewEmployee = require('./utils/answerchoices')

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
      "salary budget"
    ],
  },
];

//   function runPrompt (){
//     return inquirer.prompt(questions)
//         .then ((answers) => {
//             const info = viewEmployee(answers)
//           console.log(info);
//         }


// )
// }

// runPrompt();



switch (answers.options){
  case "View all employees":
    db.query("SELECT * FROM employee" , function (err, results) { 
      console.table(results);
      workdb();
    });
     break;
  case "view all departments":
  db.query("SELECT * FROM department", function (err, results) {
    console.log("\n")
    console.table(results);
    console.log("\n")
    workdb();
  });
  break;

case "view all roles":
db.query("SELECT * FROM roles", function (err, results) {
  console.log("\n")
  console.table(results);
  console.log("\n")
  workdb();
});

case "add employee":
  db.query(
    "INSERT INTO employee SET ?",
    { first_name: answers.name, last_name: answers.lastname },
    (err, res) => {
      if (err) throw err;
      console.log("Employee has been added");
      console.log("\n")
    workdb();

    }
    );












    
}

 
