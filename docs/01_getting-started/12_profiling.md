# Perfilado de Aplicaciones Node.js

Hay muchas herramientas de terceros disponibles para perfilar aplicaciones Node.js, pero, en muchos casos, la opción más fácil es utilizar el perfilador integrado de Node.js. El perfilador integrado utiliza el perfilador dentro de V8 que muestrea la pila a intervalos regulares durante la ejecución del programa. Registra los resultados de estos muestreos, junto con eventos de optimización importantes como las compilaciones jit, como una serie de marcas:

```
creación de código, LazyCompile, 0, 0x2d5000a337a0, 396, "bp native array.js:1153:16", 0x289f644df68, ~
creación de código, LazyCompile, 0, 0x2d5000a33940, 716, "hasOwnProperty native v8natives.js:198:30", 0x289f64438d0, ~
creación de código, LazyCompile, 0, 0x2d5000a33c20, 284, "ToName native runtime.js:549:16", 0x289f643bb28, ~
creación de código, Stub, 2, 0x2d5000a33d40, 182, "DoubleToIStub"
creación de código, Stub, 2, 0x2d5000a33e00, 507, "NumberToStringStub"
```

Anteriormente, necesitabas el código fuente de V8 para poder interpretar las marcas. Afortunadamente, se han introducido herramientas desde Node.js 4.4.0 que facilitan el consumo de esta información sin construir V8 por separado desde el código fuente. Veamos cómo el perfilador integrado puede ayudar a obtener información sobre el rendimiento de la aplicación.

Para ilustrar el uso del perfilador de marcas, trabajaremos con una aplicación Express simple. Nuestra aplicación tendrá dos manejadores, uno para agregar nuevos usuarios a nuestro sistema:

```javascript
app.get('/newUser', (req, res) => {
  let username = req.query.username || '';
  const password = req.query.password || '';
  username = username.replace(/[!@#$%^&*]/g, '');
  if (!username || !password || users[username]) {
    return res.sendStatus(400);
  }
  const salt = crypto.randomBytes(128).toString('base64');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512');
  users[username] = { salt, hash };
  res.sendStatus(200);
});
```

y otro para validar intentos de autenticación de usuario:

```javascript
app.get('/auth', (req, res) => {
  let username = req.query.username || '';
  const password = req.query.password || '';
  username = username.replace(/[!@#$%^&*]/g, '');
  if (!username || !password || !users[username]) {
    return res.sendStatus(400);
  }
  const { salt, hash } = users[username];
  const encryptHash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512');
  if (crypto.timingSafeEqual(hash, encryptHash)) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});
```

Tenga en cuenta que estos NO son controllers recomendados para autenticar usuarios en sus aplicaciones Node.js y se utilizan únicamente con fines ilustrativos. No debería intentar diseñar sus propios mecanismos de autenticación criptográfica en general. Es mucho mejor usar soluciones de autenticación existentes y probadas.

Ahora supongamos que hemos implementado nuestra aplicación y los usuarios se están quejando de una alta latencia en las solicitudes. Podemos ejecutar fácilmente la aplicación con el perfilador integrado:

```bash
NODE_ENV=production node --prof app.js
```

y poner carga en el servidor usando ab (ApacheBench):

```bash
curl -X GET "http://localhost:8080/newUser?username=matt&password=password"
ab -k -c 20 -n 250 "http://localhost:8080/auth?username=matt&password=password"
```

y obtener una salida de ab de:

```
Concurrency Level:      20
Time taken for tests:   46.932 seconds
Complete requests:      250
Failed requests:        0
Keep-Alive requests:    250
Total transferred:      50250 bytes
HTML transferred:       500 bytes
Requests per second:    5.33 [#/sec] (mean)
Time per request:       3754.556 [ms] (mean)
Time per request:       187.728 [ms] (mean, across all concurrent requests)
Transfer rate:          1.05 [Kbytes/sec] received
...
Percentage of the requests served within a certain time (ms)
  50%   3755
  66%   3804
  75%   3818
  80%   3825
  90%   3845
  95%   3858
  98%   3874
  99%   3875
 100%   4225 (longest request)
```

