const express = require("express");
const path = require("path");
const app = express();

const { REACT_APP_BACKEND_URL, REACT_APP_HOURS_CLOSE_TICKETS_AUTO } = process.env;

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, "build")));

// Servir config.js se existir (para o script de variáveis)
app.get("/config.js", (req, res) => {
  const configPath = path.join(__dirname, "build", "config.js");
  res.sendFile(configPath, (err) => {
    if (err) {
      res.status(404).send("Config file not found");
    }
  });
});

// Para todas as outras rotas, retornar o index.html (SPA routing)
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Usar a porta correta (3000 conforme Dockerfile)
const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Backend URL: ${REACT_APP_BACKEND_URL}`);
  console.log(`Close Tickets Auto Hours: ${REACT_APP_HOURS_CLOSE_TICKETS_AUTO}`);
});