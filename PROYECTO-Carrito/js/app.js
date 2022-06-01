//  Seleccionamos las Variables que vamos a usar del dom  

const carrito = document.querySelector('#carrito'); // tipo id
 contenedorCarrito = document.querySelector('#lista-carrito tbody');// se seleciona como un Css 
 listaCursos = document.querySelector('#lista-cursos'); // tipo  id 
 vaciarCarritoBtn= document.querySelector('#vaciar-carrito') // boton 
 let articuloCarrito= []; // Arreglo donde va el objeto de course.

 // function para agrupar todos los eventos.

 loadEventListener(); // se llama la funcion y luego se crea , de forma declarativa

 function loadEventListener (){
     // Cuando se agrega un curso presionando ' Agregar Carrito' 
    listaCursos.addEventListener('click',addCurso);

    // Eliminar cursos del carrito con el btn.
    carrito.addEventListener('click',deleteCourse);

    // Vaciar Carrito
     vaciarCarritoBtn.addEventListener('click', () => {   
         articuloCarrito = []; // resetear arreglo

         cleanHTML() // se elimina desde html
     });
   
 };

// Nota: cuando son varias lineas de codigo se recomienda apartar las funciones 
// y si es corto hacerlo directamente.

// funciones de cada evento
function addCurso (e){ // Esta funcion selecciona el curso
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const chooseCourse= e.target.parentElement.parentElement; 
        readDataCourse(chooseCourse);
    }
    
};

// nota: funciones y variables se escriben aparte, buena practicas

// Funcion para borrar curso con el btn

function deleteCourse (e){
    // Probar siempre a donde esta apuntado la funcion
    console.log(e.target.classList); // listar clases 
    if(e.target.classList.contains('borrar-curso')){// selecionamos elemento que tiene la clase 
         const courseId= e.target.getAttribute('data-id'); // Acceder a la ID 
         
    //Elimina del arreglo
    articuloCarrito= articuloCarrito.filter( course => course.id !== courseId);
    // filter encontrar un elemento

    carHTML(); // Iterar sobre carrito y iterar su html
    }

};



// leer los datos del elemento que seleccionamos.
function readDataCourse(course){
     console.log(course); //verificar el card seleccioando ( curso)
   
      
// Crear un Objeto con el contenido actual dentro de la funcion=
const infoCourse = {
    imagen: course.querySelector('img').src,
    titulo: course.querySelector('h4').textContent,
    precio: course.querySelector('.precio span ').textContent,
    id: course.querySelector('a').getAttribute('data-id'), // tomar atributos de un enlace con getAtributes.
    cantidad: 1
};
console.log(infoCourse); // debugeo console.log 

// Revisa si un elemento ya existe en el carrtio(some)

const exist = articuloCarrito.some( course => course.id === infoCourse.id );

// validar si el curso esta mas de una vez  
if (exist){
    // Actualizar datos 
    const course= articuloCarrito.map(course => {
        if(course.id === infoCourse.id){
            course.cantidad ++;
            return course; // el map retorna (return ) el objeto actulizado 
        }else{
            return course; // retorna el obj sin duplicado
        }
    });

    articuloCarrito=[...course];

}else {
    // Agrego elementos al arreglo de carrito
    articuloCarrito = [...articuloCarrito, infoCourse ]; // hacer una copia del arreglo , para que no se pierda
};
 


// 1. Agrega elementos al arreglo del carrito ^^^^^^ arriba 


 carHTML();
 // Mostrando en el carrito el curso seleccionado 

 console.log(articuloCarrito);


};

// muestra el carrito de compras en el Html

function carHTML(){

    //Limpiar  el html
    cleanHTML(); // el orden de los factores es importante


    // recorre el carrito y genera el html 
    articuloCarrito.forEach( course => {
        const { imagen, titulo, precio, cantidad , id } = course// destructuracion de objetos
        const row = document.createElement('tr'); // Secciones de las tablas 
        /* Mostrando el resto de la informacion */
        row.innerHTML = `
        
            <td> 
                <img src="${imagen}" width= "100">
            </td>
            <td> ${titulo} </td>
            <td> ${precio} </td>
            <td> ${cantidad} </td>
            <td>  <a href= "#" class="borrar-curso" data-id="${id}" > X </td>
        `;

        // Agrega el HTML del carrito en el tbody 
        contenedorCarrito.appendChild(row);
    });
};

// Elimina los cursos del tbody 

function cleanHTML (){ // Eliminando duplicado
    // forma lenta 
    // contenedorCarrito.innerHTML= '';

    // Forma eficiente.
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
};














