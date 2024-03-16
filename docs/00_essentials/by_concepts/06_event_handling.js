// Ejemplo básico de EventEmitter
const EventEmitter = require("events");

// Crear una instancia de EventEmitter
const emitter = new EventEmitter();

// Escuchar un evento
emitter.on("event", () => {
  console.log("Evento emitido");
});

// Emitir un evento
emitter.emit("event");
