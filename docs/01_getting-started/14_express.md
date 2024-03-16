## Guía de uso de Express.js

**Introducción**

Express.js es un framework de aplicaciones web minimalista y flexible para Node.js. Proporciona un conjunto sólido de características para crear aplicaciones web y móviles robustas y escalables.

**Instalación**

Para comenzar con Express.js, necesitas instalarlo usando npm (Node Package Manager):

```
npm install express
```

**Creando una aplicación básica**

```javascript
const express = require('express');
const app = express();

// Define una ruta GET
app.get('/', (req, res) => {
  res.send('¡Hola mundo!');
});

// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Server running in port 3000...');
});
```

**Enrutamiento**

Express.js te permite definir diferentes rutas para tu aplicación. Cada ruta puede tener un método HTTP asociado (GET, POST, PUT, DELETE, etc.) y una función que se ejecutará cuando se reciba una solicitud a esa ruta.

**Ejemplo:**

```javascript
app.get('/usuarios', (req, res) => {
  // Obtiene todos los usuarios de la base de datos
  const usuarios = ...;

  // Envía los usuarios como respuesta
  res.json(usuarios);
});

app.post('/usuarios', (req, res) => {
  // Crea un nuevo usuario a partir del cuerpo de la solicitud
  const usuario = ...;

  // Guarda el usuario en la base de datos
  ...;

  // Envía el usuario creado como respuesta
  res.json(usuario);
});
```

**Middleware**

El middleware es una función que se ejecuta antes de que se invoque la función de una ruta. Se puede usar para realizar tareas comunes como:

* Registrar solicitudes
* Validar la autenticación
* Analizar el cuerpo de la solicitud
* Servir archivos estáticos

**Ejemplo:**

```javascript
// Middleware para registrar solicitudes
app.use((req, res, next) => {
  console.log(`Solicitud recibida: ${req.method} ${req.url}`);
  next();
});

// Middleware para validar la autenticación
app.use('/usuarios', (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send('No autorizado');
  }

  next();
});
```

**Motores de plantilla**

Express.js no incluye un motor de plantilla por defecto, pero puedes usar uno de terceros como Pug, EJS o Handlebars.

**Ejemplo con Pug:**

```javascript
app.set('view engine', 'pug');

app.get('/usuarios', (req, res) => {
  // Obtiene todos los usuarios de la base de datos
  const usuarios = ...;

  // Renderiza la vista 'usuarios' con los usuarios como contexto
  res.render('usuarios', { usuarios });
});
```
