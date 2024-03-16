# Mejores Prácticas de Seguridad

## Intención
Este documento tiene la intención de ampliar el modelo de amenazas actual y proporcionar pautas extensivas sobre cómo asegurar una aplicación Node.js.

## Contenido del Documento
### Mejores prácticas
Una forma simplificada y condensada de ver las mejores prácticas. Podemos usar este problema o esta guía como punto de partida. Es importante tener en cuenta que este documento es específico de Node.js; si buscas algo más amplio, considera las Mejores Prácticas de OSSF.
### Ataques explicados
Ilustra y documenta en inglés claro con algunos ejemplos de código (si es posible) los ataques que mencionamos en el modelo de amenazas.
### Bibliotecas de Terceros
Define amenazas (ataques de typosquatting, paquetes maliciosos...) y mejores prácticas con respecto a las dependencias de módulos de nodos, etc.

## Lista de Amenazas
### Denegación de Servicio del Servidor HTTP (CWE-400)
Este es un ataque donde la aplicación se vuelve no disponible para el propósito para el que fue diseñada debido a la forma en que procesa las solicitudes HTTP entrantes. Estas solicitudes no necesitan ser deliberadamente creadas por un actor malintencionado: un cliente mal configurado o con errores también puede enviar un patrón de solicitudes al servidor que resulte en una denegación de servicio.

Las solicitudes HTTP son recibidas por el servidor HTTP de Node.js y entregadas al código de la aplicación a través del controlador de solicitud registrado. El servidor no analiza el contenido del cuerpo de la solicitud. Por lo tanto, cualquier DoS causado por el contenido del cuerpo después de que se entregan al controlador de solicitud no es una vulnerabilidad en Node.js en sí mismo, ya que es responsabilidad del código de la aplicación manejarlo correctamente.

Asegúrate de que el servidor web maneje correctamente los errores de socket, por ejemplo, cuando se crea un servidor sin un controlador de errores, será vulnerable a DoS.

```javascript
const net = require('node:net');
const server = net.createServer(function (socket) {
  // socket.on('error', console.error) // esto evita que el servidor se bloquee
  socket.write('Servidor de eco\r\n');
  socket.pipe(socket);
});
server.listen(5000, '0.0.0.0');
```

Si se realiza una solicitud incorrecta, el servidor podría bloquearse.

Un ejemplo de un ataque de DoS que no es causado por el contenido de la solicitud es Slowloris. En este ataque, las solicitudes HTTP se envían lentamente y fragmentadas, un fragmento a la vez. Hasta que se entregue la solicitud completa, el servidor mantendrá recursos dedicados a la solicitud en curso. Si se envían suficientes de estas solicitudes al mismo tiempo, la cantidad de conexiones simultáneas pronto alcanzará su máximo resultado en una denegación de servicio. Así es como el ataque no depende del contenido de la solicitud, sino del tiempo y el patrón de las solicitudes enviadas al servidor.

### Mitigaciones
- Usa un proxy inverso para recibir y reenviar solicitudes a la aplicación Node.js. Los proxies inversos pueden proporcionar almacenamiento en caché, equilibrio de carga, listas negras IP, etc., lo que reduce la probabilidad de que un ataque DoS sea efectivo.
- Configura correctamente los tiempos de espera del servidor, de modo que las conexiones que están inactivas o donde las solicitudes llegan demasiado lentamente puedan ser eliminadas. Consulta los diferentes tiempos de espera en http.Server, especialmente headersTimeout, requestTimeout, timeout y keepAliveTimeout.
- Limita el número de sockets abiertos por host y en total. Consulta la documentación de http, especialmente agent.maxSockets, agent.maxTotalSockets, agent.maxFreeSockets y server.maxRequestsPerSocket.


## Reenvío de DNS (CWE-346)
Este es un ataque que puede apuntar a aplicaciones Node.js que se ejecutan con el depurador inspector habilitado utilizando el interruptor --inspect.

Dado que los sitios web abiertos en un navegador web pueden realizar solicitudes WebSocket y HTTP, pueden apuntar al depurador inspector que se ejecuta localmente. Esto suele estar prevenido por la política de mismo origen implementada por los navegadores modernos, que prohíbe que los scripts alcancen recursos desde diferentes orígenes (lo que significa que un sitio web malicioso no puede leer datos solicitados desde una dirección IP local).

