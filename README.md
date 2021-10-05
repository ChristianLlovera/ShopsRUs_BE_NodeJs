# ShopsRUs_BE_NodeJs

## Iniciar Proyecto
Para iniciar el proyecto debes tener instalado postgresSQL
y debes ingresar a: 
```sh
src\database\config\config.json 
```

y modificar los datos de conexión a postgres:   
```sh
 "username": "postgres",
 "password": "password",
 "database": "postgres",
 "host": "127.0.0.1",
```

Luego debes correr el siguiente script para instalar todas las dependencias necesarias.
```sh
npm install 
```

Para correr los test utiliza el comando:
```sh
npm run test
```

Para iniciar la aplicación utiliza el comando 
```sh
npm start
```

# las rutas válidas son las siguientes:

#### -GET// api/customers 
  Devuelve todos los clientes

#### -GET// api/customers/:id
Devuelve el cliente por el id

#### -GET// api/customers/search/:name
Devuelve una lista de clientes con coincidencia por el nombre

#### -POST// api/customers
```sh
bodyJson
{
"name":string
"discounts":[]
} 
```
Crea un nuevo cliente, recibe como parámetros en formato json el nombre en formato string y un array con los nombres de los descuentos, si el descuento no se encuentra entre los descuentos creados devuelve un error de descuento no válido, se puede crear un usuario sin descuentos dejando el array vacío, pero si no se envía el nombre del usuario devuelve un error bad request.

#### -GET// api/discounts
Devuelve todos los tipos de descuentos

#### -GET// api/discounts/:type
Devuelve un tipo de descuento específico

#### -POST// api/discounts
```sh
bodyJson
{
"type": string,
"percent": number
}
```
Crea un nuevo descuento, recibe como datos en formato json el tipo de descuento en formato string y el porcentaje en formato número, el nombre del descuento no se puede repetir, de intentar crear un descuento con un nombre ya existente devolverá un error bad request.

#### -GET// api/invoices/:id
Devuelve una factura por el id

>Para ver una documentación más detallada visita:
><a href="https://christianllovera.github.io/ShopsRUs_BE_NodeJs/" target="_blank">https://christianllovera.github.io/ShopsRUs_BE_NodeJs/</a>