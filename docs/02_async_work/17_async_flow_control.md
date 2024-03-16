# Control de flujo asíncrono

El material en este post está fuertemente inspirado en el Libro de Node.js de Mixu.

En su núcleo, JavaScript está diseñado para ser no bloqueante en el "hilo" principal, donde se renderizan las vistas. Puedes imaginar la importancia de esto en el navegador. Cuando el hilo principal se bloquea, resulta en el famoso "congelamiento" que los usuarios finales temen, y ningún otro evento puede ser despachado, lo que resulta en la pérdida de adquisición de datos, por ejemplo.

Esto crea algunas restricciones únicas que solo un estilo de programación funcional puede curar. Aquí es donde entran en juego los callbacks.

Sin embargo, los callbacks pueden volverse difíciles de manejar en procedimientos más complicados. Esto a menudo resulta en el "infierno de los callbacks", donde múltiples funciones anidadas con callbacks hacen que el código sea más difícil de leer, depurar, organizar, etc.

```javascript
async1(function (input, result1) {
  async2(function (result2) {
    async3(function (result3) {
      async4(function (result4) {
        async5(function (output) {
          // hacer algo con la salida
        });
      });
    });
  });
});
```

Por supuesto, en la vida real probablemente habría líneas adicionales de código para manejar result1, result2, etc., así que la longitud y complejidad de este problema generalmente resulta en un código que parece mucho más desordenado que el ejemplo anterior.

Aquí es donde las funciones son de gran utilidad. Las operaciones más complejas están compuestas por muchas funciones:

1. initiator style / input
2. middleware
3. terminator

El "iniciador / entrada" es la primera función en la secuencia. Esta función aceptará la entrada original, si la hubiera, para la operación. La operación es una serie ejecutable de funciones, y la entrada original será principalmente:

- variables en un entorno global
- invocación directa con o sin argumentos
- valores obtenidos por solicitudes de sistema de archivos o de red

Las solicitudes de red pueden ser solicitudes entrantes iniciadas por una red externa, por otra aplicación en la misma red o por la propia aplicación en la misma red o en una red externa.

Una función de middleware devolverá otra función, y una función de terminador invocará el callback. Lo siguiente ilustra el flujo de solicitudes de red o sistema de archivos. Aquí la latencia es 0 porque todos estos valores están disponibles en memoria.

```javascript
function final(someInput, callback) {
  callback(`${someInput} and terminated by executing callback `);
}
function middleware(someInput, callback) {
  return final(`${someInput} touched by middleware `, callback);
}
function initiate() {
  const someInput = 'hello this is a function ';
  middleware(someInput, function (result) {
    console.log(result);
    // requires callback to `return` result
  });
}
initiate();
```

# Gestión de estado

Las funciones pueden o no depender del estado. La dependencia del estado surge cuando la entrada u otra variable de una función depende de una función externa.

De esta manera, hay dos estrategias principales para la gestión de estado:

- pasar variables directamente a una función, y
- adquirir un valor de variable de una caché, sesión, archivo, base de datos, red u otra fuente externa.

Nota: No mencioné variable global. Gestionar el estado con variables globales es a menudo un anti-patrón descuidado que hace difícil o imposible garantizar el estado. Las variables globales en programas complejos deben evitarse cuando sea posible.

# Control de flujo

Si un objeto está disponible en memoria, la iteración es posible, y no habrá un cambio en el control de flujo:

```javascript
function getSong() {
  let _song = '';
  let i = 100;
  for (i; i > 0; i -= 1) {
    _song += `${i} cervezas en la pared, tomas una y la pasas, ${
      i - 1
    } botellas de cerveza en la pared\n`;
    if (i === 1) {
      _song += "¡Eh, consigamos más cerveza!";
    }
  }
  return _song;
}
function singSong(_song) {
  if (!_song) throw new Error("¡la canción está vacía, DAME UNA CANCIÓN!");
  console.log(_song);
}
const song = getSong();
// esto funcionará
singSong(song);
```

Sin embargo, si los datos existen fuera de la memoria, la iteración ya no funcionará:

