# Node.js con TypeScript

## ¿Qué es TypeScript?
TypeScript es un lenguaje de código abierto y de moda mantenido y desarrollado por Microsoft. Es amado y utilizado por muchos desarrolladores de software en todo el mundo.

Básicamente, es un superset de JavaScript que añade nuevas capacidades al lenguaje. La adición más notable son las definiciones de tipos estáticos, algo que no está presente en JavaScript puro. Gracias a los tipos, podés, por ejemplo, declarar qué tipo de argumentos esperamos y qué retorna exactamente en nuestras funciones o cuál es la forma exacta del objeto que estamos creando. TypeScript es una herramienta realmente poderosa y abre un nuevo mundo de posibilidades en proyectos de JavaScript. Hace que nuestro código sea más seguro y robusto al prevenir muchos errores antes de que el código sea enviado siquiera: detecta problemas durante el desarrollo de código e integra maravillosamente con editores de código como Visual Studio Code.

¡Podemos hablar sobre otros beneficios de TypeScript más tarde, veamos algunos ejemplos ahora!

## Ejemplos
Echá un vistazo a este fragmento de código y luego lo podemos analizar juntos:

```typescript
type Usuario = {
  nombre: string;
  edad: number;
};
function esAdulto(usuario: Usuario): boolean {
  return usuario.edad >= 18;
}
const justine: Usuario = {
  nombre: 'Justine',
  edad: 23,
};
const esJustineAdulta: boolean = esAdulto(justine);
```

La primera parte (con la palabra clave type) es responsable de declarar nuestro tipo de objeto personalizado que representa a los usuarios. Luego, utilizamos este tipo recién creado para crear la función esAdulto que acepta un argumento de tipo Usuario y devuelve un booleano. Después de esto, creamos justine, nuestro ejemplo de datos que se puede utilizar para llamar a la función definida previamente. Finalmente, creamos una nueva variable con información sobre si justine es un adulto.

Hay cosas adicionales sobre este ejemplo que deberías saber. En primer lugar, si no cumplimos con los tipos declarados, TypeScript nos alertaría de que algo está mal y evitaría el uso incorrecto. En segundo lugar, no todo debe tener un tipo explícito; TypeScript es muy inteligente y puede deducir los tipos por nosotros. Por ejemplo, la variable esJustineAdulta sería de tipo booleano incluso si no la tipamos explícitamente o justine sería un argumento válido para nuestra función incluso si no declaramos esta variable como del tipo Usuario.

Bueno, tenemos algo de código TypeScript. Ahora, ¿cómo lo ejecutamos?

Lo primero que debés hacer es instalar TypeScript en nuestro proyecto:

```bash
npm i -D typescript
```

Ahora podés compilarlo a JavaScript usando el comando tsc en la terminal. ¡Hagámoslo!

Suponiendo que nuestro archivo se llama ejemplo.ts, el comando se vería así:

```bash
npx tsc ejemplo.ts
```

npx aquí significa Node Package eXecute. Esta herramienta nos permite ejecutar el compilador de TypeScript sin instalarlo globalmente.

tsc es el compilador de TypeScript que tomará nuestro código TypeScript y lo compilará a JavaScript. Este comando resultará en un nuevo archivo llamado ejemplo.js que podemos ejecutar usando Node.js. Ahora que sabemos cómo compilar y ejecutar código TypeScript, ¡veamos las capacidades de prevención de errores de TypeScript en acción!

Así es como modificaremos nuestro código:

```typescript
type Usuario = {
  nombre: string;
  edad: number;
};
function esAdulto(usuario: Usuario): boolean {
  return usuario.edad >= 18;
}
const justine: Usuario = {
  nombre: 'Justine',
  edad: '¡Secreto!',
};
const esJustineAdulta: string = esAdulto(justine, "¡No debería estar aquí!");
```

Y esto es lo que TypeScript tiene que decir al respecto:

```bash
ejemplo.ts:12:3 - error TS2322: Type 'string' is not assignable to type 'number'.
12   edad: "Secreto!",
     ~~~
  ejemplo.ts:3:3
    3   edad: number;
        ~~~
    The expected type comes from property 'age' which is declared here on type 'User'
ejemplo.ts:15:7 - error TS2322: Type 'boolean' is not assignable to type 'string'.
15 const esJustineAdulta: string = esAdulto(justine, "¡No debería estar aquí!");
         ~~~~~~~~~~~~~~~~
ejemplo.ts:15:51 - error TS2554: Expected 1 arguments, but got 2.
15 const esJustineAdulta: string = esAdulto(justine, "¡No debería estar aquí!");
                                                     ~~~~~~~~~~~~~~~~~~~~~~
Found 3 errors.
```

Como podés ver, TypeScript nos impide con éxito enviar código que podría funcionar de manera inesperada. ¡Eso es maravilloso!

## Más sobre TypeScript
TypeScript ofrece una gran cantidad de otros mecanismos geniales como interfaces, clases, tipos de utilidad, etc. Además, en proyectos más grandes podés declarar la configuración del compilador de TypeScript en un archivo separado y ajustar de manera granular cómo funciona, qué tan estricto es y dónde almacena los archivos compilados, por ejemplo. Podés leer más sobre todas estas cosas increíbles en la documentación oficial de TypeScript.

