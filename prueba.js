class RegistroManager {
    constructor(storageKey) {
        this.storageKey = storageKey;
        this.registros = this.cargarRegistros();
    }

    agregarRegistro(nuevoRegistro) {
        this.registros.push(nuevoRegistro);
        this.guardarRegistros();
    }

    obtenerRegistros() {
        return this.registros;
    }

    limpiarRegistros() {
        this.registros = [];
        this.guardarRegistros();
    }

    cargarRegistros() {
        const registrosString = localStorage.getItem(this.storageKey);
        return registrosString ? JSON.parse(registrosString) : [];
    }

    guardarRegistros() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.registros));
    }
}


const registroManager = new RegistroManager('misRegistros');

// Función para agregar un registro desde el formulario
function agregarRegistro() {
    console.log('Ingresa');
    const nombre = document.getElementById('inputName').value;
    const email = document.getElementById('inputEmail4').value;
    const contraseña = document.getElementById('inputPassword4').value;
    const direccion = document.getElementById('inputAddress').value;
    const tel = document.getElementById('celular').value;

    // Crear un nuevo registro
    const nuevoRegistro = { nombre, email, contraseña, direccion, tel };
    console.log(nuevoRegistro);
    // Agregar el registro a la lista
    registroManager.agregarRegistro(nuevoRegistro);

    // Limpiar el formulario
    document.getElementById('inputName').value = '';
    document.getElementById('inputEmail4').value = '';
    document.getElementById('inputPassword4').value = '';
    document.getElementById('inputAddress').value = '';
    document.getElementById('celular').value = '';

    // Actualizar la lista de registros en la interfaz
    actualizarListaRegistros();
}

// Función para actualizar la lista de registros en la interfaz
function actualizarListaRegistros() {
    console.log('entra a listar');
    console.log('limpia la lista');
    const tableBody = document.getElementById('tbody');
    tableBody.innerHTML = '';
    // Obtener registros y mostrarlos en la tabla
    const registros = registroManager.obtenerRegistros();
    
    console.log('imprime el nombre');
    registros.forEach(registro => {
        console.log(registro.nombre);
        let name = `<td>${registro.nombre}</td>`;
        let correo = `<td>${registro.email}</td>`;
        let direccion = `<td>${registro.direccion}</td>`;
        let telefono = `<td>${registro.tel}</td>`;
        tableBody.innerHTML  += `<tr>${name + correo + direccion + telefono}</tr>`;
    });
}

// Mostrar la lista de registros al cargar la página
actualizarListaRegistros();