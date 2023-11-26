let tablaAlquileres = document.getElementById("tablaAlquileres");
let selectCliente = document.getElementById("selectCliente");
let selectPeliculas = document.getElementById("selectPeliculas");
let fechaAlquiler = document.getElementById("fechaAlquiler")
let fechaDevolucion = document.getElementById("fechaDevolucion")
let formularioCrud = document.getElementById("formularioCrud")
let estado = document.getElementById("estado")
let comentario = document.getElementById("comentario")
let botonAgregar = document.getElementById("agregar")
let contenedorBotones = document.getElementById("botones")

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

const editarAlquiler=(id) =>{
    axios.put("http://localhost:3001/alquileres/" + id,
    {
    "ClienteId": selectCliente.value,
      "PeliculaId": selectPelicula.value,
      "FechaAlquilado": fechaAlquiler.value,
      "FechaDevolucionEsperada": fechaDevolucion.value,
      "Estado": estado.value,
      "Comentarios": comentario.value
    }
    )
    .then(res =>{
        selectCliente.value = ''
        selectPelicula.value = ''
        fechaAlquiler.value = ''
        fechaDevolucion.value = ''
        estado.value = ''
        comentario.value =''
        getPeliculas()
    }
        )
    .catch(e=>console.log(e))
}

const prepararEditarAlquiler = (id) => {
  axios
    .get("http://localhost:3001/alquileres/" + id)
    .then((res) => {
        console.log(res.data)
        botonAgregar.style = "display: none"        
        contenedorBotones.innerHTML = `
        <button class ='btn btn-warning w-100 mt-3' onclick='editarAlquiler(${id})'>Aceptar</button>`;        
        selectCliente.value = res.data.ClienteId
        selectPelicula.value = res.data.PeliculaId
        fechaAlquiler.value = res.data.FechaAlquilado
        fechaDevolucion.value = res.data.FechaDevolucionEsperada
        estado.value = res.data.Estado
        comentario.value =res.data.Comentarios
    })
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
            <td class='d-flex'> <a href='#formularioCrud'><button class="btn btn-warning me-2" onclick="prepararEditarAlquiler(${alquiler.id})">Editar</button></a><button class="btn btn-danger" onclick="borrarAlquiler((${alquiler.id}))">Borrar</button></td>
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