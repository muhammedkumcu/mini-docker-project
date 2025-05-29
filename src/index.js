const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// JSON ve form parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL bağlantısı
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'secret',
  database: process.env.MYSQL_DATABASE || 'miniapp'
});

const attemptConnection = () => {
  db.connect(err => {
    if (err) {
      console.error('Veritabanına bağlanılamadı, 5 saniye sonra tekrar denenecek...');
      setTimeout(attemptConnection, 5000);
    } else {
      console.log('Veritabanına başarıyla bağlanıldı!');
      const sql = `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        firstname VARCHAR(255),
        lastname VARCHAR(255),
        studentnumber VARCHAR(20)
      )`;
      db.query(sql, (err, result) => {
        if (err) throw err;
        console.log('users tablosu hazır.');
      });
    }
  });
};

attemptConnection();


// Anasayfa (form ve liste)
app.get('/', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Hata oluştu.');
    }
    const tableRows = results.map(row => `
      <tr>
        <td>${row.firstname}</td>
        <td>${row.lastname}</td>
        <td>${row.studentnumber}</td>
      </tr>
    `).join('');

    const html = `
      <h1>Kullanıcı Kayıt Sistemi</h1>
      <form method="POST" action="/add">
        <input name="firstname" placeholder="İsim" required />
        <input name="lastname" placeholder="Soyisim" required />
        <input name="studentnumber" placeholder="Numara" required />
        <button type="submit">Ekle</button>
      </form>
      <h2>Kayıtlar</h2>
      <table border="1" cellpadding="5" cellspacing="0">
        <tr><th>İsim</th><th>Soyisim</th><th>Numara</th></tr>
        ${tableRows}
      </table>
    `;
    res.send(html);
  });
});

// Form gönderimi
app.post('/add', (req, res) => {
  const { firstname, lastname, studentnumber } = req.body;
  if (!firstname || !lastname || !studentnumber) {
    return res.status(400).send('Eksik bilgi!');
  }
  const sql = 'INSERT INTO users (firstname, lastname, studentnumber) VALUES (?, ?, ?)';
  db.query(sql, [firstname, lastname, studentnumber], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Hata oluştu.');
    }
    res.redirect('/');
  });
});

app.listen(port, () => {
  console.log(`Web uygulaması http://localhost:${port} adresinde çalışıyor.`);
});

