# Challenge Nuvem

## Set Up

```bash
npm init -y
npm i express mongoose -E
npm i dotenv nodemon -DE
docker-compose up
```

## Challenge

El desafío consiste en implementar nuevas **API's** para manejar las transacciones de nuestros merchants,
para eso vamos a usar algunas API's que están disponibles en ese repositorio.

## Necesitamos que implementes:

1. Un endpoint para procesar transacciones y pagos de un merchant (vendedor)
* Una transacción debe tener:
    * El valor total de la transacción, formateado en string decimal
    * Descripción de la transacción, por ejemplo "T-Shirt Black M"
    * Método de pago: **debit_card** o **credit_card**
    * El número de la tarjeta (debemos guardar y devolver solamente los últimos 4 dígitos de la tarjeta, por ser información delicada)
    * El nombre del dueño de la tarjeta
    * Fecha de expiración
    * CVV de la tarjeta

* Al crear una transacción, también debe ser creada una cuenta por cobrar del merchant (payables), con las siguientes reglas de negocio:
    * Transacción **Debit card**:
        * El payable debe ser creado con **status = paid**, indicando que el merchant recebirá el valor
        * El payable debe ser creado con la fecha igual a la fecha de creación (D + 0).

    * Transacción **Credit card**:
        * El payable debe ser creado con  **status = waiting_funds**, indicando que el merchant irá recibir ese valor en el futuro
        * El payable debe ser creado con la fecha igual a la fecha de creación + 30 días (D + 30)

    * Al crear payables, debemos descontar la tasa de procesamiento (llamada de `fee`). Se debe considerar **2%** para transacciones **debit_card**
      y **4%** para transacciones **credit_card**. Ejemplo: Cuando un payable es creado con un valor de ARS 100,00 a partir de una transacción **credit_card**  él recibirá ARS 96,00.

2. Un endpoint que calcule el total de cuentas por cobrar (payables) del merchant por período, la respuesta debe contener:
* Valor total pago de cuentas por cobrar
* Total cobrado de tasas en los pagos
* Valor de futuros ingresos


## Importante
No utilizaremos base de datos en esa aplicación. Toda la información deberán ser grabadas en la **Mock API** que está en el docker de este proyecto. Vas a consumir los endpoints del container como microservicios.

## Extra
- Podrás usar cualquier lenguage de programación (te recomendamos que utilizes el que mejor manejás), frameworks e librerías.
- Es un diferencial que por lo menos la lógica principal sea testeada.

# Instalación
Es un requisito tener docker en tu computadora para correr nuestra API de mock:

```
docker-compose up
```

## Mock API
Con el servicio corriendo podrás usar las seguientes API's:

---

## Transactions
Listado de `transactions` registradas
`GET http://0.0.0.0:8080/transactions`

Detalle de una `transaction` específica
`GET http://0.0.0.0:8080/transactions/:id`

Creación de `transactions`
`POST http://0.0.0.0:8080/transactions`

Borrado de `transaction` por ID
`DELETE http://0.0.0.0:8080/transactions/:id`

---

## Payables
Listado de `payables` registrados
`GET http://0.0.0.0:8080/payables`

Detalle de un `payable` específico
`GET http://0.0.0.0:8080/payables/:id`

Creación de `payables`
`POST http://0.0.0.0:8080/payables`

Borrado de `payable` por ID
`DELETE http://0.0.0.0:8080/payables/:id`

