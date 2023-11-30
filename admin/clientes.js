let tablaClientes = document.getElementById("listaClientes");
let nombreInput = document.getElementById("nombre");
let emailInput = document.getElementById("email");
let telefonoInput = document.getElementById("telefono");
let formularioClientes = document.getElementById("formularioClientes");
let contenedorBotones = document.getElementById("botones");
let botonAgregar = document.getElementById("btnAgregar")

const limpiarFormulario = () =>{
    nombreInput.value = ''
    emailInput.value = ''
    telefonoInput.value = ''
}

const getClientes = () => {
    axios.get("http://localhost:3001/clientes/")
        .then((res) => {
            listaClientes.innerHTML = ""; // Limpiar la tabla antes de agregar los nuevos clientes
            res.data.forEach((cliente) => {
                listaClientes.innerHTML += `
                <tr>
                    <td>${cliente.id}</td>
                    <td>${cliente.Nombre}</td>
                    <td>${cliente.Email}</td>
                    <td>${cliente.Telefono}</td>
                    <td class='d-flex'>
                        <button class="btn btn-warning me-2" onclick="prepararEditarCliente(${cliente.id})">Editar</button>
                        <button class="btn btn-danger" onclick="eliminarCliente(${cliente.id})">Eliminar</button>
                    </td>
                    </tr>
                `;
            });
        })
        .catch((e) => console.log(e));
};


const eliminarCliente = (id) => {
    axios.delete("http://localhost:3001/clientes/" + id)
      .then(res => console.log(res))
      .catch(e => console.log(e))
  }


  const editarCliente = (id) => {
    // Realiza una solicitud PUT a la URL del alquiler específico con el ID proporcionado
    axios.put("http://localhost:3001/clientes/" + id,{
        "ClienteId": nombreInput.value,
        "EmailId": emailInput.value,
        "Telefono": telefonoInput.value,
        
    }
    )
    .then(res => {
        // Limpia los valores de los campos del formulario después de la edición
        limpiarFormulario()
        getClientes()
    }
    )
    .catch(e => console.log(e))
}

const prepararEditarCliente = (id) => {
    axios
      .get("http://localhost:3001/clientes/" + id)
      .then((res) => {
          console.log(res.data)
          botonAgregar.style = "display: none"        
          contenedorBotones.innerHTML = `
          <button class ='btn btn-warning w-100 mt-3' onclick='editarAlquiler(${id})'>Aceptar</button>`;        
            nombreInput.value = res.data.Nombre
            emailInput.value = res.data.Email
            telefonoInput.value = res.data.Telefono
      })
      .catch((e) => console.log(e));
  };

const agregarClientes = () => {
    axios.post("http://localhost:3001/clientes/", {
            "Nombre": nombre.value,
            "Email": email.value,
            "Telefono": telefono.value
        })
        .then(() => {
            // Limpiar los campos después de agregar el cliente
            nombreInput.value = "";
            emailInput.value = "";
            telefonoInput.value = "";
            getClientes(); // Actualizar la lista de clientes después de agregar uno nuevo
        })
        .catch((e) => console.log(e));
};

// Obtener la lista de clientes al cargar la página
getClientes();