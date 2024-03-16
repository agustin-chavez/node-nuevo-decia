const fs = require("fs");

// Leer un archivo
fs.readFile("archivo.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});

// Escribir en un archivo
fs.writeFile("nuevoArchivo.txt", "Contenido del archivo", (err) => {
  if (err) throw err;
  console.log("Archivo creado exitosamente");
});