```javascript
function getSong() {
  let _song = '';
  let i = 100;
  for (i; i > 0; i -= 1) {
    /* eslint-disable no-loop-func */
    setTimeout(function () {
      _song += `${i} cervezas en la pared, tomas una y la pasas, ${
        i - 1
      } botellas de cerveza en la pared\n`;
      if (i === 1) {
        _song += "¡Eh, consigamos más cerveza!";
      }
    }, 0);
    /* eslint-enable no-loop-func */
  }
  return _song;
}
function singSong(_song) {
  if (!_song) throw new Error("¡la canción está vacía, DAME UNA CANCIÓN!");
  console.log(_song);
}
const song = getSong('cerveza');
// esto no funcionará
singSong(song);
// ¡Error no capturado: ¡la canción está vacía, DAME UNA CANCIÓN!
```

¿Por qué sucedió esto? setTimeout instruye a la CPU a almacenar las instrucciones en otro lugar en el bus, e instruye que los datos estén programados para recogerse en un momento posterior. Miles de ciclos de CPU pasan antes de que la función vuelva a golpear en el marcador de 0 milisegundos, la CPU recoge las instrucciones del bus y las ejecuta. El único problema es que la canción ('') fue devuelta miles de ciclos antes.

La misma situación surge al tratar con sistemas de archivos y solicitudes de red. El hilo principal simplemente no puede bloquearse durante un período de tiempo indeterminado, por lo tanto, usamos callbacks para programar la ejecución del código en el tiempo de manera controlada.

Podrás realizar casi todas tus operaciones con los siguientes 3 patrones:

- En serie: las funciones se ejecutarán en un orden estrictamente secuencial, este es el más similar a los bucles for.

```javascript
// operaciones definidas en otro lugar y listas para ejecutar


const operaciones = [
  { func: funcion1, args: args1 },
  { func: funcion2, args: args2 },
  { func: funcion3, args: args3 },
];
function ejecutarFuncionConArgumentos(operacion, callback) {
  // ejecuta la función
  const { args, func } = operacion;
  func(args, callback);
}
function procedimientoSerial(operacion) {
  if (!operacion) process.exit(0); // terminado
  ejecutarFuncionConArgumentos(operacion, function (resultado) {
    // continuar DESPUÉS del callback
    procedimientoSerial(operaciones.shift());
  });
}
procedimientoSerial(operaciones.shift()); // tomar el primer elemento y sacarlo de la lista
```

- Completo paralelo: cuando el orden no es un problema, como enviar un correo electrónico a una lista de 1,000,000 de destinatarios.

```javascript
let count = 0;
let success = 0;
const failed = [];

const recipients = [
  { name: 'Bart', email: 'bart@tld' },
  { name: 'Marge', email: 'marge@tld' },
  { name: 'Homer', email: 'homer@tld' },
  { name: 'Lisa', email: 'lisa@tld' },
  { name: 'Maggie', email: 'maggie@tld' },
];

function dispatch(recipient, callback) {
  // `sendEmail` es un cliente SMTP hipotético
  sendMail(
    {
      subject: 'Cena esta noche',
      message: 'Tenemos mucha col en el plato. ¿Vienes?',
      smtp: recipient.email,
    },
    callback
  );
}

function final(result) {
  console.log(`Resultado: ${result.count} intentos \
      & ${result.success} correos electrónicos enviados con éxito`);
  if (result.failed.length)
    console.log(`Fallo al enviar a: \
        \n${result.failed.join('\n')}\n`);
}

recipients.forEach(function (recipient) {
  dispatch(recipient, function (err) {
    if (!err) {
      success += 1;
    } else {
      failed.push(recipient.name);
    }
    count += 1;
    if (count === recipients.length) {
      final({
        count,
        success,
        failed,
      });
    }
  });
});
```

- Paralelo limitado: paralelo con límite, como enviar con éxito 1,000,000 de correos electrónicos a partir de una lista de 10E7 usuarios.

```javascript
let successCount = 0;

function final() {
  console.log(`se enviaron ${successCount} correos electrónicos`);
  console.log('terminado');
}

function dispatch(recipient, callback) {
  // `sendEmail` es un cliente SMTP hipotético
  sendMail(
    {
      subject: 'Cena esta noche',
      message: 'Tenemos mucha col en el plato. ¿Vienes?',
      smtp: recipient.email,
    },
    callback
  );
}

function enviarUnMillonDeCorreosSolo() {

  getListOfTenMillionGreatEmails(function (err, bigList) {
    if (err) throw err;

    function serial(recipient) {
      if (!recipient || successCount >= 1000000) return final();
      dispatch(recipient, function (_err) {
        if (!_err) successCount += 1;
        serial(bigList.pop());
      });
    }

    serial(bigList.pop()); // toma el ultimo elemento y lo saca de la lista
  });
  
}

enviarUnMillonDeCorreosSolo();
```

