# express-crud-workouts
🐸 RESTful API of workouts with Node.js and Express.js

En nuestra aplicación nos gustaría crear, leer, actualizar y eliminar WOD's (Workouts of the Day).
Esto ayudará a nuestros usuarios (que serán propietarios de gimnasios) a crear planes de entrenamiento
y mantener sus propios entrenamientos dentro de una sola aplicación. 
Además, también podrán agregar algunos consejos de entrenamiento importantes para cada sesión de entrenamiento.

💡 [Manual de mejores prácticas para el diseño de API REST de freeCodeCamp](https://www.freecodecamp.org/news/rest-api-design-best-practices-build-a-rest-api/)

## Arquitectura de 3 capas (3 Layer Architecture)

![Architecture](https://www.freecodecamp.org/news/content/images/2022/04/Bildschirmfoto-2022-04-25-um-14.33.24-1.png)

Dentro del *Controlador* estaremos manejando todo lo relacionado con HTTP. 
Esto significa que estamos trabajando con requests y responses para nuestros endpoints. 
Además de esa capa, también hay un pequeño *Router* de Express que pasa las solicitudes al controlador correspondiente.

Toda la lógica del negocio estará en la *Capa de Servicio* que exporta ciertos servicios (métodos) que son utilizados por el controlador.

La tercera capa es la *Capa de Acceso a Datos* donde estaremos trabajando con nuestra Base de Datos. Exportaremos algunos métodos para ciertas operaciones 
de base de datos como crear un workout que pueda ser utilizado por nuestra Capa de Servicio.


## Arquitectura Dirigida por el Dominio (DDD)

DDD es un enfoque de diseño de software que se centra en comprender profundamente el dominio del 
problema y reflejar esa comprensión en la estructura del código.

Se basa en la colaboración cercana entre expertos en el dominio del problema y desarrolladores 
de software para crear un modelo de dominio compartido.

DDD divide el sistema en diferentes contextos del dominio, utilizando conceptos como Entidades, 
Agregados, Servicios de Dominio y Eventos del Dominio para modelar y gestionar la complejidad del negocio.

Promueve un lenguaje ubicuo, que es un vocabulario común entre los equipos técnicos y de dominio, para una comunicación
clara y una comprensión compartida del sistema.


## Arquitectura Hexagonal** (también conocida como Puertos y Adaptadores)

La arquitectura hexagonal se enfoca en desacoplar la lógica del negocio de los detalles de implementación y las tecnologías externas.
El núcleo de la aplicación, que contiene la lógica de negocio, se encuentra en el centro de la arquitectura, mientras que los puertos representan las interfaces a través de las cuales se comunican los componentes con el exterior.
Los adaptadores se utilizan para conectar los puertos del núcleo con las tecnologías externas, como bases de datos, interfaces de usuario, servicios web, etc.
Esta arquitectura facilita la prueba unitaria, la sustitución de componentes y el mantenimiento del sistema, ya que los componentes internos están desacoplados de las implementaciones externas.


## Arquitectura CLEAN

CLEAN (Capas, Independiente de Frameworks, Principios sólidos, Independiente de tecnología, Independiente de la interfaz de usuario y Testeable) es un conjunto de principios que guían la arquitectura de software hacia una mayor modularidad, reutilización y mantenibilidad.
Se basa en dividir el sistema en capas lógicas, como la capa de presentación, la capa de aplicación y la capa de dominio, con cada capa enfocándose en una responsabilidad específica.
CLEAN promueve la independencia de frameworks y tecnologías externas, lo que facilita la migración y el cambio de tecnología en el futuro.
Además, fomenta el uso de principios de diseño sólidos (SOLID) y el desarrollo orientado a pruebas (TDD) para crear un código limpio y mantenible.

## Conclusión

Estas arquitecturas proporcionan diferentes enfoques para abordar la complejidad del diseño de software, cada una con sus propias ventajas y desafíos. 
La elección de la arquitectura depende de los requisitos del proyecto, la experiencia del equipo y los objetivos a largo plazo del desarrollo del software.


## Creando el Proyecto

```bash
npm init -y
npm i -D nodemon
npm i express mongoose
```

### Agregar los scripts de desarrollo y start al package.json

```json
{
   "scripts": {
      "dev": "nodemon src/index.js",
      "start": "node src/index.js"
   }
}
```

### Run

```bash
npm run dev
```
