require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'chamada_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('Banco de dados conectado');
});

// Rota para registrar chamada
app.post('/chamada', (req, res) => {
  const { aluno, RGM, professor, latitude, longitude } = req.body;
  const query = 'INSERT INTO chamadas (aluno, RGM, professor, latitude, longitude) VALUES (?, ?,  ?, ?, ?)';
  db.query(query, [aluno, RGM, professor, latitude, longitude], (err, result) => {
    if (err) throw err;
    res.send('Chamada registrada com sucesso');
  });
});

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));