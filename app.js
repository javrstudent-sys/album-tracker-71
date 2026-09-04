/**console.log(document); vemos el objeto document */

/**
 *  Todo lo que seleccionemos al principio del archivo, lo haremos con:
 *? document.querySelector() o document.querySelectorAll()
 *? Esta forma de seleccionar elementos es la más moderna y flexible, ya que nos permite seleccionar cualquier elemento del DOM usando selectores CSS. por ejemplo:
 *? document.querySelector('.mi-clase') selecciona el primer elemento con la clase "mi-clase".
 *? Mientras que document.querySelectorAll('div') selecciona todos los elementos <div> en el documento.
 *
 * *Las opciones clasicas de seleccion son:
 * * document.getElementById() y document.getElementsByClassName()
 * 
 *? los eventos se pueden escuchar con addEventListener() y se pueden disparar con dispatchEvent() y son muy útiles para manejar la interacción del usuario con la página web. 

 ** Escucharmos un evento para que cuando el usuario haga click en un botón, se ejecute una función que muestre un mensaje en la consola.
 * 
 *? document.addEventListener('click', function() {
 *?     console.log('Se hizo click en el documento');
 *? }); 
 * 
 */

const formEl = document.getElementById("album-form");
const mainEl = document.querySelector("#album-container");
let albums = []; //array para almacenar los datos de los álbumes que se vayan registrando, para poder enviarlos al backend en un futuro.
/**
 *?  Pasos para extraer los datos del formulario:
 ** 1. Escuchar el evento submit del formulario. formEl.addEventListener('submit', (event) => { ... });
 ** 2. Prevenir el comportamiento por defecto del formulario (que recargue la página). event.preventDefault();
 ** 3. Crear un objeto FormData con los datos del formulario. const formData = new FormData(formEl);
 ** 4 extraer los datos del objeto FormData y convertirlos en un array de arrays. usando el spread operator (...):  const dataArray = [...formData];
 *? NOTA: el spread operator (...) nos permite expandir un objeto iterable (como un array o un objeto FormData) en elementos individuales. En este caso, estamos convirtiendo el objeto FormData en un array de arrays, donde cada sub-array contiene un par clave-valor correspondiente a los datos del formulario.
 * *5. Ver el array de arrays en la consola. console.log(dataArray);
 * *6. Con los datos extraidos del formulario, podemos crear una card de álbum y agregarla al contenedor de álbumes. Creando un objeto con los datos del formulario usando directamente los datos del array de arrays con object.fromEntries(dataArray), el object form entries recibe un array de arrays y lo convierte en un objeto, donde cada sub-array representa una propiedad del objeto con su clave y valor correspondiente.
 ** 7. YA creamos nuestra card de álbum y la agregamos al contenedor de álbumes.
 */
//window.addEventListener("DOMContentLoaded", (event) => {}; es un evento que se dispara cuando el documento HTML ha sido completamente cargado y parseado, sin esperar a que las hojas de estilo, imágenes y subframes terminen de cargarse. Es útil para ejecutar código JavaScript que manipule el DOM antes de que se carguen todos los recursos externos.
window.addEventListener("load", (event) => {
    //console.log("La página ha cargado completamente", event); //vemos un mensaje en la consola cuando la página ha cargado completamente.
    const storedAlbums = getLocalStorage("albums"); //obtenemos el array albums del localStorage para poder mostrarlo en la interfaz del usuario.
    if (storedAlbums === undefined) {
     console.log("No hay álbumes almacenados en el localStorage"); //vemos un mensaje en la consola cuando no hay álbumes almacenados en el localStorage.
    }
    storedAlbums.map((albums) => addAlbumCard(albums, mainEl)); //iteramos sobre el array albums y agregamos cada card de álbum al contenedor de álbumes sin borrar su contenido existente. Dentro del parentsis podemos agregar la posicion donde queremos insertar el contenido HTML. En este caso, lo estamos insertando al final del contenedor de álbumes.
    albums.push(...storedAlbums); //agregamos los álbumes almacenados en el localStorage al array albums para poder enviarlos al backend en un futuro.
    albums.map((albums) => addAlbumCard(albums, mainEl)); //ponemos esta linea para que si no hay albums en el localStorage, se muestre un mensaje de que no hay albums registrados.
});



