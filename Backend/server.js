const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Simulação de banco de dados para pontos (você pode usar um banco real depois)
let scoreboard = [
  { nome: 'Jogador 1', pontos: 150 },
  { nome: 'Jogador 2', pontos: 120 }
];

// Rota para obter o scoreboard
app.get('/scoreboard', (req, res) => {
  res.json(scoreboard);
});

// Rota para adicionar pontos
app.post('/add-points', (req, res) => {
  const { nome, pontos } = req.body;
  const jogador = scoreboard.find(j => j.nome === nome);

  if (jogador) {
    jogador.pontos += pontos;
  } else {
    scoreboard.push({ nome, pontos });
  }

  res.status(200).json(scoreboard);
});

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