Cada uno tiene sus propios casos de uso, beneficios y problemas que puedes experimentar y leer con más detalle. ¡Lo más importante es modularizar tus operaciones y usar callbacks! Si tienes alguna duda, ¡trata todo como si fuera un middleware!


# Notas personales 

## Middlewares

En Node.js, un middleware es una función que tiene acceso tanto al objeto de solicitud (request object) como al objeto de respuesta (response object) en una aplicación web. Estas funciones se utilizan para realizar tareas específicas durante el procesamiento de una solicitud HTTP antes de que se envíe una respuesta al cliente.

Los middlewares se pueden utilizar para una variedad de propósitos, como la manipulación de datos de solicitud y respuesta, la autenticación de usuarios, la gestión de sesiones, el registro de solicitudes, la compresión de respuestas, el enrutamiento y mucho más.

En términos de funcionamiento, los middlewares se pueden encadenar uno tras otro, de modo que una solicitud HTTP pase a través de varios middlewares antes de llegar a la ruta final o el controlador de la solicitud. Esto permite una modularidad y flexibilidad significativas en la construcción de aplicaciones web en Node.js.

Un ejemplo común de middleware en Node.js es el middleware de enrutamiento, que se utiliza para dirigir las solicitudes entrantes a las funciones de controlador correspondientes en función de la URL solicitada. Otros ejemplos incluyen middleware de análisis de cuerpos (body parsing middleware) para procesar datos enviados en el cuerpo de una solicitud, middleware de autenticación para verificar la identidad de un usuario y middleware de compresión para comprimir respuestas antes de enviarlas al cliente.


## Antipatrones

Los antipatrones, también conocidos como "patrones antipáticos" o "antipatrones de diseño", son soluciones aparentemente intuitivas que, en realidad, llevan a problemas de diseño, código confuso o dificultades de mantenimiento en el software. Aquí hay algunos antipatrones comunes que se deben evitar:

- Código espagueti: Se refiere a un código desorganizado y confuso que es difícil de seguir y entender. Esto suele ocurrir cuando no hay una estructura clara en el código y se mezclan lógica de negocio con la presentación y la manipulación de datos.

- Duplicación de código: Repetir bloques de código en múltiples lugares del programa. Esto dificulta el mantenimiento, ya que cualquier cambio debe realizarse en varios lugares, lo que aumenta el riesgo de introducir errores.

- Variable global: El uso excesivo de variables globales puede conducir a acoplamientos indeseados entre diferentes partes del código y dificultar la depuración y el rastreo de errores.

- Código muerto (Dead code): Porciones de código que no se utilizan pero que permanecen en el código base. Esto puede confundir a los desarrolladores y aumentar la complejidad del sistema sin proporcionar ningún beneficio.

- Monolito: Desarrollar una aplicación como un gran bloque de código monolítico en lugar de dividirla en componentes más pequeños y manejables. Esto dificulta la escalabilidad y la mantenibilidad a medida que la aplicación crece.

- Antipatrón de diseño de arquitectura en capas (Layering): Estratificar una aplicación en capas sin una justificación clara, lo que puede llevar a una sobrecarga de abstracción y complejidad innecesaria.

- Programación de copiar y pegar (Copy-Paste programming): La práctica de copiar y pegar código de un lugar a otro en lugar de abstraerlo en funciones o componentes reutilizables. Esto puede resultar en código redundante y difícil de mantener.

- Código "espeluznante" (Spaghetti code): Similar al código espagueti, pero con un énfasis particular en la falta de estructura y coherencia en la lógica de programación.

- Antipatrón de encapsulación (Encapsulation Breakage): Exponer demasiados detalles internos de una clase o componente, lo que puede hacer que sea difícil de entender y mantener.

- Código "hardcodeado": Incluir valores literales directamente en el código en lugar de usar constantes o configuraciones externas. Esto hace que el código sea menos flexible y más difícil de mantener.

Evitar estos antipatrones puede ayudar a mejorar la calidad y la mantenibilidad del código, así como a facilitar el trabajo colaborativo entre desarrolladores.