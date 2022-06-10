// PAGIAN PARA SACAR SPINNER DE CARGA SPINKIT.COM 

// Varibles
const btnEnviar = document.querySelector('#enviar');
const forms = document.querySelector('#enviar-mail');
const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//Variables para campos 
const labelSend = document.querySelector('#email');
const labelAsunt = document.querySelector('#asunto');
const labelMsj = document.querySelector('#mensaje');

eventListener();

function eventListener (){
    
    // Arranca 
    document.addEventListener('DOMContentLoaded', iniciarApp); //Una vez que carge por primera vez
    
    //Campos de Formulario 
    labelSend.addEventListener('blur',validateForms); // verifica despues de salir del input 
    labelAsunt.addEventListener('blur',validateForms);
    labelMsj.addEventListener('blur',validateForms);

    


    // Enviar email
    forms.addEventListener('submit',sendEmail);
};

// Funciones 

// Funcion si existe algo en los inputs 
function validateForms(e){
    const error = document.querySelector('p.error');
    //ACCEDER A LOS VALORES DEL INPUT (e.target.value)
    if(e.target.value.length > 0 ){ // validar sin hay algo en el input 
       
        // Elimina los errores de la funcion
        while(error){
             error.remove();
             break; 
         }
        
        // borrar las clase que no se utilizan
        e.target.classList.remove('border', 'border-red-500'); 
        e.target.classList.add('border', 'border-green-500');
    }else{
        // Darle Estilo Con el Dom
        // e.target.style.borderBottomColor= 'red'; 

        // Estilos con libreria Tailwind 
        e.target.classList.remove('border', 'border-green-500'); //borrar las clase que no se utilizan
        e.target.classList.add('border', 'border-red-500');
        

        //  Funcion Mensaje de Error.\
        showError('Todos los campos son Obligatorios');
    
    }

        // Validar si es un email.
        
    if(e.target.type==='email'){ // Ver que tipo de dato contiene el  input
        console.log('hay que validarlo diferente');
       
        // Se toma el valor del input para validar regex
        if(regex.test(e.target.value)){ 

            //borrar las clase que no se utilizan
            e.target.classList.remove('border', 'border-red-500');    
            e.target.classList.add('border', 'border-green-500');
            
        }else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            showError('Email no valido')
            
        }
        
    }; 
    
    // Validar todos los campos para activar boton de enviar

    if(regex.test(labelSend.value) !== "" && labelAsunt.value !== "" && labelMsj.value !== ""){
        // debugeo
        console.log('Pasaste la validacion...');
        // BOTONES 
        btnEnviar.disabled= false; // Desabilita el boton de enviar
        btnEnviar.classList.remove('cursor-not-allowed','opacity-50'); // Clase para deshabilitar  el boton y no envie a ningu lado
    }


};

function iniciarApp(){
    console.log("Iniciando....") // debuggeo o prueba 
    btnEnviar.disabled= true; // Desabilita el boton de enviar
    btnEnviar.classList.add('cursor-not-allowed','opacity-50'); // Clase para TOCAR el boton y no envie a ningu lado
    };

function showError(msj){
    console.log('Error') // Verificar en la consola 
    const msjError= document.createElement('p');
    msjError.textContent= msj; 
    msjError.classList.add('border','border-red-500','background-red-100','text-red-500','p-3', 'mt-5', 'text-center','error'); // clases de tailWind
    
    // Para que el Mensaje de error se ejecute una sola vez 
    const errors = document.querySelectorAll('.error'); // .erro es una clase  querySelectorall  tiene el metodo length 
    if(errors.length === 0 ){
       //  forms.appendChild(msjError); // Posicion en la parte de abjjo

        // Posicion libre
        forms.insertBefore(msjError,document.querySelector('.mb-10'));// primer parametro lo que se va agregar 
                                                                      // el lugar de donde se va agregar
    };    

};

 

// Envia el email
function sendEmail (e){
    e.preventDefault(); // el submit por lo general  se le añade la accion ' envio por defecto'
    // MOSTRAR EL SPINNER 
    const spinner= document.querySelector("#spinner");
    spinner.style.display= 'flex';

    // despues de tres segundos ocultar sppiner y mostrar mensaje

    setTimeout ( () => {  // esta funcion se ejecuta una vez despues del tiempo 
                         // determinado
        spinner.style.display= 'none';

        // mensaje de Avsio 
        const msj = document.createElement('p');
        msj.textContent= 'Mensaje enviado con Exito !';
        msj.classList.add('text-center','my-10', 'p-3','bg-green-400','text-white','font-bold', 'uppercase');

        // insserta mensaje antes del spinner

        forms.insertBefore(msj,spinner);

        setTimeout( () => {
            msj.remove();
            reserForms();
            
        },5000);
        
        
    },  3000 );// cada segundo equivale 1000 ms

}

// Resetea el formulario
function reserForms (){
    forms.reset();
    iniciarApp();
};




// setInterval( () => { // Esta funcion se ejecuta cada x cantidad de tiempo: ejemplo 
//     console.log(" Se ejecuta cada 3 seg")
// }, 3000 );

