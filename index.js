const inquirer = require('inquirer');

inquirer
  .prompt([
    {
      type: 'list',
      message: 'what would you like to do?',
      name: 'employeroptions',
      choices: ["View all employees" ,"add employee" , "update Employee" , "view all roles", "add role", "view all departments"
                , "add department"]
    },
    {
      type: 'password',
      message: 'What is your password?',
      name: 'password',
    },
    {
      type: 'password',
      message: 'Re-enter password to confirm:',
      name: 'confirm',
    },
  ])
  .then((response) =>
    response.confirm === response.password
      ? console.log('Success!')
      : console.log('You forgot your password already?!')
  );