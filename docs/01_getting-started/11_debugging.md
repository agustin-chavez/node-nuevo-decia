### Depuración en Node.js

Esta guía te ayudará a comenzar a depurar tus aplicaciones y scripts de Node.js.

#### Habilitar el Inspector

Cuando se inicia con el interruptor --inspect, un proceso de Node.js escucha a un cliente de depuración. Por defecto, escuchará en el host y puerto 127.0.0.1:9229. Además, a cada proceso se le asigna un UUID único.

Los clientes del Inspector deben conocer y especificar la dirección del host, el puerto y el UUID para conectarse. Una URL completa se verá algo así como `ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e`.

Node.js también comenzará a escuchar mensajes de depuración si recibe una señal SIGUSR1. (SIGUSR1 no está disponible en Windows). En Node.js 7 y versiones anteriores, esto activa la API del Depurador heredada. En Node.js 8 y posteriores, activará la API del Inspector.

#### Implicaciones de seguridad

Dado que el depurador tiene acceso completo al entorno de ejecución de Node.js, un actor malintencionado capaz de conectarse a este puerto puede ejecutar código arbitrario en nombre del proceso de Node.js. Es importante entender las implicaciones de seguridad de exponer el puerto del depurador en redes públicas y privadas.

Exponer públicamente el puerto de depuración no es seguro. Si el depurador está enlazado a una dirección IP pública o a 0.0.0.0, cualquier cliente que pueda alcanzar tu dirección IP podrá conectarse al depurador sin restricciones y podrá ejecutar código arbitrario.

Por defecto, `node --inspect` se enlaza a 127.0.0.1. Necesitas proporcionar explícitamente una dirección IP pública o 0.0.0.0, etc., si tienes la intención de permitir conexiones externas al depurador. Hacerlo puede exponerte a una amenaza de seguridad potencialmente significativa. Te sugerimos que asegures cortafuegos y controles de acceso adecuados para evitar una exposición de seguridad.

Consulta la sección sobre 'Habilitar escenarios de depuración remota' para obtener algunos consejos sobre cómo permitir de manera segura que los clientes de depuración remota se conecten.

#### Las aplicaciones locales tienen acceso completo al inspector

Incluso si enlazas el puerto del inspector a 127.0.0.1 (el valor por defecto), cualquier aplicación que se ejecute localmente en tu máquina tendrá acceso ilimitado. Esto está diseñado para permitir que los depuradores locales se puedan conectar convenientemente.

#### Navegadores, WebSockets y política de mismo origen (same-origin)

Los sitios web abiertos en un navegador web pueden realizar solicitudes WebSocket y HTTP bajo el modelo de seguridad del navegador. Una conexión HTTP inicial es necesaria para obtener un ID de sesión de depuración único. La política de mismo origen evita que los sitios web puedan realizar esta conexión HTTP. Para obtener seguridad adicional contra ataques de reenvío de DNS, Node.js verifica que los encabezados 'Host' para la conexión especifiquen una dirección IP o localhost con precisión.

Estas políticas de seguridad no permiten conectarse a un servidor de depuración remoto especificando el nombre de host. Puedes sortear esta restricción especificando la dirección IP o usando túneles ssh.

#### Clientes del Inspector

Un depurador CLI mínimo está disponible con `node inspect myscript.js`. Además, varias herramientas comerciales y de código abierto también pueden conectarse al Inspector de Node.js.

- **Chrome DevTools 55+, Microsoft Edge**
  - **Opción 1:** Abre `chrome://inspect` en un navegador basado en Chromium o `edge://inspect` en Edge. Haz clic en el botón Configurar y asegúrate de que tu host y puerto objetivo estén listados.
  - **Opción 2:** Copia `devtoolsFrontendUrl` desde la salida de `/json/list` o el texto de pista `--inspect` y pégalo en Chrome.

