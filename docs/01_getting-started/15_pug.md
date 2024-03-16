### Introducción a Pug

Pug, anteriormente conocido como Jade, es un motor de plantillas HTML de alto rendimiento utilizado principalmente en entornos de desarrollo web, especialmente con Node.js. Su sintaxis simplificada y su enfoque en la legibilidad hacen que sea una opción popular entre los desarrolladores para generar contenido HTML dinámico de manera eficiente.

#### Características principales:

1. **Sintaxis concisa:** Pug utiliza una sintaxis de indentación significativa que elimina la necesidad de etiquetas de cierre y paréntesis, lo que resulta en un código más limpio y fácil de leer.

2. **Interpolación de datos:** Permite la interpolación de datos dinámicos directamente en las plantillas, lo que facilita la generación de contenido dinámico basado en variables o datos recuperados de una base de datos u otra fuente.

3. **Reutilización de componentes:** Facilita la reutilización de componentes HTML mediante la inclusión de archivos parciales, lo que ayuda a mantener un código más organizado y modular.

4. **Funciones JavaScript:** Pug admite la integración de funciones JavaScript directamente en las plantillas, lo que permite la lógica de programación dentro del marcado HTML.

#### Uso con Node.js:

Pug se integra perfectamente con entornos de Node.js y es compatible con muchos frameworks web populares, como Express.js. Los desarrolladores pueden utilizar Pug para generar vistas dinámicas en aplicaciones web, gestionar la presentación de datos y estructurar la interfaz de usuario de manera eficiente.

#### Instalación:

Para utilizar Pug en un proyecto Node.js, primero debes instalarlo a través de npm:

```bash
npm install pug
```

Una vez instalado, puedes comenzar a crear plantillas Pug en tu aplicación y compilarlas en HTML para su renderizado en el navegador.

#### Conclusión:

En resumen, Pug es una herramienta poderosa para la generación de HTML dinámico en aplicaciones web. Su sintaxis simplificada, capacidad de interpolación de datos y flexibilidad lo convierten en una opción popular para desarrolladores que buscan una forma eficiente de generar contenido HTML dinámico y mantener un código limpio y organizado.


### Ejemplos de Uso de Pug

#### 1. Creación de una página HTML básica:

```pug
doctype html
html(lang="en")
  head
    title Ejemplo de Página
  body
    h1 ¡Hola, Mundo!
    p Este es un ejemplo de página HTML generada con Pug.
```

#### 2. Uso de variables y lógica en una plantilla:

```pug
- var nombre = 'Juan'
- var edad = 30

doctype html
html(lang="en")
  head
    title Página de Perfil
  body
    h1 Perfil de #{nombre}
    if edad >= 18
      p ¡Bienvenido al sitio para adultos!
    else
      p Este contenido es para mayores de edad.
```

#### 3. Inclusión de un archivo parcial:

Archivo `header.pug`:
```pug
header
  h1 Logo de la Empresa
  nav
    ul
      li Home
      li Servicios
      li Contacto
```

Plantilla principal:
```pug
doctype html
html(lang="en")
  head
    title Página con Encabezado
  body
    include header.pug
    div
      p Contenido principal de la página.
```

Estos ejemplos muestran cómo puedes utilizar Pug para generar fácilmente contenido HTML dinámico, incluir lógica y reutilizar componentes en tus aplicaciones web.