"use strict";
//Variables Globales
let resultado;
let errorPresente = 0;
let p_operacion = document.createElement('p');



function genOperacion() { //test OK
  let numSimbolo = Math.floor(Math.random() * 3) + 1;
  let simbolo;

  switch (numSimbolo) {
    case 1:
      simbolo = "+";
      break;
    case 2:
      simbolo = "-";
      break;
    case 3:
      simbolo = "*";
      break;
  }

  let numeroAleatorio1 = Math.floor(Math.random() * 10) + 1;
  let numeroAleatorio2 = Math.floor(Math.random() * 10) + 1;

  // Crear un elemento parrafo con la operacion aleatoria
  p_operacion.innerHTML = "Resuelve: " + numeroAleatorio1 + " " + simbolo + " " + numeroAleatorio2 + "=";
  robot.before(p_operacion);

  switch (numSimbolo) {
    case 1:
      resultado = numeroAleatorio1 + numeroAleatorio2;
      break;
    case 2:
      resultado = numeroAleatorio1 - numeroAleatorio2;
      break;
    case 3:
      resultado = numeroAleatorio1 * numeroAleatorio2;
      break;
  }
}




function comprobarCampos() { //test OK
  let validarNombre = /^[A-Za-z ]{1,15}$/;
  let validarApellidos = /^[A-Za-z ]{1,30}$/;
  let validarUsuario = /^[a-zA-Z0-9._-]{4,20}$/;
  let validarEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  let validarContrasena = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[¡!¿?$%&@#*+-])[A-Za-z0-9¡!¿?$%&@#*+-]{5,15}$/;

  //Campo nombre
  if (!validarNombre.test(nombre.value)) {
    mostrarError(nombre, " El nombre no es valido.");
    nombre.value = "";
  } else {
    ocultarError(nombre);
  }

  //Campo apellidos
  if (!validarApellidos.test(apellidos.value)) {
    mostrarError(apellidos, " Los apellidos no son validos.");
    apellidos.value = "";
  } else {
    ocultarError(apellidos);
  }

  //Campo usuario
  if (!validarUsuario.test(usuario.value)) {
    mostrarError(usuario, " El usuario no es valido.");
    usuario.value = "";
  } else {
    ocultarError(usuario);
  }

  //Campo contrasena
  if (!validarContrasena.test(contrasena.value)) {
    mostrarError(contrasena, " La contraseña no es valida.");
    contrasena.value = "";
  } else {
    ocultarError(contrasena);
  }

  //Campo email
  if (!validarEmail.test(email.value)) {
    mostrarError(email, " El email no es valido.");
    email.value = "";
  } else {
    ocultarError(email);
  }

  //Campo robot
  if (robot.value != resultado) {
    mostrarError(robot, " El resultado es incorrecto.");
  } else {
    ocultarError(robot);
  }

  //Mostrar error General
  if (errorPresente > 0) {
    errorGeneral.textContent = "¡Oh no! Parece que algo salió mal. :( ";
  } else {
    errorGeneral.textContent = "";
  }

  //Cada vez que realizo las comprobaciones, vacio el campo y genero una nueva operacion
  robot.value = "";
  genOperacion();
}


function mostrarError(elemento, mensaje) {

  if (elemento.className != "errorCampo") {//Compruebo si ya tiene el error
    let span_ErrorCampo = document.createElement('span');
    span_ErrorCampo.className = "red";
    span_ErrorCampo.setAttribute('data-error', 'true');//Lo uso para identificar el span y luego poder borrarlo
    span_ErrorCampo.textContent = mensaje;

    //Para el mensaje de error general
    errorPresente++;

    //Para el marco del input
    elemento.className = "errorCampo";

    let labelElemento = elemento.previousElementSibling; //Para buscar el label anterior 

    if (labelElemento.tagName !== "LABEL") {
      labelElemento = elemento.previousElementSibling.previousElementSibling;//Elijo el dos veces anterior para el caso robot
    }

    labelElemento.appendChild(span_ErrorCampo);
  }
}

function ocultarError(elemento) {
  let contenedorError = elemento.previousElementSibling;

  if (contenedorError.tagName !== "LABEL") {
    contenedorError = elemento.previousElementSibling.previousElementSibling;//Elijo el dos veces anterior para el caso robot
  }

  // Busco el span de error dentro del contenedor
  let spanError = contenedorError.querySelector('[data-error="true"]');

  if (spanError) {
    spanError.remove();
    elemento.classList.remove("errorCampo");
    //Para el mensaje de error general
    errorPresente--;
  }
}


genOperacion();

