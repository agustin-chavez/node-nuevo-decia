## Introducción

Nest (NestJS) es un framework para construir aplicaciones eficientes y escalables del lado del servidor en Node.js. Utiliza JavaScript progresivo, está construido con y completamente compatible con TypeScript (aunque aún permite a los desarrolladores codificar en JavaScript puro) y combina elementos de POO (Programación Orientada a Objetos), PF (Programación Funcional) y PFR (Programación Funcional Reactiva).

Bajo el capó, Nest hace uso de marcos robustos de servidor HTTP como Express (el predeterminado) y opcionalmente se puede configurar para usar también Fastify.

Nest proporciona un nivel de abstracción por encima de estos marcos comunes de Node.js (Express/Fastify), pero también expone sus APIs directamente al desarrollador. Esto le da a los desarrolladores la libertad de utilizar la miríada de módulos de terceros que están disponibles para la plataforma subyacente.

## Filosofía

En los últimos años, gracias a Node.js, JavaScript se ha convertido en la "lengua franca" de la web tanto para aplicaciones frontend como backend. Esto ha dado lugar a proyectos impresionantes como Angular, React y Vue, que mejoran la productividad del desarrollador y permiten la creación de aplicaciones frontend rápidas, testables y extensibles. Sin embargo, aunque existen muchas bibliotecas, helpers y herramientas excelentes para Node (y JavaScript del lado del servidor), ninguna de ellas resuelve eficazmente el problema principal de - Arquitectura.

Nest proporciona una arquitectura de aplicación lista para usar que permite a los desarrolladores y equipos crear aplicaciones altamente testables, escalables, débilmente acopladas y fácilmente mantenibles. La arquitectura está fuertemente inspirada en Angular.

## Instalación

Para comenzar, podés esquematizar el proyecto con el CLI de Nest o clonar un proyecto de inicio (ambos producirán el mismo resultado).

Para esquematizar el proyecto con el CLI de Nest, ejecutá los siguientes comandos. Esto creará un nuevo directorio de proyecto y lo poblará con los archivos principales iniciales de Nest y los módulos de soporte, creando una estructura base convencional para tu proyecto. La creación de un nuevo proyecto con el CLI de Nest se recomienda para usuarios primerizos. Continuaremos con este enfoque en Primeros Pasos.

```bash
npm i -g @nestjs/cli
nest new project-name
```

To create a new TypeScript project with stricter feature set, pass the --strict flag to the nest new command.

Open your browser and navigate to http://localhost:3000/.

You can also manually create a new project from scratch by installing the core and supporting files with npm (or yarn). In this case, of course, you'll be responsible for creating the project boilerplate files yourself.


```bash
npm i --save @nestjs/core @nestjs/common rxjs reflect-metadata
```