formEl.addEventListener("submit", (event) => {
    event.preventDefault(); //preventimos que el formulario se envie y recargue la pagina.
    const formData = new FormData(formEl); //creamos un objeto FormData con los datos del formulario.
    //console.log(formData.get("title")); //vemos dato del objeto FormData en la consola.
    //console.log(formData);
    const dataArray = [...formData]; //convertimos el objeto FormData en un array de arrays.
    //console.log(dataArray); //vemos el array de arrays en la consola.
    const albumData = Object.fromEntries(dataArray); //convertimos el array de arrays en un objeto.
    //console.log(albumData); //vemos el objeto en la consola.
    //! hacer todo lo anterior en una sola linea de codigo:
    //! const albumData = Object.fromEntries([...new FormData(formEl)]);
    albums.push(albumData); //agregamos el objeto albumData al array albums para almacenar los datos de los álbumes que se vayan registrando, para poder enviarlos al backend en un futuro.
    // console.log(albums); //vemos el array albums en la consola.
    setLocalStorage("albums", albums); //guardamos el array albums en el localStorage para poder recuperarlo después.
    mainEl.innerHTML = ""; //limpiamos el contenedor de álbumes para que no se dupliquen las cards de álbumes al enviar el formulario varias veces.
    albums.map((albums) => addAlbumCard(albums, mainEl)); //iteramos sobre el array albums y agregamos cada card de álbum al contenedor de álbumes sin borrar su contenido existente. Dentro del parentsis podemos agregar la posicion donde queremos insertar el contenido HTML. En este caso, lo estamos insertando al final del contenedor de álbumes.
    //  addAlbumCard(albumData, mainEl); //agregamos la card de álbum al contenedor de álbumes sin borrar su contenido existente. Dentro del parentsis podemos agregar la posicion donde queremos insertar el contenido HTML. En este caso, lo estamos insertando al final del contenedor de álbumes.
    formEl.reset(); //reseteamos el formulario para que quede vacío después de enviar los datos.  
});

//? creamos la card que se inyectará en el contenedor de álbumes.
/** 
const createAlbumCard = `
    <div class="card border">
        <div class="row g-0">
            <div class="col-4 bg-secondary text-white d-flex align-items-center justify-content-center rounded-start">
                <span>Portada</span>
            </div>
            <div class="col-8">
                <div class="card-body">
                    <h5 class="card-title mb-1">Nombre del Álbum</h5>
                    <p class="card-text text-muted mb-1 small">Artista • 1982</p>
                    <span class="badge bg-success mb-2">Rock</span>
                    <p class="card-text mb-0"><small class="text-success fw-bold">✓
                    Escuchado</small> | ⭐ 5/5</p>
                </div>
            </div>
        </div>
    </div>
`;
*/

/**
 * ! Manipulacion de la interfaz del DOM.
 * *1. Propiedad llamada innerHTML, que nos permite modificar el contenido HTML de un elemento. Por ejemplo, podemos usar mainEL.innerHTML = createAlbumCard; para agregar la card de álbum al contenedor de álbumes.
 * ? NOTA: si lo usamos sin cuidado podemos borrar todo el contenido del contenedor de álbumes, por eso es importante usarlo con precaución.
 * *2. propiedad llamada textContent, que nos permite modificar el contenido de texto de un elemento. Por ejemplo, podemos usar mainEL.textContent = "No hay álbumes registrados"; para mostrar un mensaje cuando no hay álbumes. Solo mostrará texto plano, no HTML.
 * ! NO USAR innerHTML para mostrar contenido de texto, ya que puede ser peligroso si el contenido proviene de una fuente externa, ya que podría contener código malicioso. En su lugar,es mejo usar textContent.
 * ! NOTA: el textContent no interpreta el contenido como HTML, sino como texto plano, por lo que cualquier etiqueta HTML se mostrará como texto y no se renderizará.
 * 
 * 
 */

/**
 * ? probando el innerHTML, para ver si funciona correctamente. 
 */
//console.log(mainEL.innerHTML); 
//vemos el contenido HTML del contenedor de álbumes en la consola.   
///console.log(mainEL.textContent); 
//vemos el contenido de texto del contenedor de álbumes en la consola.
//mainEL.innerHTML = createAlbumCard; 
//agregamos la card de álbum al contenedor de álbumes.
//console.log(mainEL.innerHTML); 
//vemos el contenido HTML del contenedor de álbumes en la consola.


/**
 * ?probando el textContent, para ver si funciona correctamente.
 */

//mainEL.textContent = "No hay álbumes registrados"; 
//mostramos un mensaje cuando no hay álbumes.

//mainEL.textContent = createAlbumCard; 
//intentamos agregar la card de álbum al contenedor de álbumes usando textContent, pero no funcionará correctamente, ya que textContent no interpreta el contenido como HTML, sino como texto plano. Por lo que cualquier etiqueta HTML se mostrará como texto y no se renderizará.


/**
 * ? probando insertAdjacentHTML, para ver si funciona correctamente.
 * ? insertAdjacentHTML nos permite insertar contenido HTML en un elemento sin borrar su contenido existente y en una posicion especifica.
 * * Tiene 4 posiciones posibles:
 * * 1. "beforebegin": antes del elemento.
 * * 2. "afterbegin": dentro del elemento, antes de su primer hijo.
 * * 3. "beforeend": dentro del elemento, después de su último hijo.
 * * 4. "afterend": después del elemento.
 * 
 */