- **Visual Studio Code 1.10+**
  - En el panel de Depuración, haz clic en el icono de configuración para abrir `.vscode/launch.json`. Selecciona "Node.js" para la configuración inicial.

- **Visual Studio 2017+**
  - Elige "Depurar > Iniciar depuración" desde el menú o pulsa F5.

- **JetBrains WebStorm y otras IDE de JetBrains**
  - Crea una nueva configuración de depuración de Node.js y haz clic en Depurar.

- **chrome-remote-interface**
  - Biblioteca para facilitar las conexiones a los endpoints del Protocolo del Inspector.

- **Gitpod**
  - Inicia una configuración de depuración de Node.js desde la vista de Depuración o pulsa F5.

- **Eclipse IDE with Eclipse Wild Web Developer extension**
  - Desde un archivo .js, elige "Debug As... > Node program", o
  - Crea una configuración de depuración para adjuntar el depurador a la aplicación de Node.js en ejecución (ya iniciada con --inspect).

#### Opciones de línea de comandos

La siguiente tabla lista el impacto de varios indicadores de tiempo de ejecución en la depuración:

| Flag                  | Meaning                                                                                               |
|-----------------------|-------------------------------------------------------------------------------------------------------|
| --inspect             | Habilita el agente del inspector; Escucha en la dirección y puerto predeterminados (127.0.0.1:9229)   |
| --inspect=[host:port] | Habilita el agente del inspector; Enlaza a la dirección o nombre de host host; Escucha en el puerto port (predeterminado: 9229)  |
| --inspect-brk         | Habilita el agente del inspector; Escucha en la dirección y puerto predeterminados; Rompe antes de que comience el código del usuario  |
| --inspect-brk=[host:port] | Habilita el agente del inspector; Enlaza a la dirección o nombre de host host; Escucha en el puerto port; Rompe antes de que comience el código del usuario  |
| node inspect script.js | Genera un proceso secundario para ejecutar el script del usuario bajo la bandera --inspect; y usa el proceso principal para ejecutar el depurador CLI.  |
| node inspect --port=xxxx script.js | Genera un proceso secundario para ejecutar el script del usuario bajo la bandera --inspect; y usa el proceso principal para ejecutar el depurador CLI. Escucha en el puerto port (predeterminado: 9229) |


### **Habilitar escenarios de depuración remota**

Recomendamos que nunca permitas que el depurador escuche en una dirección IP pública. Si necesitas permitir conexiones de depuración remota, recomendamos el uso de túneles SSH en su lugar. Proporcionamos el siguiente ejemplo únicamente con fines ilustrativos. Por favor, comprende el riesgo de seguridad de permitir el acceso remoto a un servicio privilegiado antes de proceder.

Supongamos que estás ejecutando Node.js en una máquina remota, remote.example.com, que deseas poder depurar. En esa máquina, debes iniciar el proceso de node con el inspector escuchando solo en localhost (el valor predeterminado).

```bash
node --inspect server.js
```

Ahora, en tu máquina local desde donde deseas iniciar una conexión de cliente de depuración, puedes configurar un túnel SSH:

```bash
ssh -L 9221:localhost:9229 usuario@remote.example.com
```

Esto inicia una sesión de túnel SSH donde una conexión al puerto 9221 en tu máquina local se reenviará al puerto 9229 en remote.example.com. Ahora puedes adjuntar un depurador como Chrome DevTools o Visual Studio Code a localhost:9221, lo que debería permitirte depurar como si la aplicación Node.js se estuviera ejecutando localmente.

**Depurador Heredado**

El depurador heredado ha sido descontinuado a partir de Node.js 7.7.0. Por favor, utiliza --inspect e Inspector en su lugar.

Cuando se inicia con los interruptores --debug o --debug-brk en la versión 7 y anteriores, Node.js escucha comandos de depuración definidos por el Protocolo de Depuración V8 descontinuado en un puerto TCP, por defecto 5858. Cualquier cliente de depuración que hable este protocolo puede conectarse y depurar el proceso en ejecución; a continuación, se enumeran algunos populares.

