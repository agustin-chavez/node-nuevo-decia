// Importar un módulo
const fs = require("fs");

// Utilizar funciones del módulo fs
fs.readFile("archivo.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});
