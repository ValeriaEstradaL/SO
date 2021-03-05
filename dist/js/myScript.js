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

function consola() {
  console.log("error");
}
function llegada() {
  let number = parseInt(document.getElementById("number").value);
  lista = [];
  for (let i = 0; i < number; i++) {
    lista.push(parseInt(document.getElementById(`number${i}`).value));
  }
  console.log(lista);
  tiempo_espera(lista);
  tiempo_retorno(lista);
}
function masCorto() {
  let lista = [];
  let number = parseInt(document.getElementById("number").value);
  let cuadros = '';

  for (let i = 0; i < number; i++) {
    lista.push(parseInt(document.getElementById(`number${i}`).value));
    cuadros +=  `
                    <div class="cuadro" style="background-color: rgb(255, 255, ${100*i})">${document.getElementById(`number${i}`).value}</div>
                `
  }
  document.getElementById("grafico").innerHTML = cuadros;
  console.log(lista.sort());
}

function prioridad() {
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
}

function roundRobin() {
  let lista = [];
  let listAux = [];
  let number = parseInt(document.getElementById("number").value);
  let quantum = parseInt(document.getElementById("quantum").value);

  for (let i = 0; i < number; i++) {
    lista.push(parseInt(document.getElementById(`number${i}`).value));
  }

  for (let i = 0; index < array.length; index++) {
    lista[i] -= quantum;
    listAux.append(lista[i]);
    lista.pop[i];
  }

  tiempo_retorno(listAux);
  tiempo_espera(listAux);
}
function tiempo_retorno(array) {
  tiempo = 0;
  for (let index = 0; index < array.length; index++) {
    tiempo += array[index];
  }
  return tiempo / array.length;
}
function tiempo_espera(array) {
  tiempo = 0;
  for (let index = 0; index < array.length - 1; index++) {
    tiempo += array[index];
  }
  return tiempo / array.length;
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
  let number = parseInt(document.getElementById("number").value);
  let lista = [];
  for (let i = 0; i < number; i++) {
    let objeto = {};
    objeto.numero = parseInt(document.getElementById(`number${i}`).value);
    objeto.prioridad = parseInt(document.getElementById(`priori${i}`).value);
    lista.push(objeto);
  }
  let aux;
  for (let i = 0; i < lista.lengt; i++) {
    for (let j = 0; j < lista.length; j++) {
      if (lista[i].prioridad > lista[j].prioridad) {
        aux = lista[i];
        lista[i] = lista[j];
        lista[j] = aux;
      }
    }
  }
  console.log(lista);
}
