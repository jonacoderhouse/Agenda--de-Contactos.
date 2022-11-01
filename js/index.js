

// OBJETO QUE VOY A CREAR
class DatosObjeto {
    constructor(nombre, apellido, correo, telefono, fecha) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.telefono = telefono;
        this.fecha = fecha;
    }
}
// DOM
const boxFormularioDatos = document.querySelector(`.box-form`)
const formularioDatos = document.querySelector(`#formularioDatos`)
const nombreInput = document.querySelector(`#inputNombre`)
const apellidoInput = document.querySelector(`#inputApellido`)
const contenedorDatos = document.querySelector(`#contenedorMensaje`)
const correoInput = document.querySelector(`#correoInput`)
const inputTel = document.querySelector(`#inputTel`)
const inputFecha = document.querySelector(`#inputFecha`)
const formularioUsurario = document.querySelector(`#formulario-usuario`)
const userUsuario = document.querySelector(`#user`)

let usuario;// Variable global donde voy asignar nombre de usuario en login.

//formulario y contendor  oculto inicialmente.
boxFormularioDatos.classList.toggle(`oculto`);
contenedorDatos.classList.toggle(`oculto`);

const funcionVisbible = () => {
    boxFormularioDatos.classList.toggle(`visible`)
    contenedorDatos.classList.toggle(`visible`)
};//Muestra el contendor de datos y el formulario de datos.

formularioUsurario.onsubmit = (e) => {
    iniciarSistema(e)
};//Creo un evento type submit en el formularioUsuario, activando funcion
//iniciarSistema con event.

//funcion iniciar sistema
const iniciarSistema = (e) => {
    contenedorDatos.innerHTML = "";
    e.preventDefault();
    usuario = userUsuario.value;
    console.log(usuario); // asigne el valor del input de login a la VARIABLE GLOBLA USUARIO
    let usuarioStorage = JSON.parse(localStorage.getItem(usuario));
    console.log(usuarioStorage);
    //asigno variavle al localstorage getitem de usuario para verificar con IF si tiene o no datos cargados.
    if (usuarioStorage == null) {
        Swal.fire({
            title: 'BIENVENID@',
            text: `No tienes ningun contacto `,
            icon: 'success',
            confirmButtonText: 'Iniciemos '
        });
    }
    else {
        mostrarDatosAlmacenados(usuarioStorage)
        console.log(usuarioStorage);

    }
    funcionVisbible()
};

// funcion para mostrar datos almacenados
mostrarDatosAlmacenados = (usuarioStorage) => {
    contenedorDatos.innerHTML = "";
    // Recorro con for el obejto que tiene asigando a variable usuarioStorage en caso de tener algo guardado previamente
    for (let datosCargados of usuarioStorage) {
        let li = document.createElement("li");
        li.className = "lista"
        li.innerHTML = `
        <span class="color"> Nombre </span>: ${datosCargados.nombre.toUpperCase()}  /
        <span class="color">Apellido </span>: ${datosCargados.apellido.toUpperCase()}  /
        <span class="color">Correo </span>: ${datosCargados.correo.toUpperCase()}  /
        <span class="color">Telefno </span>: ${datosCargados.telefono}  /
        <span class="color">Fecha nacimeinto </span>: ${datosCargados.fecha}
        `
        let botonBorrar = crearBotonEliminar(datosCargados);
        li.appendChild(botonBorrar);
        contenedorDatos.appendChild(li)
    }
}

//funcion para crear Boton dinaminacamente.
const crearBotonEliminar = (datosCargados) => {
    let botonBorrar = document.createElement("button");// <button>Borrar</button>
    botonBorrar.className = "botonBorrar"
    botonBorrar.innerText = "Eliminar";
    botonBorrar.onclick = () => {
        listaEliminada(datosCargados)
    }
    return botonBorrar;
}

// funcion eliminar lista recorriendo el [] con filter.
const listaEliminada = (datosCargados) => {
    const LocalStorage = JSON.parse(localStorage.getItem(usuario))
    console.log(`hola estoy aca`);
    let Array = LocalStorage.filter(e => e.nombre != datosCargados.nombre)
    localStorage.setItem(usuario, JSON.stringify(Array))
    mostrarDatosAlmacenados(Array)
}


// Funcion ordenar por A B C
let acomodar = (localStorageDatosAlamcenados) => {
    localStorageDatosAlamcenados.sort((a, b) => {
        if (a.nombre > b.nombre) {
            return 1;
        }
        if (a.nombre < b.nombre) {
            return -1;
        }
        return 0;
    })
}

//-----------e. submit del formulario de carga que activa la funcion agregar datos

formularioDatos.onsubmit = (e) => {
    agregarDatos(e)
}

agregarDatos = (e) => {
    e.preventDefault();
    //Consulto nuevamente el locaStorage
    //creo un objeto de mi CLASS CONTRUCTORA
    let Datos = new DatosObjeto(nombreInput.value, apellidoInput.value, correoInput.value, inputTel.value, inputFecha.value)
    let localStorageDatosAlamcenados = JSON.parse(localStorage.getItem(usuario))

    if (localStorageDatosAlamcenados === null) {
        localStorage.setItem(usuario, JSON.stringify([Datos]))
        console.log(`estoy aca`);
        mostrarDatosAlmacenados([Datos]);
    }
    else {
        localStorageDatosAlamcenados.push(Datos)
        acomodar(localStorageDatosAlamcenados)
        console.log(localStorageDatosAlamcenados);
        localStorage.setItem(usuario, JSON.stringify(localStorageDatosAlamcenados))
        mostrarDatosAlmacenados(localStorageDatosAlamcenados);

    }
    e.target.reset();
}