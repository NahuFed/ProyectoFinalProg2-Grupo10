let tablaAlquileres = document.getElementById("tablaAlquileres");
let selectCliente = document.getElementById("selectCliente");
let selectPeliculas = document.getElementById("selectPeliculas");
let fechaAlquiler = document.getElementById("fechaAlquiler")
let fechaDevolucion = document.getElementById("fechaDevolucion")
let formularioCrud = document.getElementById("formularioCrud")
let estado = document.getElementById("estado")
let comentario = document.getElementById("comentario")
let botonAgregar = document.getElementById("agregar")


const getClientes = () => {
  axios
    .get("http://localhost:3001/clientes")
    .then((res) => {
      res.data.forEach((cliente) => {
        selectCliente.innerHTML += `
                <option value = '${cliente.id}'>${cliente.Nombre}</option>
            `;
      });
    })
    .catch((e) => console.log(e));
};

const getAlquiler = (id) => {
  axios
    .get("http://localhost:3001/alquileres/" + id)
    .then((res) => res.data)
    .catch((e) => console.log(e));
};

const getPeliculas = () => {
  axios
    .get("http://localhost:3001/peliculas")
    .then((res) => {
      res.data.forEach((pelicula) => {
        selectPelicula.innerHTML += `
            <option value = '${pelicula.id}'>${pelicula.Nombre}</option>
            `;
      });
    })
    .catch((e) => console.log(e));
};

const borrarAlquiler = (id) =>{    
    axios.delete("http://localhost:3001/Alquileres/"+id)
    .then(res=>console.log(res))
    .catch(e=>console.log(e))
}

const getAlquileres = () => {
  axios
    .get("http://localhost:3001/alquileres")
    .then((res) => {
      res.data.forEach((alquiler) => {
        // console.log(pelicula.Nombre)
        tablaAlquileres.innerHTML += `
            <tr>
            <td>${alquiler.id}</td>
            <td>${alquiler.ClienteId}</td>
            <td>${alquiler.PeliculaId}</td>
            <td>${alquiler.FechaAlquilado}</td>
            <td>${alquiler.FechaDevolucionEsperada}</td>
            <td>${alquiler.Estado}</td>
            <td>${alquiler.Comentarios}</td>
            <td class='d-flex'> <button class="btn btn-warning me-2" onclick="editarAlquiler(${alquiler.id})">Editar</button><button class="btn btn-danger" onclick="borrarAlquiler((${alquiler.id}))">Borrar</button></td>
        </tr>
            `;
      });
    })
    .catch((e) => console.log(e));
};

const agregarAlquiler = (e) =>{
e.preventDefault()
    axios.post("http://localhost:3001/alquileres/",{      
      "ClienteId": selectCliente.value,
      "PeliculaId": selectPelicula.value,
      "FechaAlquilado": fechaAlquiler.value,
      "FechaDevolucionEsperada": fechaDevolucion.value,
      "Estado": estado.value,
      "Comentarios": comentario.value
    })
    .then(res => console.log(res))
    .catch(e=>console.log(e))
}

getPeliculas();
getClientes();
getAlquileres();

botonAgregar.addEventListener("click",agregarAlquiler)