# Node.js con WebAssembly

WebAssembly es un lenguaje de alto rendimiento similar a un ensamblador que se puede compilar desde varios lenguajes, incluidos C/C++, Rust y AssemblyScript. ¡Actualmente, es compatible con Chrome, Firefox, Safari, Edge y Node.js!

La especificación de WebAssembly detalla dos formatos de archivo, un formato binario llamado Módulo de WebAssembly con una extensión .wasm y una representación de texto correspondiente llamada formato de texto de WebAssembly con una extensión .wat.

## Conceptos Clave

- Módulo: Un binario compilado de WebAssembly, es decir, un archivo .wasm.
- Memoria: Un ArrayBuffer redimensionable.
- Tabla: Un array tipado redimensionable de referencias no almacenadas en la Memoria.
- Instancia: Una instancia de un Módulo con su Memoria, Tabla y variables.

Para podés usar WebAssembly, necesitás un archivo binario .wasm y un conjunto de APIs para comunicarte con WebAssembly. Node.js provee las APIs necesarias a través del objeto global WebAssembly.

```javascript
console.log(WebAssembly);
/*
Object [WebAssembly] {
  compile: [Function: compile],
  validate: [Function: validate],
  instantiate: [Function: instantiate]
}
*/
```

## Generando Módulos de WebAssembly

Existen varios métodos disponibles para generar archivos binarios de WebAssembly, incluidos:

- Escribir WebAssembly (.wat) a mano y convertirlo al formato binario usando herramientas como wabt.
- Usar emscripten con una aplicación C/C++.
- Usar wasm-pack con una aplicación Rust.
- Usar AssemblyScript si preferís una experiencia similar a TypeScript.

Algunas de estas herramientas generan no solo el archivo binario, sino también el código "glue" en JavaScript y los archivos HTML correspondientes para correr en el navegador.

## Cómo usarlo

Una vez que tengás un módulo de WebAssembly, podés usar el objeto WebAssembly de Node.js para instanciarlo.

```javascript
// Supongamos que existe un archivo add.wasm que contiene una única función que suma 2 argumentos proporcionados
const fs = require('node:fs');
const wasmBuffer = fs.readFileSync('/path/to/add.wasm');
WebAssembly.instantiate(wasmBuffer).then(wasmModule => {
  // La función exportada se encuentra en instance.exports
  const { add } = wasmModule.instance.exports;
  const sum = add(5, 6);
  console.log(sum); // Salida: 11
});
```

## Interactuando con el Sistema Operativo

Los módulos de WebAssembly no pueden acceder directamente a la funcionalidad del sistema operativo por sí mismos. Podés utilizar una herramienta de terceros llamada Wasmtime para acceder a esta funcionalidad. Wasmtime utiliza la API WASI para acceder a la funcionalidad del sistema operativo.