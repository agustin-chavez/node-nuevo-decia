# node-with-express

Una API simple hecha con express.js

## Generador de aplicaciones Express

Utiliza la herramienta generadora de aplicaciones, express-generator, para crear rápidamente un esqueleto de aplicación.

```bash
npx express-generator
npm install
DEBUG=myapp:* npm start
```

Luego carga http://localhost:3000/ en tu navegador para acceder a la aplicación.

La aplicación generada tiene la siguiente estructura de directorios:

```bash
.
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.pug
    ├── index.pug
    └── layout.pug

7 directorios, 9 archivos
```

## Enrutamiento básico

El enrutamiento se refiere a determinar cómo responde una aplicación a una solicitud de cliente a un punto final particular, que es un URI (o ruta) y un método de solicitud HTTP específico (GET, POST, etc.).

Cada ruta puede tener una o más funciones controladoras, que se ejecutan cuando se coincide la ruta.

La definición de ruta tiene la siguiente estructura:

```javascript
app.METHOD(PATH, HANDLER);
```

Donde:

- app es una instancia de express.
- METHOD es un método de solicitud HTTP, en minúsculas.
- PATH es una ruta en el servidor.
- HANDLER es la función ejecutada cuando se coincide la ruta.
- Este tutorial asume que se ha creado una instancia de express llamada app y que el servidor está en funcionamiento. Si no estás familiarizado con la creación de una aplicación y su inicio, consulta el ejemplo de Hello world.

Los siguientes ejemplos ilustran la definición de rutas simples.

Responder con ¡Hola Mundo! en la página de inicio:

```javascript
app.get("/", (req, res) => {
  res.send("¡Hola Mundo!");
});
```

Responder a una solicitud POST en la ruta raíz (/), la página de inicio de la aplicación:

```javascript
app.post("/", (req, res) => {
  res.send("Se recibió una solicitud POST");
});
```

Responder a una solicitud PUT en la ruta /user:

```javascript
app.put("/user", (req, res) => {
  res.send("Se recibió una solicitud PUT en /user");
});
```

Responder a una solicitud DELETE en la ruta /user:

```javascript
app.delete("/user", (req, res) => {
  res.send("Se recibió una solicitud DELETE en /user");
});
```

## Servir archivos estáticos en Express

Para servir archivos estáticos como imágenes, archivos CSS y archivos JavaScript, utiliza la función de middleware integrada express.static en Express.

La firma de la función es:

```javascript
express.static(root, [opciones]);
```

El argumento root especifica el directorio raíz desde el cual servir los activos estáticos.

Por ejemplo, utiliza el siguiente código para servir imágenes, archivos CSS y archivos JavaScript en un directorio llamado public:

```javascript
app.use(express.static("public"));
```

Ahora puedes cargar los archivos que están en el directorio public:

http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html

Express busca los archivos relativos al directorio estático, por lo que el nombre del directorio estático no forma parte de la URL.
Para usar varios directorios de activos estáticos, llama a la función de middleware express.static varias veces:

```javascript
app.use(express.static("public"));
app.use(express.static("files"));
```

Express busca los archivos en el orden en que configuras los directorios estáticos con la función de middleware express.static.

NOTA: Para obtener mejores resultados, utiliza un caché de proxy inverso para mejorar el rendimiento de la entrega de activos estáticos.

### Reverse Proxy Cache

Un "reverse proxy cache" es un tipo de servidor que se coloca entre los clientes y tu servidor web principal. Su función principal es almacenar en caché (guardar temporalmente) el contenido que tu servidor web envía a los clientes. Cuando un cliente solicita un recurso (como una imagen, un archivo CSS o JavaScript) a tu servidor, el reverse proxy cache verifica si ya tiene una copia de ese recurso en su caché. Si lo tiene, lo entrega directamente al cliente sin tener que pasar la solicitud a tu servidor principal. Esto reduce la carga en tu servidor principal y acelera la entrega de contenido a los clientes.

Ahora, ¿por qué es recomendable usar un reverse proxy cache para mejorar el rendimiento al servir activos estáticos con Express.js? Bueno, Express.js es un framework web rápido y eficiente, pero cuando se trata de servir archivos estáticos (como imágenes, archivos CSS y JavaScript), puede no ser tan eficiente como un servidor especializado en almacenamiento en caché. Usar un reverse proxy cache puede ayudar a optimizar la entrega de estos archivos estáticos, reduciendo la carga en tu servidor Express.js y mejorando la velocidad de carga de tu sitio web en general.

Algunas opciones populares de reverse proxy cache incluyen Nginx y Varnish Cache. Puedes configurar uno de estos servidores como un proxy inverso delante de tu servidor Express.js para aprovechar sus capacidades de almacenamiento en caché y mejorar el rendimiento de tu aplicación web.

### Ruta virtual

Para crear un prefijo de ruta virtual (donde la ruta en realidad no existe en el sistema de archivos) para los archivos que son servidos por la función express.static, especifica una ruta de montaje para el directorio estático, como se muestra a continuación:

```javascript
app.use("/static", express.static("public"));
```

Ahora puedes cargar los archivos que están en el directorio public desde el prefijo de ruta /static.

http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html

Sin embargo, la ruta que proporcionas a la función express.static es relativa al directorio desde el que inicias tu proceso node. Si ejecutas la aplicación express desde otro directorio, es más seguro usar la ruta absoluta del directorio que deseas servir:

```javascript
const path = require("path");
app.use("/static", express.static(path.join(__dirname, "public")));
```
