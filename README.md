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

Luego debes correr el script:
```sh
npm install 
```
para instalar todas las dependencias necesarias.

Una vez finalizó la instalación y hayas configurado los datos de postgres debes correr el comando:
```sh
npm run migrate
```
Este comando creará las tablas necesarias en la base de datos, si desas borrarlas debes correr el comando npm run migrate:undo

Luego debes correr el comando: 
```sh
npm run seeders
```
Este comando rellena las tablas con datos de prueba, si deseas eliminar estos datos de prueba utiliza el siguiente comando
```sh
npm run seeders:undo
```
> NOTA: con este comando se borraran los seeders, pero no las tablas, por 
> lo tanto guardaran la posición de la llave primaria, eso puede generar un 
> error a la hora de correr las pruebas porque en las pruebas hace referencia 
> al id 1 para hacer la búsqueda por id, si se borran los seeder y se vuelven a 
> crear ya no existiría el id 1, en caso de desear borrar los datos, es mejor 
> usar el comando (run migrate:undo) , luego el comando (run migrate) y
> volver a generar los sedeers con el comando (run seeders) de esta forma 
> no fallaran los test.

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
crea un nuevo cliente, recibe como parámetros en formato json el nombre en formato string y un array con los nombres de los descuentos, si el descuento no se encuentra entre los descuentos creados devuelve un error de descuento no válido, se puede crear un usuario sin descuentos dejando el array vacío, pero si no se envía el nombre del usuario devuelve un error bad request.

#### -GET// api/discounts
Devuelve todos los tipos de descuentos

#### -GET// api/discounts/:type
Devuelve un tipo de descuento especifico

#### -POST// api/discounts
```sh
bodyJson
{
"type": string,
"percent": number
}
```
Crea un nuevo descuento, recibe como datos en formato json el tipo de descuento en formato string y el porcentaje en formato número, el nombre del descuento no se puede repetir, de intentar crear un descuento con un nombre ya existente devolverá aun error bad request.