A partir de esta salida, vemos que solo estamos logrando servir alrededor de 5 solicitudes por segundo y que la solicitud promedio tarda un poco menos de 4 segundos en completarse. En un ejemplo del mundo real, podríamos estar haciendo mucho trabajo en muchas funciones en nombre de una solicitud de usuario, pero incluso en nuestro ejemplo simple, podríamos perder tiempo compilando expresiones regulares, generando salts aleatorios, generando hash únicos a partir de contraseñas de usuario, o dentro del propio framework Express.

Dado que ejecutamos nuestra aplicación usando la opción --prof, se generó un archivo de marcas en el mismo directorio que su ejecución local de la aplicación. Debería tener la forma isolate-0xnnnnnnnnnnnn-v8.log (donde n es un dígito).

Para entender este archivo, necesitamos usar el procesador de marcas incluido con el binario de Node.js. Para ejecutar el procesador, use la bandera --prof-process:

```bash
node --prof-process isolate-0xnnnnnnnnnnnn-v8.log > procesado.txt
```

Abrir procesado.txt en su editor de texto favorito le dará algunos tipos diferentes de información. El archivo está dividido en secciones que están nuevamente divididas por lenguaje. Primero, miramos la sección de resumen y vemos:

```
 [Summary]:
   ticks  total  nonlib   name
     79    0.2%    0.2%  JavaScript
  36703   97.2%   99.2%  C++
      7    0.0%    0.0%  GC
    767    2.0%          Shared libraries
    215    0.6%          Unaccounted
```

Esto nos dice que el 97% de todas las muestras recopiladas ocurrieron en código C++ y que al ver otras secciones del resultado procesado, deberíamos prestar más atención al trabajo realizado en C++ (en lugar de JavaScript). Con esto en mente, a continuación encontramos la sección [C++] que contiene información sobre qué funciones de C++ están ocupando la mayor parte del tiempo de CPU y vemos:

```
[C++]:
   ticks  total  nonlib   name
  19557   51.8%   52.9%  node::crypto::PBKDF2(v8::FunctionCallbackInfo<v8::Value> const&)
   4510   11.9%   12.2%  _sha1_block_data_order
   3165    8.4%    8.6%  _malloc_zone_malloc
```

Vemos que las 3 primeras entradas representan el 72.1% del tiempo de CPU utilizado por el programa. A partir de esta salida, vemos inmediatamente que al menos el 51.8% del tiempo de CPU se utiliza en una función llamada PBKDF2 que corresponde a nuestra generación de hash a partir de la contraseña de un usuario. Sin embargo, puede que no sea evidente de inmediato cómo las dos entradas inferiores influyen en nuestra aplicación (o si lo son, fingiremos que no lo son por el bien del ejemplo). Para entender mejor la relación entre estas funciones, examinaremos la sección [Bottom up (heavy) profile] que proporciona información sobre los principales llamadores de cada función. Examinando esta sección, encontramos:

```
   ticks parent  name
  19557   51.8%  node::crypto::PBKDF2(v8::FunctionCallbackInfo<v8::Value> const&)
  19557  100.0%    v8::internal::Builtins::~Builtins()
  19557  100.0%      LazyCompile: ~pbkdf2 crypto.js:557:16
   4510   11.9%  _sha1_block_data_order
   4510  100.0%    LazyCompile: *pbkdf2 crypto.js:557:16
   4510  100.0%      LazyCompile: *exports.pbkdf2Sync crypto.js:552:30
   3165    8.4%  _malloc_zone_malloc
   3161   99.9%    LazyCompile: *pbkdf2 crypto.js:557:16
   3161  100.0%      LazyCompile: *exports.pbkdf2Sync crypto.js:552:30
```

