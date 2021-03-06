const db_connection = require('./../../build_database/db_connection.js');

const data = {};

data.getAllUsers = (cb) => {
  db_connection.query('SELECT id, first_name, last_name FROM users', (err,res)=>{
    if(err) cb(new Error('Error getting data from database'));
    cb(null, res.rows);
  });
};

data.getUser = (id, cb) => {
  db_connection.query(`SELECT * FROM users WHERE users.id = ${id}`, (err,res)=>{
    if(err) cb(new Error('Error getting data from database'));
    cb(null, res.rows[0]);
  });
};

data.addUserToDatabase = (formvalues, cb) => {
  const userKeys = Object.keys(formvalues).join(', ');
  const userValues = Object.keys(formvalues).map(e=>{
    return `'${formvalues[e]}'`;
  }).join(', ');

  db_connection.query(`INSERT INTO users (${userKeys}) VALUES (${userValues}) `, (err, res)=>{
    if (err) cb(err);
    cb(null, res);
  });
};

data.getUsersFromTeam = (teamName, cb) => {
  const strippedName = teamName.replace(/[^0-9a-z]/gi, '');

  db_connection.query(`SELECT users.id, first_name, last_name FROM users INNER JOIN userteam ON users.id = userteam.user_id INNER JOIN teams ON userteam.team_id = teams.id WHERE LOWER(teams.team_names) = LOWER('${strippedName}')`, (err,res)=>{
    if(err) cb(new Error('Error getting data from database'));
    cb(null, res.rows);
  });
};

module.exports = data;
