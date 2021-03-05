const generarInputs = () => {
  let number = parseInt(document.getElementById("number").value);
  let input = "";
  for (let i = 0; i < number; i++) {
    input += `<label class="label" for="number">Número de proceso</label>
                    <input class="input" type="number" name="number" id="number${i}">`;
  }
  let e = document.getElementById("ordenamiento");
  let ordenamiento = e.value;
  switch (ordenamiento) {
    case "roundRobin":
      input += `<label class="label" for="quantum">Ingrese el quantum</label>
            <input class="input" type="number" name="quantum" id="quantum">
             <button onclick="roundRobin()">Round Robin</button>`;
      break;
    case "masCorto":
      input +=
        '<button class="button" onclick="masCorto()">Mas corto primero</button>';
      break;
    case "prioridad":
      generarInputPrioridad();
      break;
    case "llegada":
      input +=
        '<button class="button" onclick="llegada()">Orden de llegada</button>';
  }
  document.getElementById("input-number").innerHTML = input;
};


function llegada() {
  let cuadros = '';
  let input="";
  let number = parseInt(document.getElementById("number").value);
  lista = [];
  for (let i = 0; i < number; i++) {
    lista.push(parseInt(document.getElementById(`number${i}`).value));
    cuadros +=  `
                    <div class="cuadro" style="background-color: rgb(255, 255, ${100*i})">Proceso numero   ${document.getElementById(`number${i}`).value}</div>
                `
  }
 
  let tiempo=tiempo_espera(lista);
  let retorno=tiempo_retorno(lista);
  console.log(tiempo, retorno);
  input+=`<label class="label" for="quantum">Promedio tiempo de espera total ${tiempo}</label>`

  input+=`<label class="label" for="quantum">Promedio tiempo de retorno total ${retorno}</label>`
 
}
function masCorto() {
  let lista = [];
  let input="";
  let number = parseInt(document.getElementById("number").value);
  let cuadros = '';
  let cont=0;
let menor=100;
  for (let i = 0; i < number; i++) {
    
  
    if(lista[i]<menor){
      menor=parseInt(document.getElementById(`number${i}`).value);
      cont=i;
      lista.shift(parseInt(document.getElementById(`number${i}`).value))
    }else {
      lista.push(parseInt(document.getElementById(`number${i}`).value));
    
    }
    cuadros +=  `
                    <div class="cuadro" style="background-color: rgb(255, 255, ${100*i})">Proceso numero   ${document.getElementById(`number${i}`).value}</div>
                `
    
  }
  let listaNueva= [];
  listaNueva=ordenar(lista);
  for (let i = 0; i < listaNueva.length; i++) {
    cuadros +=  `
                    <div class="cuadro" style="background-color: rgb(255, 255, ${100*i})">Proceso numero   ${document.getElementById(`number${i}`).value}</div>
                `;
    
  }
  
  let tiempo= tiempo_espera(listaNueva);
  input+=`<label class="label" for="quantum">Promedio tiempo de espera total ${tiempo}</label>`
  let retorno=tiempo_retorno(listaNueva);
  input+=`<label class="label" for="quantum">Promedio tiempo de retorno total ${retorno}</label>`
  console.log(tiempo,retorno);
 
}
function ordenar(lista){ 
  let menor= lista[0];
for (let index = 0; index < lista.length; index++) {
    if(lista[index]<menor){
      menor=lista[index];
    }
  
}
let listaNueva=[];
listaNueva[0]=menor; 
let pos=1;
for (let index = 0; index < lista.length; index++) {
  if(lista[index]!=listaNueva[0]){
    listaNueva.push(lista[index]);
  }
  
  
}
return listaNueva;
}
/* function prioridad() {
  let lista = [];
  aux = 0;
  for (let i = 0; i < number; i++) {
    lista.push(parseInt(document.getElementById(`number${i}`).value));
  }
  for (let i = 0; i < lista.lengt; i++) {
    for (let j = 0; j < lista.length; j++) {
      if (lista[i] < lista[j]) {
        aux = proceso[i];
        proceso[i] = proceso[j];
        proceso[j] = aux;
      }
    }
  }
} */

