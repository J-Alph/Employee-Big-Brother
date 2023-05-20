const inquirer = require('inquirer');
const viewEmployee = require('./utils/answerchoices')

const questions = [
    {
      type: 'list',
      message: 'what would you like to do?',
      name: 'options',
      choices: ["View all employees" ,"add employee" , "update Employee" , "view all roles", "add role", "view all departments"
                , "add department"],
    }
    ,
    
  ]
  function runPrompt (){
    return inquirer.prompt(questions)
        .then ((answers) => {
            const info = viewEmployee(answers)
          console.log(info);
        }


)
}

runPrompt();