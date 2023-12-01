let tablaClientes = document.getElementById("listaClientes");
let nombreInput = document.getElementById("nombre");
let emailInput = document.getElementById("email");
let telefonoInput = document.getElementById("telefono");
let formularioClientes = document.getElementById("formularioClientes");
let contenedorBotones = document.getElementById("botones");
let botonAgregar = document.getElementById("btnAgregar");

const limpiarFormulario = () => {
  nombreInput.value = "";
  emailInput.value = "";
  telefonoInput.value = "";
};

const getClientes = () => {
  axios
    .get("http://localhost:3001/clientes/")
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
  if (confirm(`Está seguro que quiere eliminar el cliente`)) {
    axios
      .delete("http://localhost:3001/clientes/" + id)
      .then((res) => alert("se elimino el cliente"))
      .catch((e) => console.log(e));
  }
};

const contarArrobas = (string) =>{
    let contador = 0
    for (let i = 0; i<string.length; i++){
        if (string[i] === '@'){
            contador ++
        }        
    }
    return contador
}

const editarCliente = (id) => {
  if (nombreInput.value === "" || email.value === "" || telefono.value === "") {
    alert("Debe completar los campos");
  } 
  else if(!emailInput.value.includes("@") || emailInput.value.length <3 || contarArrobas(emailInput.value)>1){
    alert("Ingrese un email con formato correcto \n Ejemplo: Juan@mail.com ")
  }
  else if(isNaN(telefonoInput.value) || telefonoInput.value.length<7 || telefonoInput.value.length >15 ){
    alert("Ingrese un numero telefonico valido\nMinimo: 7 números\nMáximo: 15 números")
  }
  else {
    // Realiza una solicitud PUT a la URL del alquiler específico con el ID proporcionado
    axios
      .put("http://localhost:3001/clientes/" + id, {
        Nombre: nombreInput.value,
        Email: emailInput.value,
        Telefono: telefonoInput.value,
      })
      .then((res) => {
        // Limpia los valores de los campos del formulario después de la edición
        limpiarFormulario();
        getClientes();
      })
      .catch((e) => console.log(e));
  }
};

const prepararEditarCliente = (id) => {
  axios
    .get("http://localhost:3001/clientes/" + id)
    .then((res) => {
      console.log(res.data);
      botonAgregar.style = "display: none";
      contenedorBotones.innerHTML = `
          <button class ='btn btn-warning w-100 mt-3' type='button' onclick='editarCliente(${id})'>Aceptar</button>`;
      nombreInput.value = res.data.Nombre;
      emailInput.value = res.data.Email;
      telefonoInput.value = res.data.Telefono;
    })
    .catch((e) => console.log(e));
};

const agregarClientes = () => {
   
  if (nombre.value === "" || email.value === "" || telefono.value === "") {
    alert("Debe completar los campos");
  }
  else if(!emailInput.value.includes("@") || emailInput.value.length <3 || contarArrobas(emailInput.value)>1){
    alert("Ingrese un email con formato correcto \n Ejemplo: Juan@mail.com ")
  }
  else if(isNaN(telefonoInput.value) || telefonoInput.value.length<7 || telefonoInput.value.length >15 ){
    alert("Ingrese un numero telefonico valido\nMinimo: 7 números\nMáximo: 15 números")
  } else {
    axios
      .post("http://localhost:3001/clientes/", {
        Nombre: nombre.value,
        Email: email.value,
        Telefono: telefono.value,
      })
      .then(() => {
        // Limpiar los campos después de agregar el cliente
        nombreInput.value = "";
        emailInput.value = "";
        telefonoInput.value = "";
        getClientes(); // Actualizar la lista de clientes después de agregar uno nuevo
      })
      .catch((e) => console.log(e));
  }
};
botonAgregar.addEventListener("click",agregarClientes)
// Obtener la lista de clientes al cargar la página
getClientes();