function roundRobin() {
  let lista = [];
  let listaAux = [];
  let cuadros = '';
  let input="";
  let number = parseInt(document.getElementById("number").value);
  let quantum = parseInt(document.getElementById("quantum").value);
  let suma=0;
  let contador=0;
  let acumulador=0;
  for (let i = 0; i < number; i++) {
    lista.push(parseInt(document.getElementById(`number${i}`).value));
    suma+=parseInt(document.getElementById(`number${i}`).value);
  }
 console.log(lista);
 console.log(quantum);
  while(contador<6){ 
  for (let index = 0; index < lista.length; index++) {
    if(lista[index]>quantum){
      console.log(lista[index]);
      acumulador+=quantum; 
      lista[index]-=quantum;
      console.log(lista[index]);
      console.log("Acumulador if",acumulador);
      listaAux.push(acumulador);
    }else if(lista[index]<quantum && lista[index]>=0){
      acumulador+=lista[index];
      lista[index]=0;
      listaAux.push(acumulador);
      console.log("Acumulador else",acumulador);
    }
    contador++;
  }

  console.log(listaAux);
  
  let tiempo= tiempo_espera(listaAux);
  input+=`<label class="label" for="quantum">Promedio tiempo de espera total ${tiempo}</label>`
  let retorno=tiempo_retorno(listaAux);
  input+=`<label class="label" for="quantum">Promedio tiempo de retorno total ${retorno}</label>`
 
}
}
function tiempo_retorno(array) {
  let tiempo = 0;
  let acumulador=0;
  for (let index = 0; index < array.length; index++) {
    tiempo =tiempo+ array[index];
    /* console.log(tiempo); */
    acumulador+=tiempo;
  }
  return (acumulador / (array.length));
}
function tiempo_espera(array) {
  let tiempo = 0;
  let acumulador=0;
  for (let index = 0; index < array.length - 1; index++) {
    //console.log(array[index]);
    tiempo= tiempo+ array[index];
    acumulador+=tiempo;
    
  }
  
  return (acumulador / (array.length));
}

function generarInputPrioridad() {
  let number = parseInt(document.getElementById("number").value);
  let input = "";
  for (let i = 0; i < number; i++) {
    input += `  <label class="label" for="number">Número de proceso</label>
                    <input class="input" type="number" name="number" id="number${i}">
                    <label class="label" for="priori">Número de prioridad</label>
                    <input class="input" type="number" name="priori" id="priori${i}">
                    `;
  }
  input += `<button class="button" onclick="prioridad2()">Prioridad</button>`;
  document.getElementById("input-number").innerHTML = input;
}

function prioridad2() {
  let cuadros = '';
  let input="";
  let number = parseInt(document.getElementById("number").value);
  let lista = [];
  let listaValores=[];
  let aux;
  for (let i = 0; i < number; i++) {
    let objeto = {};
    objeto.numero = parseInt(document.getElementById(`number${i}`).value);
    objeto.prioridad = parseInt(document.getElementById(`priori${i}`).value);
    lista.push(objeto);
   
  }
  ordenarLista(lista);
 
 
}
function ordenarLista(lista){
  let aux=0;
  console.log(lista.prioridad);
  for (let index = 0; index < lista.length; index++) {
    for (let j = 0; j < lista.length; j++) {
      console.log(lista[j].prioridad);
      if (lista[index].prioridad < lista[j].prioridad) {
        aux = lista[index];
        lista[index] = lista[j];
        lista[j] = aux;
      }
      
    }
    console.log("lista f",lista);
  }
  let listaNueva=[];
  for (let index = 0; index < lista.length; index++) {
    listaNueva.push(lista[index].numero);
    
  }
  let input="";
  console.log("nueva",listaNueva);
  let tiempo= tiempo_espera(listaNueva);
  input+=`<label class="label" for="quantum">Promedio tiempo de espera total ${tiempo}</label>`
  let retorno=tiempo_retorno(listaNueva);
  input+=`<label class="label" for="quantum">Promedio tiempo de retorno total ${retorno}</label>`
  console.log(tiempo,retorno);
     /*  cuadros +=  `
      <div class="cuadro" style="background-color: rgb(255, 255, ${100*i})">Proceso numero   ${document.getElementById(`number${i}`).value}</div>` */

}
