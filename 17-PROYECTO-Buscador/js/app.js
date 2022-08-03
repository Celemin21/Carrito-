// Variables 
const marca = document.querySelector ('#marca');
const year = document.querySelector ('#year');
const minimo= document.querySelector ('#minimo');
const maximo = document.querySelector ('#maximo');
const puertas = document.querySelector ('#puertas');
const transmision = document.querySelector ('#transmision');
const color = document.querySelector ('#color');

// contiene el arreglo de autos
const result = document.querySelector('#resultado');  




const max= new Date().getFullYear(); // trae la fecha actual 
const min= max - 10; // resta 10 al año actual 

// Generar un Objeto con la busqueda

const dateSearch ={
    marca: '',
    year: '',
    min: '',
    max: '',
    puertas: '',
    transmision: '',
    color: '', 
}


// Events 

document.addEventListener('DOMContentLoaded',() => { // arrowFunction para ejecutar 
                                                     // varias funciones del DOM 

    // Muestra los carros al cargar
    showCar(autos); // -> LLamar el Objeto en el Scope Global

    // LLena las opciones de años
    fullSelect();
    
    // EventListener para los select de la pagina hacia el objeto de busqueda
    marca.addEventListener('change', e => {
        dateSearch.marca=e.target.value;
        console.log(dateSearch)

        // Funcion filtrar autos en base a la busqueda

        filterCar();
    })

    year.addEventListener('change', e => {
        dateSearch.year= parseInt(e.target.value);
        console.log(dateSearch)
        filterCar();
    })

    minimo.addEventListener('change', e => {
        dateSearch.min=e.target.value;
        console.log(dateSearch)
        filterCar()
    })

    maximo.addEventListener('change', e => {
        dateSearch.max=e.target.value;
        console.log(dateSearch)
        filterCar()
    })

    puertas.addEventListener('change', e => {
        dateSearch.puertas=parseInt(e.target.value);
        console.log(dateSearch)
        filterCar()
    })

    transmision.addEventListener('change', e => {
        dateSearch.transmision=e.target.value;
        console.log(dateSearch)
        filterCar()
    })
    
    color.addEventListener('change', e => {
        dateSearch.color=e.target.value;
        console.log(dateSearch)
        filterCar()
    })
    
})


// Funciones

function showCar(autos){ // mostrar los carros en el DOM
    cleanHtml() // Elimina el Html previo
    autos.forEach ( auto => {  // iterar en el arreglo de autos    
         const autoHtml = document.createElement('p'); 
         const {marca, modelo , year , puertas ,transmision, precio , color } = auto;
            // crear el objeto en el HTML 
            autoHtml.textContent = `
                ${marca} - ${modelo} - ${year} - ${puertas} Puertas  -  Transmision: ${transmision} - Precio: ${precio} - Color: ${color}    
            `;
        result.appendChild(autoHtml);

    });

};


// Genera los años del select de años 
function fullSelect(){
    for(let i = max ; i >= min ; i-- ){
        // console.log(i);// recorre los años del 2022 hacia atras 
        // se crea la etiqueta option 
        const option= document.createElement('option'); 
        option.value=i; // se le da el valor 
        option.textContent= i; // agregar al DOM 
        year.appendChild(option); // se agrega al select 

    };
    
};

// Limpiar el Dom 
function cleanHtml(){ // Tener esto en cuenta
    while(result.firstChild){
        result.removeChild(result.firstChild);
    }
};

// Funcion que filtra en base a la busqueda 

function filterCar (){
    // Array Filter con un callback para filtrar los autos 
    const result = autos.filter(filterMark) // Encadenamiento de filter
                        .filter(filterYear)
                        .filter(filterMin)
                        .filter(filterMax)
                        .filter(filterDoor)
                        .filter(filterTrans)
                        .filter(filterColor)
  
    // debugeo
    console.log(result)

    // Mostrar resultado si no hay coincidecias

    if (result.length){
        showCar(result); // -> Toma el valor del filtro 
    }else{
        noFound();
    }

}     
function noFound(){

    cleanHtml();

    const msj= document.createElement('div');
    msj.classList.add('alerta','error');
    msj.textContent= 'No Hay Resultados, no se encuentra disponible';
    result.appendChild(msj)
};



// Funcion para comparar la marca 
function filterMark(autos){
   const {marca} = dateSearch; // destruturacion de objetos 
   if(marca) {
    return autos.marca === marca; // NOta : cuando se realiza la destructuracion solomente
                                  // hay que sleccionar el valor del objeto.
   }
   return autos;
};

// funcion compara los year 

// Nota en el Objeto de Autos Original  de la pagina los valores de year es tipo string 
// por como se comporta el dom , por ende , teenre en cuenta eso solucion ( parseInt())

function filterYear(autos){
    const { year } = dateSearch;
    if(year){
        return autos.year === year;
    }
    return autos;
};

// Filter min 

function filterMin(autos) {
    const {min}= dateSearch;
    if(min){
        return autos.precio >= min; 
    }
    return autos
};

// filter max

function filterMax(autos){
    const {max} =dateSearch
    if(max){
        return autos.precio <= max; 
    }
    return autos
};

function filterDoor (autos){
   const  {puertas}= dateSearch;
   if(puertas){
    return autos.puertas === puertas;
   }
   return autos 
};

function filterTrans (autos){
    const {transmision} = dateSearch;
    if(transmision){
        return autos.transmision === transmision
    }
    return autos 
};


function filterColor (autos){
    const {color}= dateSearch;

    if(color){
        return autos.color === color 
    }
   return autos
};