Sin embargo, mediante el reenvío de DNS, un atacante puede controlar temporalmente el origen de sus solicitudes para que parezcan originarse desde una dirección IP local. Esto se hace controlando tanto un sitio web como el servidor DNS utilizado para resolver su dirección IP. Consulta la wiki de Reenvío de DNS para obtener más detalles.

### Mitigaciones
- Desactiva el inspector en la señal SIGUSR1 mediante la adición de un listener process.on('SIGUSR1', ...) a él.
- No ejecutes el protocolo del inspector en producción.

## Exposición de Información Sensible a un Actor No Autorizado (CWE-552)
Todos los archivos y carpetas incluidos en el directorio actual se envían al registro npm durante la publicación del paquete.

Existen algunos mecanismos para controlar este comportamiento mediante la definición de una lista negra con .npmignore y .gitignore o mediante la definición de una lista blanca en el package.json.

### Mitigaciones
- Usa npm publish --dry-run para enumerar todos los archivos a publicar. Asegúrate de revisar el contenido antes de publicar el paquete.
- También es importante crear y mantener archivos de ignorar como .gitignore y .npmignore. A lo largo de estos archivos, puedes especificar qué archivos/carpetas no deben ser publicados. La propiedad files en package.json permite la operación inversa: lista permitida.
- En caso de una exposición, asegúrate de despublicar el paquete.

## Contrabando de Solicitudes HTTP (CWE-444)
Este es un ataque que implica dos servidores HTTP (generalmente un proxy y una aplicación Node.js). Un cliente envía una solicitud HTTP que primero pasa por el servidor frontal (el proxy) y luego es redirigida al servidor backend (la aplicación). Cuando el servidor frontal y el servidor backend interpretan las solicitudes HTTP ambiguas de manera diferente, existe la posibilidad de que un atacante envíe un mensaje malicioso que no será visto por el servidor frontal pero sí por el servidor backend, "contrabandeándolo" efectivamente más allá del servidor proxy.

Consulta el CWE-444 para una descripción más detallada y ejemplos.

### Mitigaciones
- No uses la opción insecureHTTPParser al crear un servidor HTTP.
- Configura el servidor frontal para normalizar las solicitudes ambiguas.
- Monitorea continuamente las nuevas vulnerabilidades de contrabando de solicitudes HTTP tanto en Node.js como en el servidor frontal de tu elección.
- Usa HTTP/2 de extremo a extremo y deshabilita el degradado HTTP si es posible.


## Exposición de Información a través de Ataques de Tiempo (CWE-208)
Este es un ataque que permite al atacante aprender información potencialmente sensible mediante, por ejemplo, medir cuánto tiempo tarda la aplicación en responder a una solicitud. Este ataque no es específico de Node.js y puede apuntar a casi todas las plataformas de ejecución.

El ataque es posible siempre que la aplicación utilice un secreto en una operación sensible al tiempo (por ejemplo, rama). Considera manejar la autenticación en una aplicación típica. Aquí, un método básico de autenticación incluye correo electrónico y contraseña como credenciales. La información del usuario se recupera de la entrada que el usuario ha proporcionado idealmente desde un DBMS. Al recuperar la información del usuario, la contraseña se compara con la información del usuario recuperada de la base de datos. La comparación de cadenas integrada tarda más tiempo para valores de la misma longitud. Esta comparación, cuando se ejecuta durante una cantidad aceptable, aumenta involuntariamente el tiempo de respuesta de la solicitud. Al comparar los tiempos de respuesta de la solicitud, un atacante puede adivinar la longitud y el valor de la contraseña en una gran cantidad de solicitudes.

### Mitigaciones
- La API de crypto expone una función timingSafeEqual para comparar valores sensibles reales y esperados utilizando un algoritmo de tiempo constante.
- Para la comparación de contraseñas, puedes usar el scrypt disponible también en el módulo crypto nativo.
- Más generalmente, evita usar secretos en operaciones de tiempo variable. Esto incluye el ramificado en secretos y, cuando el atacante podría estar ubicado en la misma infraestructura (por ejemplo, la misma máquina en la nube), usar un secreto como un índice en la memoria. Escribir código de tiempo constante en JavaScript es difícil (en parte debido al JIT). Para aplicaciones criptográficas, usa las API de crypto integradas o WebAssembly (para algoritmos no implementados nativamente).

