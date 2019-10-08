const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const socketio = require("socket.io");
const http = require("http");

const routes = require("./routes");

const app = express(); //Cria servidor express
const server = http.Server(app);// extrai a parte http do express
const io = socketio(server);// Adiciona o socket.io no servidor

const connectedUsers = {};

mongoose.connect(
  "your-mongodb-url",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

io.on('connection', socket => {
  const {user_id} = socket.handshake.query;
  connectedUsers[user_id] = socket.id;
})

// Adicionando propriedades a variável request "req"
// As propridedes adicionadas estarão disponíveis em todas as rotas.
app.use((req, res, next) => {
  req.io = io; // Para utilização do socket.io
  req.connectedUsers = connectedUsers; // Para acessar os usuários conectados.
  
  return next();
})

app.use(cors());
app.use(express.json());
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(routes);

server.listen(3333);
