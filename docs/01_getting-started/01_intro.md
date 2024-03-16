# Introducción a Node.js

Node.js es un entorno de ejecución de JavaScript de código abierto y multiplataforma. ¡Es una herramienta popular para casi cualquier tipo de proyecto!

Node.js ejecuta el motor JavaScript V8, el núcleo de Google Chrome, fuera del navegador. Esto permite que Node.js tenga un rendimiento muy alto.

Una aplicación de Node.js se ejecuta en un solo proceso, sin crear un nuevo hilo para cada solicitud. Node.js proporciona un conjunto de primitivas de E/S asincrónicas en su biblioteca estándar que evitan que el código JavaScript se bloquee y, en general, las bibliotecas en Node.js están escritas utilizando paradigmas no bloqueantes, haciendo que el comportamiento de bloqueo sea la excepción en lugar de la norma.

Cuando Node.js realiza una operación de E/S, como leer desde la red, acceder a una base de datos o al sistema de archivos, en lugar de bloquear el hilo y desperdiciar ciclos de CPU esperando, Node.js reanudará las operaciones cuando llegue la respuesta.

Esto permite que Node.js maneje miles de conexiones concurrentes con un solo servidor sin introducir la carga de gestionar la concurrencia de hilos, lo que podría ser una fuente significativa de errores.

Node.js tiene una ventaja única porque millones de desarrolladores frontend que escriben JavaScript para el navegador ahora pueden escribir el código del lado del servidor además del código del lado del cliente sin necesidad de aprender un lenguaje completamente diferente.

En Node.js, se pueden utilizar sin problemas los nuevos estándares ECMAScript, ya que no tienes que esperar a que todos tus usuarios actualicen sus navegadores: tú decides qué versión de ECMAScript utilizar cambiando la versión de Node.js, y también puedes habilitar funciones experimentales específicas ejecutando Node.js con banderas.

## Un Ejemplo de Aplicación Node.js
El ejemplo más común de Hello World en Node.js es un servidor web:

```javascript
const http = require('node:http');
const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});
server.listen(port, hostname, () => {
  console.log(`Servidor ejecutándose en http://${hostname}:${port}/`);
});
```

Para ejecutar este fragmento, guárdalo como un archivo server.js y ejecuta node server.js en tu terminal.

Este código primero incluye el módulo http de Node.js.

Node.js tiene una biblioteca estándar fantástica, que incluye soporte de primera clase para redes.

El método createServer() de http crea un nuevo servidor HTTP y lo devuelve.

El servidor está configurado para escuchar en el puerto y el nombre de host especificados. Cuando el servidor está listo, se llama a la función de devolución de llamada, en este caso informándonos que el servidor está en funcionamiento.

Cada vez que se recibe una nueva solicitud, se llama al evento request, proporcionando dos objetos: una solicitud (un objeto http.IncomingMessage) y una respuesta (un objeto http.ServerResponse).

Estos dos objetos son esenciales para manejar la llamada HTTP.

El primero proporciona los detalles de la solicitud. En este ejemplo simple, esto no se utiliza, pero podrías acceder a los encabezados de la solicitud y a los datos de la solicitud.

El segundo se utiliza para devolver datos al llamador.

En este caso con:

```javascript
res.statusCode = 200;
```

establecemos la propiedad statusCode en 200, para indicar una respuesta exitosa.

Configuramos el encabezado Content-Type:

```javascript
res.setHeader('Content-Type', 'text/plain');
```

y cerramos la respuesta, agregando el contenido como argumento de end():

```javascript
res.end('Hello World\n');
```

Más Ejemplos
Consulta https://github.com/nodejs/examples para obtener una lista de ejemplos de Node.js que van más allá de hello world.