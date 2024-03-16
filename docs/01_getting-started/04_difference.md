# Diferencias entre Node.js y el Navegador

Tanto el navegador como Node.js utilizan JavaScript como su lenguaje de programación. Construir aplicaciones que se ejecuten en el navegador es completamente diferente a construir una aplicación de Node.js. A pesar de que siempre es JavaScript, hay algunas diferencias clave que hacen que la experiencia sea radicalmente diferente.

Desde la perspectiva de un desarrollador frontend que utiliza extensamente JavaScript, las aplicaciones de Node.js tienen una gran ventaja: la comodidad de programar todo, tanto el frontend como el backend, en un solo lenguaje.

Tienes una gran oportunidad porque sabemos lo difícil que es aprender completamente un lenguaje de programación, y al usar el mismo lenguaje para realizar todo tu trabajo en la web, tanto en el cliente como en el servidor, estás en una posición única de ventaja.

## Lo que cambia es el ecosistema.

En el navegador, la mayor parte del tiempo lo que estás haciendo es interactuar con el DOM, u otras API de la Plataforma Web como las Cookies. Esas no existen en Node.js, por supuesto. No tienes el documento, la ventana y todos los demás objetos que proporciona el navegador.

Y en el navegador, no tenemos todas las buenas APIs que Node.js proporciona a través de sus módulos, como la funcionalidad de acceso al sistema de archivos.

Otra gran diferencia es que en Node.js controlas el entorno. A menos que estés construyendo una aplicación de código abierto que cualquiera pueda implementar en cualquier lugar, sabes en qué versión de Node.js ejecutarás la aplicación. En comparación con el entorno del navegador, donde no tienes el lujo de elegir qué navegador usarán tus visitantes, esto es muy conveniente.

Esto significa que puedes escribir todo el JavaScript moderno ES2015+ que admita tu versión de Node.js. Dado que JavaScript avanza tan rápido, pero los navegadores pueden ser un poco lentos para actualizarse, a veces en la web te quedas usando versiones antiguas de JavaScript / ECMAScript. Puedes usar Babel para transformar tu código para que sea compatible con ES5 antes de enviarlo al navegador, pero en Node.js, no necesitarás eso.

Otra diferencia es que Node.js admite tanto los sistemas de módulos CommonJS como ES (desde Node.js v12), mientras que en el navegador comenzamos a ver la implementación del estándar de Módulos ES.

En la práctica, esto significa que puedes usar tanto require() como import en Node.js, mientras que estás limitado a import en el navegador.