Algunos de los otros beneficios de TypeScript que vale la pena mencionar son que se puede adoptar progresivamente, ayuda a que el código sea más legible y comprensible y permite a los desarrolladores utilizar características de lenguaje modernas mientras se envía código para versiones antiguas de Node.js.

## TypeScript en el mundo de Node.js
TypeScript está bien establecido en el mundo de Node.js y es utilizado por muchas empresas, proyectos de código abierto, herramientas y frameworks. Algunos de los ejemplos notables de proyectos de código abierto que utilizan TypeScript son:

- NestJS: un framework robusto y completamente funcional que facilita la creación de sistemas escalables y bien diseñados.
- TypeORM: un gran ORM influenciado por otras herramientas conocidas de otros lenguajes como Hibernate, Doctrine o Entity Framework.
- Prisma: un ORM de próxima generación con un modelo de datos declarativo, migraciones generadas y consultas de base de datos totalmente seguras en cuanto a tipos.
- RxJS: una biblioteca ampliamente utilizada para la programación reactiva.
- AdonisJS: un framework web totalmente funcional con Node.js.
- FoalTs: el elegante framework de Node.js.

Y muchos, muchos más proyectos geniales... ¡Quizás incluso tu próximo proyecto!



## Notas personales

### Introducción a RxJS

RxJS, o Reactive Extensions for JavaScript, es una biblioteca que proporciona una programación reactiva funcional para JavaScript. Permite trabajar con secuencias de eventos asincrónicos utilizando observables, que son una forma de representar flujos de datos y eventos que pueden ser manejados de manera sincrónica.

#### Observables

Los observables son secuencias que emiten eventos o valores a lo largo del tiempo. Pueden emitir múltiples valores, asíncronamente, y pueden ser cancelados cuando ya no son necesarios.

```typescript
import { Observable } from 'rxjs';

const observable = new Observable(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});

observable.subscribe({
  next: value => console.log(value),
  complete: () => console.log('Se ha completado la emisión de valores')
});
```

#### Operadores

Los operadores en RxJS son funciones de alto orden que permiten trabajar con observables y transformar, filtrar, combinar y manipular los datos emitidos por ellos.

```typescript
import { from } from 'rxjs';
import { map, filter } from 'rxjs/operators';

const numeros = from([1, 2, 3, 4, 5]);

numeros.pipe(
  filter(numero => numero % 2 === 0),
  map(numero => numero * 2)
).subscribe(resultado => console.log(resultado));

// Output: 4, 8
```

#### Suscripciones

Las suscripciones se utilizan para observar los valores emitidos por un observable y ejecutar código en respuesta a estos valores.

```typescript
import { interval } from 'rxjs';

const observable = interval(1000);

const suscripcion = observable.subscribe(valor => console.log(valor));

setTimeout(() => {
  suscripcion.unsubscribe();
}, 5000);
```

#### Conclusión

RxJS es una biblioteca poderosa que proporciona una manera elegante y funcional de trabajar con flujos de datos asíncronos en JavaScript. Al comprender los conceptos básicos de observables, operadores y suscripciones, podés aprovechar al máximo su potencial para manejar eventos y datos de manera reactiva en tus aplicaciones.


## Introducción a Nest.js

Nest.js es un marco de trabajo (framework) de Node.js para construir aplicaciones web eficientes y escalables. Utiliza TypeScript como lenguaje principal y está inspirado en Angular para su arquitectura y diseño.

### Características Principales

#### TypeScript

Nest.js está completamente escrito en TypeScript, lo que permite aprovechar las ventajas de este lenguaje como tipado estático, interfaces, decoradores, y otras características avanzadas.

#### Arquitectura Modular

Nest.js fomenta la creación de aplicaciones modularizadas y escalables, utilizando módulos para organizar el código de manera clara y mantenible.

#### Inyección de Dependencias

El marco de trabajo proporciona un sistema de inyección de dependencias integrado que facilita la gestión de las dependencias y la creación de componentes reutilizables y fácilmente intercambiables.

#### Decoradores

Los decoradores de TypeScript son una parte fundamental de Nest.js, permitiendo agregar metadatos a las clases, métodos, propiedades y parámetros de funciones para definir la configuración y el comportamiento de los componentes.

#### Middleware

Nest.js utiliza middleware para manejar peticiones HTTP, lo que facilita la implementación de funciones de autorización, registro de solicitudes, manejo de errores y otras tareas de intercepción.

#### Ejemplo Básico

A continuación, un ejemplo básico de un controlador y un módulo en Nest.js:

```typescript
import { Controller, Get, Module } from '@nestjs/common';

@Controller('hello')
export class HelloController {
  @Get()
  getHello(): string {
    return 'Hola Mundo!';
  }
}

@Module({
  controllers: [HelloController],
})
export class AppModule {}
```

En este ejemplo, creamos un controlador `HelloController` con una ruta `GET /hello` que devuelve el mensaje "Hola Mundo!". Luego, creamos un módulo `AppModule` que registra el controlador para su uso en la aplicación.

#### Conclusión

Nest.js es una excelente opción para construir aplicaciones web robustas y mantenibles en Node.js. Su enfoque en TypeScript, su arquitectura modular y su conjunto de características avanzadas lo hacen ideal para proyectos de cualquier tamaño y complejidad. Con Nest.js, podés crear aplicaciones web escalables y de alto rendimiento de manera rápida y eficiente.