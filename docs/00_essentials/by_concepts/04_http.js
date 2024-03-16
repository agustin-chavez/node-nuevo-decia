const http = require("http");

// Crear un servidor HTTP
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("¡Hola Mundo!\n");
});

// Escuchar en un puerto específico
server.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});
