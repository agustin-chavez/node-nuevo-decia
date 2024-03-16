## ECMAScript 2015 (ES6) y en adelante

Node.js está construido con versiones modernas de V8. Al mantenernos actualizados con las últimas versiones de este motor, garantizamos que las nuevas características de la especificación de JavaScript ECMA-262 se traigan a los desarrolladores de Node.js de manera oportuna, así como mejoras continuas en rendimiento y estabilidad.

Todas las características de ECMAScript 2015 (ES6) se dividen en tres grupos para las características en envío, en etapas y en progreso:

- Todas las características en envío, que V8 considera estables, se activan de forma predeterminada en Node.js y NO requieren ningún tipo de bandera de tiempo de ejecución.
- Las características en etapas, que son características casi completadas que no son consideradas estables por el equipo de V8, requieren una bandera de tiempo de ejecución: --harmony.
- Las características en progreso pueden activarse individualmente mediante su respectiva bandera de harmony, aunque esto no se recomienda en absoluto a menos que sea para fines de prueba. Nota: estas banderas son expuestas por V8 y pueden cambiar potencialmente sin ningún aviso de degradación.

¿Qué características se envían con qué versión de Node.js de forma predeterminada?

El sitio web [node.green](https://node.green/) proporciona una excelente descripción general de las características de ECMAScript admitidas en varias versiones de Node.js, basada en la tabla de compatibilidad de kangax.

¿Qué características están en progreso?

Se están agregando constantemente nuevas características al motor V8. En general, espere que estas se implementen en una futura versión de Node.js, aunque el momento es desconocido.

Puede enumerar todas las características en progreso disponibles en cada versión de Node.js buscando a través del argumento --v8-options. Tenga en cuenta que estas son características incompletas y posiblemente rotas de V8, así que úselas bajo su propio riesgo:

```bash
node --v8-options | grep "in progress"
```

¿Debería eliminar la configuración de mi infraestructura para aprovechar la bandera --harmony?

El comportamiento actual de la bandera --harmony en Node.js es habilitar solo las características en etapas. Después de todo, ahora es un sinónimo de --es_staging. Como se mencionó anteriormente, estas son características completadas que aún no se consideran estables. Si desea jugar seguro, especialmente en entornos de producción, considere eliminar esta bandera de tiempo de ejecución hasta que se implemente de forma predeterminada en V8 y, en consecuencia, en Node.js. Si lo mantiene habilitado, debe estar preparado para que las actualizaciones adicionales de Node.js rompan su código si V8 cambia su semántica para seguir más de cerca el estándar.

¿Cómo puedo encontrar qué versión de V8 se envía con una versión particular de Node.js?

Node.js proporciona una forma sencilla de enumerar todas las dependencias y las versiones respectivas que se envían con un binario específico a través del objeto global process. En caso del motor V8, escriba lo siguiente en su terminal para recuperar su versión:

```bash
node -p process.versions.v8
```