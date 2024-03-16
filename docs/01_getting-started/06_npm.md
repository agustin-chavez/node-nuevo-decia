# Introducción al gestor de paquetes npm

## Introducción a npm

npm es el gestor de paquetes estándar para Node.js.

En septiembre de 2022 se informó que había más de 2.1 millones de paquetes listados en el registro de npm, convirtiéndolo en el repositorio de código de un solo lenguaje más grande de la Tierra, ¡y puedes estar seguro de que hay un paquete para (¡casi!) todo.

Comenzó como una forma de descargar y gestionar las dependencias de los paquetes de Node.js, pero desde entonces también se ha convertido en una herramienta utilizada en el JavaScript del frontend.

Yarn y pnpm son alternativas a la línea de comandos de npm. También puedes echarles un vistazo.

## Paquetes

npm gestiona la descarga de las dependencias de tu proyecto.

### Instalación de todas las dependencias

Si un proyecto tiene un archivo package.json, al ejecutar

```bash
npm install
```

instalará todo lo que el proyecto necesita, en la carpeta node_modules, creándola si aún no existe.

### Instalación de un solo paquete

También puedes instalar un paquete específico ejecutando

```bash
npm install <nombre-del-paquete>
```

Además, desde npm 5, este comando agrega <nombre-del-paquete> a las dependencias del archivo package.json. Antes de la versión 5, necesitabas agregar la bandera --save.

A menudo verás más banderas añadidas a este comando:

- --save-dev instala y agrega la entrada a las devDependencies del archivo package.json
- --no-save instala pero no agrega la entrada a las dependencias del archivo package.json
- --save-optional instala y agrega la entrada a las optionalDependencies del archivo package.json
- --no-optional evitará que se instalen las dependencias opcionales

También se pueden usar abreviaturas de las banderas:

- -S: --save
- -D: --save-dev
- -O: --save-optional

La diferencia entre devDependencies y dependencies es que el primero contiene herramientas de desarrollo, como una biblioteca de pruebas, mientras que el segundo se incluye en la aplicación en producción.

En cuanto a las optionalDependencies, la diferencia es que el fallo en la compilación de la dependencia no provocará que la instalación falle. Pero es responsabilidad de tu programa manejar la falta de la dependencia.

### Actualización de paquetes

La actualización también se realiza fácilmente, ejecutando

```bash
npm update
```

npm revisará todos los paquetes en busca de una versión más nueva que satisfaga tus restricciones de versiones.

También puedes especificar un solo paquete para actualizar:

```bash
npm update <nombre-del-paquete>
```

### Versionado

Además de las descargas simples, npm también gestiona el versionado, para que puedas especificar cualquier versión específica de un paquete o requerir una versión más alta o más baja de la que necesitas.

Muchas veces encontrarás que una biblioteca es compatible solo con una versión principal de otra biblioteca.

O un error en la última versión de una librería, aún no corregido, está causando un problema.

Especificar una versión explícita de una biblioteca también ayuda a mantener a todos en la misma versión exacta de un paquete, para que todo el equipo ejecute la misma versión hasta que se actualice el archivo package.json.

En todos esos casos, el versionado ayuda mucho, y npm sigue el estándar de versionado semántico (semver).

Puedes instalar una versión específica de un paquete, ejecutando

```bash
npm install <nombre-del-paquete>@<versión>
```

### Ejecución de tareas

El archivo package.json admite un formato para especificar tareas de línea de comandos que pueden ser ejecutadas usando

```bash
npm run <nombre-de-la-tarea>
```

Por ejemplo:

```json
{
  "scripts": {
    "start-dev": "node lib/server-development",
    "start": "node lib/server-production"
  }
}
```

Es muy común usar esta característica para ejecutar Webpack:

```json
{
  "scripts": {
    "watch": "webpack --watch --progress --colors --config webpack.conf.js",
    "dev": "webpack --progress --colors --config webpack.conf.js",
    "prod": "NODE_ENV=production webpack -p --config webpack.conf.js"
  }
}
```

Entonces, en lugar de escribir esos comandos largos, que son fáciles de olvidar o escribir incorrectamente, puedes ejecutar

```bash
$ npm run watch
$ npm run dev
$ npm run prod
```

# Una par de notas personales

## Yarn y pnpm vs npm

### Yarn

**Yarn** es un administrador de paquetes alternativo a npm que se lanzó en 2016 por Facebook. Fue creado para abordar algunas deficiencias percibidas en npm, como la falta de determinismo en la instalación de paquetes y la velocidad de instalación. Yarn utiliza un algoritmo de resolución de dependencias más avanzado que npm, lo que garantiza una instalación más rápida y predecible de los paquetes. Además, Yarn almacena los paquetes descargados en caché, lo que permite una instalación más rápida de los mismos paquetes en proyectos futuros.

### pnpm

