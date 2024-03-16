const fs = require("fs");

// Crear un stream de lectura desde un archivo
const readStream = fs.createReadStream("archivo.txt", "utf8");

// Ejemplo de uso de la función once para manejar un evento una sola vez
readStream.once('open', () => {
  console.log('El archivo se ha abierto');
});

// Evento 'data' para leer datos del stream
readStream.on("data", (chunk) => {
  console.log(chunk);
});

// Evento 'end' cuando el stream ha terminado
readStream.on("end", () => {
  console.log("Fin del archivo");
});

// Manejar errores en el stream
readStream.on('error', (err) => {
  console.error('Error en el stream:', err);
});