/**
mainEl.insertAdjacentHTML("beforeend",addAlbumCard(albumData)); //agregamos la card de álbum al contenedor de álbumes sin borrar su contenido existente. Dentro del parentsis podemos agregar la posicion donde queremos insertar el contenido HTML. En este caso, lo estamos insertando al final del contenedor de álbumes.
*/
/** 
 * !creamos una funcion para agregar la card de álbum al contenedor de álbumes, para poder reutilizarla cuando se envíe el formulario.
 */

const addAlbumCard = (albumDataObject, htmlElement) => {
    const albumCard = `
    <div class="card border">
        <div class="row g-0">
            <div class="col-4 bg-secondary text-white d-flex align-items-center justify-content-center rounded-start">
                <span>Portada</span>
            </div>
            <div class="col-8">
                <div class="card-body">
                    <h5 class="card-title mb-1">Titulo: ${albumDataObject.title}</h5>
                    <p class="card-text text-muted mb-1 small">Artista: ${albumDataObject.artist} • Año: ${albumDataObject.year}</p>
                    <span class="badge bg-success mb-2">Genero: ${albumDataObject.genre}</span>
                    <p class="card-text mb-0"><small class="text-success fw-bold">
                    Escuchado: ${albumDataObject.listened ? 'Sí' : 'No'}</small> | Calificación: ${albumDataObject.rating}/10 ⭐</p>
                </div>
            </div>
        </div>
    </div>
    `;
    htmlElement.insertAdjacentHTML("beforeend", albumCard); //agregamos la card de álbum al contenedor de álbumes sin borrar su contenido existente. Dentro del parentsis podemos agregar la posicion donde queremos insertar el contenido HTML. En este caso, lo estamos insertando al final del contenedor de álbumes.
};


/**
 * * 1.Creamos un array para almacenar los datos de los álbumes que se vayan registrando, para poder enviarlos al backend en un futuro.
 ** 1.1 cada que creemos un album guardarlo en el array
 *?creamo array albums = [] y cada que se cree un album, guardarlo en el array albums.push(albumData);
 *?hacemos push del objeto albumData al array albums para almacenar los datos de los álbumes que se vayan registrando, para poder enviarlos al backend en un futuro.
 *?   album.push(albumData);

 **2. renderizar todos los albums del array, no solo uno
 *?usamos map para iterar sobre el array albums y agregar cada card de álbum al contenedor de álbumes sin borrar su contenido existente. Dentro del parentsis podemos agregar la posicion donde queremos insertar el contenido HTML. En este caso, lo estamos insertando al final del contenedor de álbumes.
 * ? albums.map((album) => addAlbumCard(album, mainEl)); //iteramos sobre el array albums y agregamos cada card de álbum al contenedor de álbumes sin borrar su contenido existente. Dentro del parentsis podemos agregar la posicion donde queremos insertar el contenido HTML. En este caso, lo estamos insertando al final del contenedor de álbumes.   
 *! NOTA: usamos mainEl.innerHTML = ""; para limpiar el contenedor de álbumes antes de agregar las nuevas cards, para que no se dupliquen las cards de álbumes al enviar el formulario varias veces.
 **3.  Usar localstorage para almacenar la info
 *? creamos una funcion setLocalStorage(key, value) para guardar el array albums en el localStorage, y otra funcion getLocalStorage(key) para obtener el array albums del localStorage.
 *?  setLocalStorage("albums", albums); //guardamos el array albums en el localStorage para poder recuperarlo después.
 **4. obtener la informacion guardada y mostrarla por si el usuario actualiza
 *?  getLocalStorage("albums"); //obtenemos el array albums del localStorage para poder mostrarlo en la interfaz del usuario.
 */



const setLocalStorage = (key, value) => {
    //paso 1, convertimos el valor a texto JSON para poder guardarlo en el localStorage, ya que el localStorage solo puede almacenar strings.
    const textValue = JSON.stringify(value); //convertimos el valor a texto JSON para poder guardarlo en el localStorage, ya que el localStorage solo puede almacenar strings.
    //paso 2, guardamos el valor en el localStorage con la clave especificada.
    localStorage.setItem(key, textValue);
}; 


const getLocalStorage = (key) => {
    //paso 1, obtenemos el valor del localStorage con la clave especificada.
    if (localStorage.getItem(key) == null) return; //si no hay valor guardado, retornamos undefined. Esta es una forma de evitar errores al intentar parsear un valor nulo
    //Esta forma de escribir el if es una forma de escribir un if en una sola línea, donde si la condición se cumple, se ejecuta la instrucción después del return. En este caso, si no hay valor guardado, retornamos undefined. 
    //con Json.parse() convertimos el valor de texto JSON a un objeto JavaScript para poder usarlo en nuestro código.
    const data = JSON.parse(localStorage.getItem(key));
    return data;
};
