# express-crud-products

🐸 RESTful API of products with Node.js and Express.js

1. Install express and mongoose with yarn (yarn is faster than npm)

```bash
npm i -g yarn
yarn add express mongoose
```

Mongoose es un ODM (Object Document Mapper) y nos va a servir para hacer nuestra conexión a mongo mucho mas facil.

---

# Introducción a MongoDB

## ¿Qué es MongoDB?

MongoDB es una base de datos NoSQL (No solamente SQL) orientada a documentos. En lugar de utilizar tablas y filas como en las bases de datos relacionales tradicionales, MongoDB almacena datos en documentos similares a JSON con un esquema flexible. Esto hace que sea especialmente adecuado para aplicaciones web modernas y otros casos de uso donde los datos pueden ser heterogéneos o cambiantes con el tiempo.

## Características principales

- **Modelo de datos flexible:** MongoDB no requiere que los documentos tengan una estructura uniforme, lo que permite almacenar datos con esquemas diferentes en la misma colección.

- **Escalabilidad horizontal:** MongoDB se escala horizontalmente de manera eficiente a través de la fragmentación o "sharding", lo que permite manejar grandes volúmenes de datos y cargas de trabajo distribuidas.

- **Índices:** Permite la creación de índices para mejorar el rendimiento de las consultas y facilitar la búsqueda de datos.

- **Consultas potentes:** MongoDB proporciona una amplia gama de operadores y funciones de consulta para realizar consultas complejas y eficientes.

- **Aggregation Framework:** Incluye un poderoso framework de agregación que permite realizar operaciones de agregación, transformación y análisis de datos en la base de datos.

## Instalación