**pnpm** es otro administrador de paquetes alternativo a npm, que se lanzó en 2016. A diferencia de npm y Yarn, pnpm utiliza un enfoque de instalación de paquetes llamado "linking" (enlace). En lugar de copiar los archivos de los paquetes en cada proyecto, pnpm crea enlaces simbólicos a los archivos de los paquetes en un repositorio global compartido. Esto significa que, en lugar de tener múltiples copias de los mismos paquetes en diferentes proyectos, pnpm crea una única instancia de cada paquete y la comparte entre los proyectos. Esto ahorra espacio en disco y permite una instalación más rápida de paquetes.

### Comparación con npm

- **Velocidad**: Tanto Yarn como pnpm se promocionan por su velocidad de instalación y resolución de dependencias en comparación con npm. Ambos utilizan estrategias más eficientes para instalar y gestionar paquetes, lo que puede resultar en tiempos de instalación más cortos y una experiencia más fluida para los desarrolladores.
  
- **Determinismo**: Yarn y pnpm también se destacan por ofrecer una instalación más determinista de paquetes en comparación con npm. Esto significa que las mismas dependencias se instalarán de la misma manera en diferentes máquinas y entornos, lo que reduce la posibilidad de errores y problemas de compatibilidad.

- **Características adicionales**: Tanto Yarn como pnpm ofrecen características adicionales en comparación con npm, como el almacenamiento en caché de paquetes para instalaciones más rápidas (Yarn), y el enlace de paquetes para un uso más eficiente del espacio en disco (pnpm).

En resumen, Yarn y pnpm son alternativas populares a npm que ofrecen mejoras en velocidad, determinismo y otras características para el manejo de paquetes en proyectos de JavaScript. La elección entre ellos dependerá de las necesidades específicas del proyecto y las preferencias del equipo de desarrollo.


## SemVer

La especificación SemVer (Semantic Versioning) es un estándar utilizado en el desarrollo de software para asignar versiones a los paquetes y bibliotecas de manera coherente y comprensible. Se compone de tres números separados por puntos (por ejemplo, X.Y.Z), donde el primer número indica cambios mayores que pueden romper la compatibilidad hacia atrás, el segundo número representa nuevas funcionalidades compatibles con versiones anteriores, y el tercer número indica correcciones de errores y parches que mantienen la compatibilidad. Esta convención permite a los desarrolladores entender rápidamente el impacto de una actualización de versión y gestionar las dependencias de manera efectiva.



## Webpack

Webpack es una herramienta de construcción (build tool) ampliamente utilizada en el desarrollo web moderno. Su principal función es la de empacar (bundle) y transformar los diferentes módulos y recursos de un proyecto web en un formato adecuado para su implementación en producción.

### Características Principales:

- **Empaquetamiento de Módulos**: Webpack permite la creación de un único archivo JavaScript que contiene todos los módulos y dependencias de un proyecto, lo que facilita la gestión y la carga de recursos en el navegador.

- **Configuración Basada en Archivo**: Webpack utiliza un archivo de configuración (por lo general denominado `webpack.config.js`) para definir las opciones y los comportamientos del proceso de construcción. Esto permite una personalización completa de la configuración de Webpack según las necesidades del proyecto.

- **Soporte para Diferentes Tipos de Archivos**: Además de JavaScript, Webpack puede manejar y transformar una variedad de otros tipos de archivos, como CSS, imágenes, fuentes, y más. Esto se logra mediante el uso de loaders, que son módulos que permiten a Webpack comprender y procesar diferentes tipos de archivos.

- **Optimización y Minificación**: Webpack incluye características para optimizar y minimizar los recursos de un proyecto, lo que puede mejorar significativamente el rendimiento y la velocidad de carga de una aplicación web.

- **Soporte para Entornos de Desarrollo y Producción**: Webpack ofrece opciones para configurar diferentes comportamientos dependiendo del entorno de desarrollo o producción en el que se ejecute, permitiendo la aplicación de optimizaciones específicas para cada caso.

### Uso Básico:

1. **Instalación**: Primero, debes instalar Webpack y sus dependencias en tu proyecto utilizando npm o yarn:

    ```bash
    npm install webpack webpack-cli --save-dev
    ```

2. **Configuración**: Luego, crea un archivo de configuración `webpack.config.js` en la raíz de tu proyecto y define la configuración deseada.

3. **Empaquetamiento**: Ejecuta el comando `webpack` en la terminal para iniciar el proceso de empaquetamiento según la configuración especificada.

4. **Integración con Scripts de npm**: Puedes agregar scripts personalizados en el archivo `package.json` para ejecutar comandos de Webpack de forma más conveniente, como `npm run build` para construir tu proyecto.

Este es solo un resumen básico de las capacidades y el uso de Webpack. A medida que explores más a fondo esta herramienta, descubrirás una amplia gama de características y funcionalidades avanzadas que pueden mejorar tu flujo de trabajo de desarrollo web.


