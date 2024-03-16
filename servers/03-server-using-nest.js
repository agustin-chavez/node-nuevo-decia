// Importar los módulos necesarios
const { Module, Controller, Get } = require("@nestjs/common");
const { NestFactory } = require("@nestjs/core");

// Definir un controller
@Controller()
class AppController {
  @Get()
  getHello() {
    return "¡Hola Mundo!";
  }
}

// Definir un módulo y conectar el controller
@Module({
  controllers: [AppController],
})
class AppModule {}

// Inicializar la aplicación NestJS
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000); // La aplicación escuchará en el puerto 3000
}
bootstrap();