Analizar esta sección requiere un poco más de trabajo que los recuentos de marcas en bruto anteriores. Dentro de cada una de las "pilas de llamadas" anteriores, el porcentaje en la columna del padre le indica el porcentaje de muestras para las cuales la función en la fila anterior fue llamada por la función en la fila actual. Por ejemplo, en la "pila de llamadas" media anterior para _sha1_block_data_order, vemos que _sha1_block_data_order ocurrió en el 11.9% de las muestras, lo que ya sabíamos por los recuentos en bruto anteriores. Sin embargo, aquí, también podemos ver que siempre fue llamado por la función pbkdf2 dentro del módulo crypto de Node.js. Vemos que de manera similar, _malloc_zone_malloc fue llamado casi exclusivamente por la misma función pbkdf2. Por lo tanto, utilizando la información en esta vista, podemos decir que nuestro cálculo de hash a partir de la contraseña del usuario no solo representa el 51.8% desde arriba, sino también todo el tiempo de CPU en las 3 funciones más muestreadas ya que las llamadas a _sha1_block_data_order y _malloc_zone_malloc se hicieron en nombre de la función pbkdf2.

En este punto, está muy claro que la generación de hash basada en contraseñas debe ser el objetivo de nuestra optimización. Afortunadamente, has internalizado completamente los beneficios de la programación asíncrona y te das cuenta de que el trabajo para generar un hash a partir de la contraseña del usuario se está realizando de manera síncrona y, por lo tanto, está atando el bucle de eventos. Esto nos impide trabajar en otras solicitudes entrantes mientras calculamos un hash.

Para remediar este problema, realizas una pequeña modificación a los manejadores anteriores para usar la versión asíncrona de la función pbkdf2:

```javascript
app.get('/auth', (req, res) => {
  let username = req.query.username || '';
  const password = req.query.password || '';
  username = username.replace(/[!@#$%^&*]/g, '');
  if (!username || !password || !users[username]) {
    return res.sendStatus(400);
  }
  crypto.pbkdf2(
    password,
    users[username].salt,
    10000,
    512,
    'sha512',
    (err, hash) => {
      if (users[username].hash.toString() === hash.toString()) {
        res.sendStatus(200);
      } else {
        res.sendStatus(401);
      }
    }
  );
});
```

Una nueva ejecución de la prueba de referencia anterior con la versión asíncrona de tu aplicación produce:

```
Concurrency Level:      20
Time taken for tests:   12.846 seconds
Complete requests:      250
Failed requests:        0
Keep-Alive requests:    250
Total transferred:      50250 bytes
HTML transferred:       500 bytes
Requests per second:    19.46 [#/sec] (mean)
Time per request:       1027.689 [ms] (mean)
Time per request:       51.384 [ms] (mean, across all concurrent requests)
Transfer rate:          3.82 [Kbytes/sec] received
...
Percentage of the requests served within a certain time (ms)
  50%   1018
  66%   1035
  75%   1041
  80%   1043
  90%   1049
  95%   1063
  98%   1070
  99%   1071
 100%   1079 (longest request)
 ```

¡Yay! ¡Tu aplicación ahora está sirviendo alrededor de 20 solicitudes por segundo, aproximadamente 4 veces más que antes con la generación de hash síncrona. Además, la latencia promedio ha bajado de 4 segundos a poco más de 1 segundo.

Espero que, a través de la investigación de rendimiento de este ejemplo (admitidamente forzado), hayas visto cómo el procesador de ticks de V8 puede ayudarte a obtener una mejor comprensión del rendimiento de tus aplicaciones Node.js.


## Una nota personal: Profiling

El perfilado, también conocido como "profiling" en inglés, es una técnica fundamental en el desarrollo de software que consiste en medir y analizar el comportamiento y el rendimiento de un programa durante su ejecución. Su objetivo principal es identificar cuellos de botella, áreas de mejora y posibles problemas de rendimiento en el código.

Para llevar a cabo el perfilado, se utilizan herramientas especializadas que recopilan datos sobre el uso de recursos del programa, como el tiempo de ejecución de las funciones, la cantidad de memoria utilizada y la frecuencia de llamadas a determinadas partes del código. Estos datos se analizan posteriormente para identificar patrones de ejecución y áreas que podrían optimizarse.

El perfilado es una práctica crucial en el desarrollo de software, ya que permite a los desarrolladores entender cómo se comporta su código en tiempo real y tomar decisiones informadas para mejorar su rendimiento y eficiencia. Al comprender qué partes del código son más exigentes en términos de recursos, los desarrolladores pueden optimizar su aplicación para ofrecer una mejor experiencia de usuario y un rendimiento más rápido.