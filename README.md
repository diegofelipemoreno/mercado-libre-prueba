# Mercado Libre Challenge.

## Build Setup

In the project directory, you can run:

``` bash
Node version: v12.18.3

# Install dependencies
npm install

# In another terminal start the API local server at localhost:3001
npm run api-dev

# Run the APP local server at localhost:3000
npm run start


## Notas:

Este proyecto fue desarollado con la libreria de React, manejando una arquitectura:

- Api: Se encuentra todo el desarrollo de la API dividida en 3 grandes partes
  -- Controllers: Reciben la data del enpoint (https://api.mercadolibre.com), la manipulan y devuelven de la forma que
     se requiere (Data para categories, items, items description, search).
  -- Routers: Se encargan de recibir y redireccionar URLs, pathnames, querys deacuerdo a los endpoints que se quieran asignar a la API.
  -- apiRequestService: Servicio encargado de realizar los request a https://api.mercadolibre.com y deacuerdo a
     las URLs que se le pasan como parametro devuelve la data especifica o respuesta del servidor. 

- Common: Archivos comunes, utilidades, constantes transversales a toda la APP.

- Components: Todos los components de la APP (Header, caja de busqueda, lista de productos, producto detalle, etc).

- Containers: Componentes encargados de hacer wrapper a otros componentes para que de esta manera el componente
              tenga disponible la data del state. En este caso se le hizo un wrapper al componente "Layout", el cual 
              contiene los componentes de la APP, de esta forma los componentes no tienen estar pasandose props en
              cascada o por parametro sino que pueden obtener la misma informacion independientemente que esten
              anidados unos a otros, lo que hace que la APP pueda ser bastante flexible y escalable.

- scss: Carpeta que contiene todo lo que tiene que ver con estilos en la APP desde archivos globales, mixins, utilidades
        contantes, colores, etc, hasta los archivos puntuales de los componentes. Cabe mencionar que el patron que se utilizo 
        para los estilos de este proyecto fue BEM.
        Tambien se manejo una grilla de 12 columnas con el CSS Grid layout. 

- servicios: Carpeta donde se encuentra el servicio de request a la API.

- Store: Componente que contiene el state, setters y getters de la APP donde toda la informacion filtrada que viene de la API se guarda y esta
        disponible para todos los componentes de la APP.


## Blockers
Durante este desarrollo se encontraron algunos blockers con sus respectivos workarounds que vale la pena mencionar:
  - Se utilizo el modulo de node "dotenv" para generar las variable de las URLs tanto como ambiente de desarrollo como producción.
    Si se corre la aplicacion en dev, carga las urls tipo localhost en produccion corre las urls reales. La API reconoce estas 
    URLs alojadas en (.env.development, .env.produccion), pero la APP no. De alguna forma la APP no reconoce "process.env.APP_DOMAIN",
    por lo tanto se tuvo que quemar la URL en el archivo de "services/requestService.js".