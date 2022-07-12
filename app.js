//variables
const savetask = document.querySelector('.save-btn');
const form = document.querySelector('.form')
const inputtext = document.querySelector('#todolist');
const tasklist = document.querySelector('.task-list');
const deleteall = document.querySelector('.deleteall');
let almacen = [];

//listeners
deleteall.addEventListener('click', clearTask);

tasklist.addEventListener('click', borrarGuardar)

window.onload = () => {
   almacen = JSON.parse(localStorage.getItem('todo'));
    
    if(almacen)
    almacen.forEach( item => {
        divCreator(item)  
        
    })
}

//formulario escucha por submit

form.addEventListener('submit', (e) => {
    e.preventDefault();
    //guarda valor del input text en item
    const item = inputtext.value
    //si item no existe alerta
    if(!item){
        alert('tienes que escribir una tarea')
        return;
    };
    //si no existe llama estas 2 funciones
    //guarda en localstorage
    guardadoLocal(item);
    //crea un div para las tareas y las desplega en una lista
    divCreator(item);


});
//funcion creadora de la lista de forma visual
function divCreator (item){

    //crea un div
    const divToDo = document.createElement('div');
    divToDo.classList.add('div-todo');

    //crea una tarea con el valor del input text
    //crea un elemento LI
    const li = document.createElement('li');
    const newToDo = item;
    li.textContent = newToDo;
    li.classList.add('list-flex');

    //crea el boton cerrar para eliminar tarea
    const buttonCerrar = document.createElement('button');
    buttonCerrar.classList.add('cerrar', 'button')
    buttonCerrar.textContent = 'cerrar';

    //crea un boton para marcar tarea como hecha
    const tareaCompletada = document.createElement('button');
    tareaCompletada.classList.add('button', 'completada')
    tareaCompletada.innerText = 'Completada';

    //agrega el li al div y los botones
    divToDo.appendChild(li);
    divToDo.appendChild(buttonCerrar);
    divToDo.appendChild(tareaCompletada);
    tasklist.appendChild(divToDo)
    inputtext.value = '';
}

//funcion borrar o guardar
function borrarGuardar(e){
    
    //define como tarea el target del evento
    const tarea = e.target;

    //si el la primera clase de tarea es === a cerrar, entonces borra
    if(tarea.classList[0] === 'cerrar' ){

        //guarda como item el elemento padre de tarea.
        const item = tarea.parentElement;
        item.classList.add('borrarTarea');
        //guarda como index el indexOF el valor de li (primer elemento del div)
        const index = almacen.indexOf(item.children[0].textContent);
        //elimina del array almacen el elemento index
        almacen.splice(index, 1);
       //reemplaza en el localStorage el array almacen modificado
        localStorage.setItem('todo',JSON.stringify(almacen));

        // activa funcion luego de haberse completado la transicion de 'borrar tarea'
        item.addEventListener('transitionend',function (){
            //elimina visualmente el elemento div
            item.remove();
        })
    }

    if(tarea.classList[1] === 'completada'){
        tarea.parentElement.classList.toggle('markarcompletada')
    }


}

    //funcion de borrar todo
function clearTask (){
    
    //mientras lista de tarea tenga un primer hijo, lista de tarea eliminara su primer hijo
    //esto hace que se borren todos
    while (tasklist.firstChild) {
        tasklist.removeChild(tasklist.firstChild);
    }
    //si existe datos en almacen entonces los borra todos del local storage
    if(almacen){
        localStorage.clear();
    }
}
//funcion de guardar en local storage
//pasa item dependiendo de donde se llame, se llama al window.onload y en el submit del formulario
function guardadoLocal (item){
    //si almacen es null entonces covierte almacen en un array vacio
    if(almacen === null){
        almacen = [];
    }
    //si no esta vacio agrega un item nuevo al array y guarda el nuevo array en localstorage
    almacen.push(item);
    localStorage.setItem('todo', JSON.stringify(almacen));

}