## Node.js: Diferencias entre desarrollo y producción

Puedes tener diferentes configuraciones para los entornos de producción y desarrollo.

Node.js asume que siempre se está ejecutando en un entorno de desarrollo. Puedes indicarle a Node.js que se está ejecutando en producción estableciendo la variable de entorno NODE_ENV=production.

Esto se hace generalmente ejecutando el comando

```bash
export NODE_ENV=production
```

en la terminal, pero es mejor colocarlo en el archivo de configuración de tu shell (por ejemplo, .bash_profile con el shell Bash) porque de lo contrario el ajuste no persistirá en caso de reinicio del sistema.

También puedes aplicar la variable de entorno agregándola al comando de inicialización de tu aplicación:

```bash
NODE_ENV=production node app.js
```

Esta variable de entorno es una convención que se utiliza ampliamente también en bibliotecas externas.

Establecer el entorno en producción generalmente garantiza que

- el registro se mantenga al mínimo, en un nivel esencial
- se realicen más niveles de almacenamiento en caché para optimizar el rendimiento

Por ejemplo, Pug, la biblioteca de plantillas utilizada por Express, compila en modo de depuración si NODE_ENV no está configurado en producción. Las vistas de Express se compilan en cada solicitud en modo de desarrollo, mientras que en producción se almacenan en caché. Hay muchos más ejemplos.

Puedes usar declaraciones condicionales para ejecutar código en diferentes entornos:

```javascript
if (process.env.NODE_ENV === 'development') {
  // ...
}
if (process.env.NODE_ENV === 'production') {
  // ...
}
if (['production', 'staging'].includes(process.env.NODE_ENV)) {
  // ...
}
```

Por ejemplo, en una aplicación Express, puedes usar esto para establecer diferentes manejadores de errores por entorno:

```javascript
if (process.env.NODE_ENV === 'development') {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}
if (process.env.NODE_ENV === 'production') {
  app.use(express.errorHandler());
}
```

## Notas personales

### Express.js

Express.js es un marco de aplicación web rápido, minimalista y flexible para Node.js. Con Express, podés crear aplicaciones web y APIs de manera sencilla y rápida.

Con Express, podés manejar fácilmente las rutas de tu aplicación y definir cómo responder a las solicitudes HTTP. Además, ofrece una variedad de funciones útiles para el manejo de cookies, sesiones, y la creación de middleware para personalizar el comportamiento de tu aplicación.

Utilizando Express, podés desarrollar aplicaciones web complejas de manera eficiente, gracias a su estructura organizada y su amplia comunidad de desarrolladores que ofrecen una gran cantidad de paquetes y recursos útiles.

Si estás buscando una forma rápida y poderosa de construir aplicaciones web con Node.js, Express es una excelente opción. 

```javascript
// Importar el módulo de Express
const express = require('express');

// Crear una instancia de la aplicación Express
const app = express();

// Definir una ruta básica
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

// Escuchar en el puerto 3000
app.listen(3000, () => {
  console.log('Server listening in port 3000...');
});
```

Este código crea un servidor Express que responde con "¡Hola, mundo!" cuando se accede a la raíz del sitio (http://localhost:3000). Puedes construir sobre este ejemplo para crear aplicaciones más complejas añadiendo más rutas, middleware y lógica de negocio según sea necesario.


