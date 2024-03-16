# Cómo instalar Node.js

Node.js se puede instalar de diferentes formas. Esta publicación destaca las más comunes y convenientes. Los paquetes oficiales para todas las principales plataformas están disponibles en https://nodejs.org/download/.

Una forma muy conveniente de instalar Node.js es a través de un gestor de paquetes. En este caso, cada sistema operativo tiene el suyo propio. Otros gestores de paquetes para MacOS, Linux y Windows se enumeran en https://nodejs.org/download/package-manager/.

nvm es una forma popular de ejecutar Node.js. Te permite cambiar fácilmente la versión de Node.js e instalar nuevas versiones para probar y revertir fácilmente si algo falla. También es muy útil para probar tu código con versiones antiguas de Node.js.

Consulta https://github.com/nvm-sh/nvm para obtener más información sobre esta opción.

En cualquier caso, cuando Node.js esté instalado, tendrás acceso al programa ejecutable node en la línea de comandos.

### Una nota personal: Usando NVM

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install node # Instalar la última versión
nvm alias default node # Establecer como predeterminada
nvm current # Verificar la versión actual
node --version # Confirmar la versión actual
```