var { Pool } = require('pg');

var db = new Pool({
  user: 'trade_user',
  host: 'localhost',
  database: 'trade_db',
  password: '123456',
  port: 5432,
});
var dia = new Date();

db.query('SELECT * FROM Student;', (err, res) => {
  console.log(res.rows[0]);
  console.log(dia.getFullYear()+'-'+dia.getMonth()+'-'+dia.getDay()+' '+dia.getHours()+':'+dia.getMinutes()+':'+dia.getMilliseconds());
  db.end();
});