El Protocolo de Depuración V8 ya no se mantiene ni se documenta.

**Depurador Incorporado**

Inicia `node debug nombre_script.js` para ejecutar tu script bajo el depurador de línea de comandos incorporado. Tu script se inicia en otro proceso de Node.js iniciado con la opción --debug-brk, y el proceso de Node.js inicial ejecuta el script _debugger.js y se conecta a tu objetivo.

**node-inspector**

Depura tu aplicación Node.js con Chrome DevTools utilizando un proceso intermedio que traduce el Inspector Protocol utilizado en Chromium al protocolo de depuración V8 utilizado en Node.js.


## Notas personales

**Introducción rápida a los túneles SSH**

Los túneles SSH son una característica poderosa de Secure Shell (SSH) que permite crear conexiones seguras entre dos puntos en una red, incluso a través de redes no seguras como Internet. Básicamente, un túnel SSH crea un canal seguro a través de una conexión SSH establecida entre un cliente y un servidor SSH.

Existen dos tipos principales de túneles SSH:

1. **Túnel de reenvío local (Local Forwarding)**: Convierte un puerto en el sistema local en un puerto que se puede acceder a través del servidor SSH remoto. Por ejemplo, podrías usar esto para acceder a servicios de red internos desde fuera de una red protegida por SSH.

2. **Túnel de reenvío remoto (Remote Forwarding)**: Funciona en sentido contrario al túnel de reenvío local, permitiendo que un puerto en el servidor SSH remoto sea accesible desde el sistema local. Esto puede ser útil para permitir que servicios en tu sistema local sean accesibles desde fuera de tu red local de forma segura.

En resumen, los túneles SSH proporcionan una manera segura de transmitir tráfico de red a través de una conexión SSH establecida. Esto es útil para acceder a servicios internos de forma segura o para hacer que los servicios locales sean accesibles desde fuera de una red local.


Para crear un túnel SSH, sigue estos pasos:

1. **Abre una terminal o línea de comandos**: Dependiendo de tu sistema operativo, abre una terminal o línea de comandos. En sistemas Unix/Linux/Mac, esto suele ser Terminal. En Windows, puedes usar PowerShell o el símbolo del sistema.

2. **Ejecuta el comando SSH**: Utiliza el comando `ssh` seguido de la opción `-L` para crear un túnel de reenvío local o `-R` para un túnel de reenvío remoto. También proporciona el número de puerto local y remoto que deseas utilizar, junto con la dirección del servidor SSH al que deseas conectarte.

   Por ejemplo, para crear un túnel de reenvío local:

   ```
   ssh -L [puerto_local]:localhost:[puerto_remoto] [usuario]@[servidor_ssh]
   ```

   O para un túnel de reenvío remoto:

   ```
   ssh -R [puerto_remoto]:localhost:[puerto_local] [usuario]@[servidor_ssh]
   ```

   Reemplaza `[puerto_local]`, `[puerto_remoto]`, `[usuario]`, y `[servidor_ssh]` con los valores correspondientes.

3. **Autenticación SSH**: Es posible que se te solicite que ingreses la contraseña del usuario en el servidor SSH. Si has configurado autenticación SSH mediante claves públicas/privadas, es posible que no se te pida la contraseña.

4. **Túnel SSH activo**: Una vez autenticado, el túnel SSH estará activo. Puedes dejar la terminal abierta para mantener el túnel activo o ejecutar el comando en segundo plano si lo prefieres.

5. **Utiliza el túnel**: Ahora puedes acceder a los servicios a través del túnel SSH utilizando `localhost` y el puerto local que especificaste en el comando `ssh`.

Recuerda que el uso de túneles SSH puede requerir permisos y configuraciones específicas en el servidor SSH y en el cliente. Asegúrate de tener los permisos adecuados y de seguir las políticas de seguridad de tu organización al crear y utilizar túneles SSH.