const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

// import {mypass} from 'env';

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: "Flush@13",
    database: 'staff_db'
  },
  console.log(`Connected to the books_db database.`)
);

app.get('/db/seeds', (req, res) =>{
  const bodyInfo = req.body;
  console.log (bodyInfo);

  res.json({
    message: 'something posted',
    data: bodyInfo,
  });
});


app.post('/api/staff', (req, res) => {
  const staffData = req.body;
  console.log(staffData);

  const query = 'INSERT INTO department (name) VALUES (?)';
  const departmentArgs = staffData.department_name;

  db.query(query, departmentArgs, (err, result) => {
    if(err) {

      res.status(400).json({
        message: 'deparment is bad',
        data: err,
      });
      console.err(err);
     }else {
        res.json({
    message: 'Something good',
    data: staffData,
  });
     }
  });
});

app.get('/api/employee', (req,res) =>{
  const query = `SELECT id, first_name FROM employee`;


  db.query(query, (err, result) => {
    if(err) {
      console.log(err);
      res.status(500).json({
        message: 'error getting employees',
        data: err,
      })      
     }else {
        res.json({
         data: result,
  });
     }
  });

})

// Query database

let rowDelete;

// db.query(`DELETE FROM favorite_books WHERE id = ?`, rowDelete, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

// // Query database
// db.query('SELECT * FROM favorite_books', function (err, results) {
//   console.log(results);
// });

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