## Módulos Maliciosos de Terceros (CWE-1357)
Actualmente, en Node.js, cualquier paquete puede acceder a recursos poderosos como acceso a la red. Además, debido a que también tienen acceso al sistema de archivos, pueden enviar cualquier dato a cualquier lugar.

Todo el código que se ejecuta en un proceso de nodo tiene la capacidad de cargar y ejecutar código adicional arbitrario utilizando eval() (o sus equivalentes). Todo el código con acceso de escritura al sistema de archivos puede lograr lo mismo escribiendo en archivos nuevos o existentes que se cargan.

Node.js tiene un mecanismo de política experimental¹ para declarar el recurso cargado como no confiable o confiable. Sin embargo, esta política no está habilitada de forma predeterminada. Asegúrate de fijar las versiones de las dependencias y ejecutar controles automáticos de vulnerabilidades utilizando flujos de trabajo comunes o scripts npm. Antes de instalar un paquete, asegúrate de que este paquete esté mantenido e incluya todo el contenido que esperabas. Ten cuidado, el código fuente de GitHub no siempre es el mismo que el publicado, valídalo en los node_modules.

### Ataques de la cadena de suministro
Un ataque de la cadena de suministro en una aplicación Node.js ocurre cuando una de sus dependencias (directa o transitiva) está comprometida. Esto puede suceder ya sea porque la aplicación es demasiado laxa en la especificación de las dependencias (permitiendo actualizaciones no deseadas) y/o errores comunes en la especificación (vulnerables al typosquatting).

Un atacante que tome el control de un paquete aguas arriba puede publicar una nueva versión con código malicioso en él. Si una aplicación Node.js depende de ese paquete sin ser estricta en qué versión es segura de usar, el paquete puede actualizarse automáticamente a la última versión maliciosa, comprometiendo la aplicación.

Las dependencias especificadas en el archivo package.json pueden tener un número de versión exacto o un rango. Sin embargo, al fijar una dependencia en una versión exacta, sus dependencias transitivas no están fijadas. Esto deja a la aplicación vulnerable a actualizaciones no deseadas / inesperadas.

### Mitigaciones
- Prevenir que npm ejecute scripts arbitrarios con --ignore-scripts.
- Además, puedes deshabilitarlo globalmente con npm config set ignore-scripts true.
- Fijar las versiones de las dependencias a una versión inmutable específica, no a una versión que sea un rango o de una fuente mutable.
- Usar archivos de bloqueo, que fijan cada dependencia (directa y transitiva).
- Usar Mitigaciones para envenenamiento de archivos de bloqueo.
- Automatizar la comprobación de nuevas vulnerabilidades utilizando CI, con herramientas como [npm-audit][].
- Se pueden usar herramientas como Socket para analizar paquetes con análisis estático y encontrar comportamientos riesgosos como acceso a la red o al sistema de archivos.
- Usar npm ci en lugar de npm install. Esto hace cumplir el archivo de bloqueo de modo que las inconsistencias entre él y el archivo package.json causen un error (en lugar de ignorar silenciosamente el archivo de bloqueo a favor de package.json).
- Revisar cuidadosamente el archivo package.json en busca de errores/errores tipográficos en los nombres de las dependencias.


## Violación de Acceso a la Memoria (CWE-284)
Los ataques basados en la memoria o en el montón dependen de una combinación de errores de gestión de memoria y un asignador de memoria explotable. Como todas las plataformas de ejecución, Node.js es vulnerable a estos ataques si tus proyectos se ejecutan en una máquina compartida. Utilizar un montón seguro es útil para prevenir la filtración de información sensible debido a desbordamientos y subdesbordamientos de punteros.

Desafortunadamente, un montón seguro no está disponible en Windows. Se puede encontrar más información en la documentación de montón seguro de Node.js.

### Mitigaciones
- Usa --secure-heap=n dependiendo de tu aplicación donde n es el tamaño máximo de bytes asignado.
- No ejecutes tu aplicación de producción en una máquina compartida.

## Parcheado de Monos (CWE-349)
El parcheado de monos se refiere a la modificación de propiedades en tiempo de ejecución con el objetivo de cambiar el comportamiento existente.

