# E-Commerce
```
Este Backend creado con NodeJS y express funciona con la creación de un usuario
(Vendedor), dicho usuario es el único que puede gestionar modificaciones y eliminación
de productos y facturas, las compras se realizan como usuario invitado, es decir, no es
necesario estár logado para poder realizar la compra, los productos se pueden consultar
de manera pública al igual que los filtros. 
```

## Línea de comandos
```
Conexión a mongo: localhost:27017
Con docker: docker-compose up (Crea una conexión en contenedor en el puerto localhost:27017)

-Instalar dependencias:
npm install

-Inciar servidor y conexión a base de datos:
npm start

Importar y correr las colecciones adjuntada al repositorio en la carpeta (colección Postman):
Es importante correr la colección en el order que está generado, ya que por uso de 
token puede que algunas funciones si el usuario no está logado o si el usuario erroneo
no está logado.

```

## Información
```
Usuario:
Los datos del usuario son básicos y todos requerido, el rol se asigna de manera automática.

Producto:
El registro, actualización, lectura por vendedor y eliminación de producto solo se puede realizar
si el usuario está logado. 

Compra:
La compra, como se comenta anteriormente se realizar como usuario invitado, además de los
datos del usuario para realizar la compra se requiren los productos a comprar, para ello se pasan
los productos como arrays en donde la primera posición del array es el nombre del producto a 
comprar y la segunda posición es la cantidad. Por cada compra se descuenta el stock en la abse de 
datos del producto, cuando un producto está a 0 no se realizar la compra hasta que dicho producto
no se retire de la compra.

Factura:
Al momento de realizar la compra se genera una factura en base de datos, el ID de dicha
factura se almacena en la colección de base de datos (purchase) que es en donde se encuentran los
datos del usuario, el usuario se genera y por cada compra que haga, el ID de la factura 
"Orden de compra" se almacena en el usuario como un array de ordenes. La base de datos de factura 
almacena un número correlativo de factura, productos, id de cliente y fecha, además de su propio
ID que es generado por mongo
```



