const tablaClientes = document.getElementById("listaClientes");
const nombreInput = document.getElementById("nombre");
const emailInput = document.getElementById("email");
const telefonoInput = document.getElementById("telefono");
const formularioClientes = document.getElementById("formularioClientes");

const getClientes = () => {
    axios
        .get("http://localhost:3001/clientes")
        .then((res) => {
            listaClientes.innerHTML = ""; // Limpiar la tabla antes de agregar los nuevos clientes
            res.data.forEach((cliente) => {
                listaClientes.innerHTML += `
                    <li class="list-group-item">
                        Nombre: ${cliente.Nombre}, Email: ${cliente.Email}, Teléfono: ${cliente.Telefono}
                    </li>
                `;
            });
        })
        .catch((e) => console.log(e));
};

const agregarClientes = () => {
    axios
        .post("http://localhost:3001/clientes", {
            "Nombre": nombreInput.value,
            "Email": emailInput.value,
            "Telefono": telefonoInput.value
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