```javascript
// eslint-disable-next-line no-extend-native
Array.prototype.push = function (item) {
  // anulando el [].push global
};
```

### Mitigaciones
- La bandera --frozen-intrinsics habilita los intrínsecos congelados experimentales, lo que significa que todos los objetos y funciones JavaScript integrados se congelan recursivamente. Por lo tanto, el siguiente fragmento no anulará el comportamiento predeterminado de Array.prototype.push.

```javascript
// eslint-disable-next-line no-extend-native
Array.prototype.push = function (item) {
  // anulando el [].push global
};
// No atrapado:
// TypeError <Object <Object <[Object: null prototype] {}>>>:
// No se puede asignar a la propiedad de solo lectura 'push' del objeto ''
```

## Ataques de Polución de Prototipos (CWE-1321)
La polución de prototipos se refiere a la posibilidad de modificar o inyectar propiedades en elementos del lenguaje JavaScript abusando del uso de __proto_, _constructor, prototype y otras propiedades heredadas de prototipos integrados.

### Ejemplos

CVE-2022-21824 (Node.js)
CVE-2018-3721 (Biblioteca de terceros: Lodash)

### Mitigaciones
- Evita fusiones recursivas inseguras, consulta CVE-2018-16487.
- Implementa validaciones de esquemas JSON para solicitudes externas/no confiables.
- Crea objetos sin prototipo utilizando Object.create(null).
- Congela el prototipo: Object.freeze(MyObject.prototype).
- Deshabilita la propiedad Object.prototype.__proto__ utilizando la bandera --disable-proto.
- Verifica que la propiedad exista directamente en el objeto, no desde el prototipo utilizando Object.hasOwn(obj, keyFromObj).
- Evita usar métodos de Object.prototype.

## Elemento de Ruta de Búsqueda No Controlado (CWE-427)
Node.js carga módulos siguiendo el algoritmo de resolución de módulos. Por lo tanto, asume que el directorio en el que se solicita un módulo (require) es de confianza.

### Mitigaciones
- Utiliza el mecanismo de política experimental con comprobación de integridad para evitar la amenaza anterior. Para el directorio descrito anteriormente, se puede utilizar el siguiente policy.json.

```json
{
  "resources": {
    "./app/auth.js": {
      "integrity": "sha256-iuGZ6SFVFpMuHUcJciQTIKpIyaQVigMZlvg9Lx66HV8="
    },
    "./app/server.js": {
      "dependencies": {
        "./auth": "./app/auth.js"
      },
      "integrity": "sha256-NPtLCQ0ntPPWgfVEgX46ryTNpdvTWdQPoZO3kHo0bKI="
    }
  }
}
```

Por lo tanto, al requerir el módulo de autenticación, el sistema validará la integridad y lanzará un error si no coincide con el esperado.

```bash
» node --experimental-policy=policy.json app/server.js
node:internal/policy/sri:65
      throw new ERR_SRI_PARSE(str, str[prevIndex], prevIndex);
      ^
SyntaxError [ERR_SRI_PARSE]: Subresource Integrity string "sha256-iuGZ6SFVFpMuHUcJciQTIKpIyaQVigMZlvg9Lx66HV8=%" had an unexpected "%" at position 51
```

Nota que siempre se recomienda el uso de --policy-integrity para evitar mutaciones de política.


## Características Experimentales en Producción
No se recomienda el uso de características experimentales en producción. Las características experimentales pueden sufrir cambios que rompan la compatibilidad si es necesario, y su funcionalidad no es completamente estable. Aunque, se agradece mucho la retroalimentación.

## Herramientas de OpenSSF
OpenSSF está liderando varias iniciativas que pueden ser muy útiles, especialmente si planeas publicar un paquete npm. Estas iniciativas incluyen:

### OpenSSF Scorecard
Scorecard evalúa proyectos de código abierto utilizando una serie de verificaciones automatizadas de riesgos de seguridad. Puedes usarlo para evaluar proactivamente vulnerabilidades y dependencias en tu código y tomar decisiones informadas sobre la aceptación de vulnerabilidades.

### Programa de Insignias de Mejores Prácticas de OpenSSF
Los proyectos pueden auto-certificarse voluntariamente describiendo cómo cumplen con cada mejor práctica. Esto generará una insignia que se puede agregar al proyecto.




