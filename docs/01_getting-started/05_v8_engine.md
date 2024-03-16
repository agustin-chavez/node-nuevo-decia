# El Motor de JavaScript V8

V8 es el nombre del motor de JavaScript que impulsa Google Chrome. Es lo que toma nuestro JavaScript y lo ejecuta mientras navegamos con Chrome.

V8 es el motor de JavaScript, es decir, analiza y ejecuta código JavaScript. El DOM y las demás API de la Plataforma Web (que conforman el entorno de ejecución) son proporcionados por el navegador.

Lo interesante es que el motor de JavaScript es independiente del navegador en el que está alojado. Esta característica clave permitió el surgimiento de Node.js. V8 fue elegido como el motor que impulsaba Node.js en 2009, y a medida que la popularidad de Node.js explotó, V8 se convirtió en el motor que ahora alimenta una cantidad increíble de código del lado del servidor escrito en JavaScript.

El ecosistema de Node.js es enorme y gracias a V8, que también impulsa aplicaciones de escritorio, con proyectos como Electron.

## Otros motores JS
Otros navegadores tienen su propio motor de JavaScript:

- Firefox tiene SpiderMonkey
- Safari tiene JavaScriptCore (también llamado Nitro)
- Edge se basaba originalmente en Chakra, pero más recientemente ha sido reconstruido utilizando Chromium y el motor V8.

y muchos otros también existen.

Todos esos motores implementan el estándar ECMA ES-262, también llamado ECMAScript, el estándar utilizado por JavaScript.

## La búsqueda del rendimiento
V8 está escrito en C++ y se mejora continuamente. Es portátil y se ejecuta en Mac, Windows, Linux y varios otros sistemas.

En esta introducción a V8, ignoraremos los detalles de implementación de V8: se pueden encontrar en sitios más autorizados (por ejemplo, el sitio oficial de V8) y cambian con el tiempo, a menudo radicalmente.

V8 está siempre evolucionando, al igual que los otros motores de JavaScript, para acelerar la Web y el ecosistema de Node.js.

En la web, hay una carrera por el rendimiento que ha estado ocurriendo durante años, y nosotros (como usuarios y desarrolladores) nos beneficiamos mucho de esta competencia porque obtenemos máquinas más rápidas y optimizadas año tras año.

## Compilación
JavaScript generalmente se considera un lenguaje interpretado, pero los motores modernos de JavaScript ya no solo interpretan JavaScript, lo compilan.

Esto ha estado sucediendo desde 2009, cuando se agregó el compilador de JavaScript SpiderMonkey a Firefox 3.5, y todos siguieron esta idea.

JavaScript es compilado internamente por V8 con compilación justo a tiempo (JIT) para acelerar la ejecución.

Esto puede parecer contraintuitivo, pero desde la introducción de Google Maps en 2004, JavaScript ha evolucionado desde un lenguaje que generalmente ejecutaba unas pocas docenas de líneas de código hasta aplicaciones completas con miles a cientos de miles de líneas que se ejecutan en el navegador.

Ahora nuestras aplicaciones pueden ejecutarse durante horas dentro de un navegador, en lugar de ser solo algunas reglas de validación de formularios o scripts simples.

En este nuevo mundo, compilar JavaScript tiene mucho sentido porque, aunque puede llevar un poco más tener el JavaScript listo, una vez hecho, será mucho más eficiente que el código puramente interpretado.


## Una nota personal: ECMAScript

ECMAScript (también conocido como ES) es la especificación estándar que define el lenguaje de programación JavaScript. Establece las reglas, las estructuras y las funcionalidades que los desarrolladores deben seguir al escribir código en JavaScript. A lo largo del tiempo, han existido varias versiones de ECMAScript, cada una introduciendo nuevas características y mejoras al lenguaje.

Aquí hay algunos ejemplos de características introducidas en diferentes versiones de ECMAScript:

### ECMAScript 5 (ES5)
- **Métodos de array**: Introdujo métodos de array como `forEach()`, `map()`, `filter()` y `reduce()` para facilitar el trabajo con arreglos.
  ```javascript
  const numbers = [1, 2, 3, 4, 5];
  
  // Ejemplo de uso de map() para duplicar cada número
  const doubledNumbers = numbers.map(num => num * 2);
  console.log(doubledNumbers); // Output: [2, 4, 6, 8, 10]
  ```

- **Métodos de cadena**: Introdujo métodos como `trim()` para eliminar espacios en blanco de los extremos de una cadena.
  ```javascript
  const greeting = "   Hola, mundo!   ";
  const trimmedGreeting = greeting.trim();
  console.log(trimmedGreeting); // Output: "Hola, mundo!"
  ```

### ECMAScript 6 (ES6)
- **Declaración de variables con `let` y `const`**: Introdujo la declaración de variables `let` para variables mutables y `const` para variables inmutables.
  ```javascript
  let x = 10;
  x = 20; // Permitido con let
  
  const y = 100;
  // y = 200; // No permitido con const
  ```

- **Arrow functions**: Proporcionó una sintaxis más concisa para definir funciones.
  ```javascript
  const multiply = (a, b) => a * b;
  console.log(multiply(3, 4)); // Output: 12
  ```

### ECMAScript 2015 y posteriores (ES6+)
- **Desestructuración de objetos**: Permitió extraer valores de objetos y arreglos de manera más conveniente.
  ```javascript
  const person = { name: "John", age: 30 };
  const { name, age } = person;
  console.log(name, age); // Output: "John" 30
  ```

- **Clases**: Introdujo la sintaxis de clase para definir objetos.
  ```javascript
  class Rectangle {
    constructor(width, height) {
      this.width = width;
      this.height = height;
    }
    area() {
      return this.width * this.height;
    }
  }
  
  const rectangle = new Rectangle(5, 3);
  console.log(rectangle.area()); // Output: 15
  ```

Estos son solo algunos ejemplos de las numerosas características que han sido introducidas en diferentes versiones de ECMAScript. Cada versión agrega nuevas funcionalidades y mejoras para hacer que JavaScript sea más poderoso y fácil de usar.