Puedes descargar e instalar MongoDB con `brew install mongodb` o desde el [sitio web oficial de MongoDB](https://www.mongodb.com/try/download/community). También hay versiones disponibles para diversas plataformas y sistemas operativos. Puedes usar Atlas para una base de datos en la nube. Puedes usar Compass para ver tus bases de datos y tablas con la GUI de mongodb

Usando docker:

```bash
docker pull mongodb/mongodb-community-server
docker run --name mongo -d mongodb/mongodb-community-server:latest
docker container ls
docker exec -it mongo mongosh
```

## Uso básico

Aquí hay un ejemplo básico de cómo trabajar con MongoDB utilizando la interfaz de línea de comandos (CLI):

1. **Iniciar el servidor MongoDB:**

```bash
mongosh
```

2. **Ver las dbs:**

```bash
show dbs
```

3. **Crear una nueva base de datos y colección**

```bash
use school
db.createCollection("students")
show dbs
```

4. **Insertar un documento en la colección:**

```bash
db.mycollection.insertOne({ name: "John", age: 17 })
```

5. **Consultar documentos en la colección:**

```bash
db.mycollection.find()
```

6. **Borrar la base de datos creada**
```bash
db.dropDatabase("school")
show dbs
```

---

# Introducción a Mongoose 👖

## ¿Qué es Mongoose?

Mongoose es una biblioteca de modelado de objetos de MongoDB para Node.js. Proporciona una solución sencilla y basada en esquemas para modelar los datos de la aplicación. 

## Características principales

- **Modelado de datos estructurados:** Mongoose permite definir esquemas para los datos, lo que facilita el modelado de datos estructurados en MongoDB.
  
- **Validación integrada:** Proporciona un mecanismo de validación incorporado que permite definir reglas de validación para los campos de los documentos.
  
- **Middleware:** Permite definir funciones de middleware para realizar acciones antes o después de ciertos eventos, como la validación, la eliminación o la actualización de documentos.
  
- **Consultas sencillas:** Ofrece una API fácil de usar para realizar consultas a la base de datos, utilizando métodos encadenados que facilitan la construcción de consultas complejas.

## Instalación

Puedes instalar Mongoose a través de npm con el siguiente comando:

```bash
npm install mongoose
```

## Uso básico

Aquí hay un ejemplo básico de cómo utilizar Mongoose para definir un esquema y crear un modelo:

```javascript
const mongoose = require('mongoose');

// Definir un esquema
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: String,
  email: { type: String, required: true },
  age: Number
});

// Crear un modelo basado en el esquema
const User = mongoose.model('User', userSchema);

// Crear un nuevo documento
const newUser = new User({
  name: 'John Doe',
  email: 'john@example.com',
  age: 30
});

// Guardar el documento en la base de datos
newUser.save()
  .then(() => console.log('Usuario guardado correctamente'))
  .catch(err => console.error('Error al guardar el usuario:', err));
```

¡Esto es solo una introducción a Mongoose! Hay muchas más características y funcionalidades que puedes explorar para trabajar de manera más eficiente con MongoDB en Node.js.

---


# Introducción al Sharding

El sharding es una técnica utilizada en bases de datos distribuidas para mejorar la escalabilidad horizontal y la capacidad de manejar grandes volúmenes de datos. Consiste en dividir los datos en múltiples fragmentos, llamados "shards", y distribuirlos entre varios servidores o nodos. Cada shard contiene una parte de los datos totales, lo que permite distribuir la carga de trabajo y mejorar el rendimiento de las consultas.

## Funcionamiento del Sharding

En MongoDB, el sharding se implementa mediante la distribución de los datos entre varios servidores o nodos, llamados "shards". MongoDB utiliza un enfoque basado en rangos o hash para distribuir los datos entre los shards. Por ejemplo, en un conjunto de datos con información de usuarios, se podría utilizar el campo "apellido" como clave de sharding. Cada shard contendría un rango de apellidos, como A-M en un shard y N-Z en otro. De esta manera, las consultas pueden ser distribuidas entre los shards según el valor de la clave de sharding, lo que permite un procesamiento paralelo y una mejor escalabilidad.

## Ejemplo de Sharding en MongoDB

Supongamos que tenemos una colección de registros de transacciones financieras en MongoDB y queremos mejorar su escalabilidad. Podemos habilitar el sharding en la base de datos y elegir un campo relevante, como "fecha", como clave de sharding. MongoDB distribuirá automáticamente los datos entre varios shards, dividiendo las transacciones en fragmentos basados en la fecha. Por ejemplo, un shard podría contener transacciones de enero a junio, mientras que otro shard podría contener transacciones de julio a diciembre. De esta manera, MongoDB puede manejar un gran volumen de transacciones distribuidas de manera eficiente y escalable.

---

# Importar y Exportar en Javascript

En JavaScript, hay varias formas de importar y exportar módulos, que han evolucionado a lo largo del tiempo con las diferentes versiones de ECMAScript. Aquí hay un resumen de las diferencias entre los modos de importación más comunes:

### 1. Importación de CommonJS (require/exports)

- **Require:** En CommonJS, se utiliza la palabra clave `require` para importar módulos. Por ejemplo: `const modulo = require('./modulo')`.
  
- **Exports:** Para exportar desde un módulo CommonJS, se asignan valores al objeto `module.exports` o se pueden agregar propiedades al objeto `exports`. Por ejemplo: `module.exports = { ... }` o `exports.funcion = () => { ... }`.

### 2. Importación de ECMAScript (ES6+) (import/export)

- **Import:** En ECMAScript, se utiliza la palabra clave `import` para importar módulos. Por ejemplo: `import modulo from './modulo'` o `import { funcion } from './modulo'`.
  
- **Export:** Para exportar desde un módulo ECMAScript, se utiliza la palabra clave `export` antes de la declaración de la variable, función, clase, etc., que se desea exportar. Por ejemplo: `export const nombre = 'John'` o `export function saludar() { ... }`.

### Diferencias clave:

- **Compatibilidad:** CommonJS es compatible con versiones anteriores y se utiliza principalmente en entornos de servidor como Node.js. Por otro lado, la importación y exportación de ECMAScript es el estándar moderno y se utiliza tanto en el lado del cliente como en el del servidor con herramientas como Webpack o Babel.
  
- **Síncrono vs Asíncrono:** Las importaciones en CommonJS son síncronas, lo que significa que el código se ejecuta secuencialmente. Mientras que las importaciones de ECMAScript pueden ser síncronas o asíncronas, lo que permite cargar módulos bajo demanda o de manera diferida.

- **Estático vs Dinámico:** Las importaciones de ECMAScript son estáticas, lo que significa que los módulos se importan antes de que se ejecute el código. En CommonJS, las importaciones son dinámicas, lo que permite importar módulos dentro de funciones o condicionales.

En resumen, CommonJS es más adecuado para entornos de servidor y proyectos existentes, mientras que la importación y exportación de ECMAScript es el estándar moderno preferido para aplicaciones web y proyectos nuevos.