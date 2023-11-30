let tablaPeliculas = document.getElementById("tablaPeliculas");
let nombre = document.getElementById("nombre");
let descripcion = document.getElementById("descripcion");
let precio = document.getElementById("precio")
let actores = document.getElementById("actores")
let director = document.getElementById("director")
let fechaEstreno = document.getElementById("fechaEstreno")
let urlImagen = document.getElementById("urlImagen")
let botonAgregar = document.getElementById("agregar")
let contenedorBotones = document.getElementById("botones")

const limpiarFormulario = () =>{
    nombre.value = ''
    descripcion.value = ''
    precio.value = ''
    actores.value = ''
    director.value = ''
    fechaEstreno.value = ''
    urlImagen.value = ''
}

const getPeliculas = () => {
    axios
      .get("http://localhost:3001/peliculas")
      .then((res) => {
        res.data.forEach((pelicula) => {
            // console.log(pelicula.Nombre)
            tablaPeliculas.innerHTML += `
                <tr>
                <td>${pelicula.id}</td>
                <td>${pelicula.Nombre}</td>
                <td>${pelicula.Descripcion}</td>
                <td>${pelicula.Precio}</td>
                <td>${pelicula.Actores}</td>
                <td>${pelicula.DirectorPelicula}</td>
                <td>${pelicula.FechaEstreno}</td>
                <td>${pelicula.url_imagen}</td>
                <td class='d-flex'> <a href='#formularioCrud'><button class="btn btn-warning me-2" onclick="prepararEditarPelicula(${pelicula.id})">Editar</button></a><button class="btn btn-danger" onclick="borrarPelicula((${pelicula.id}))">Borrar</button></td>
            </tr>
                `;
          });
      })
      .catch((e) => console.log(e));
  };

const editarPelicula=(id) =>{
    axios.put("http://localhost:3001/peliculas/" + id,
    {
      "Nombre": nombre.value,
      "Descripcion": descripcion.value,
      "Precio": precio.value,
      "Actores": actores.value,
      "DirectorPelicula": director.value,
      "FechaEstreno": fechaEstreno.value,
      "url_imagen": urlImagen.value
    }
    )
    .then(res =>{
        limpiarFormulario()
        getPeliculas()
    }
        )
    .catch(e=>console.log(e))
}

const prepararEditarPelicula = (id) => {
  axios
    .get("http://localhost:3001/peliculas/" + id)
    .then((res) => {
        console.log(res.data)
        botonAgregar.style = "display: none"        
        contenedorBotones.innerHTML = `
        <button class ='btn btn-warning w-100 mt-3' onclick='editarPelicula(${id})'>Aceptar</button>`;        
        nombre.value = res.data.Nombre
        descripcion.value = res.data.Descripcion
        precio.value = res.data.Precio
        actores.value = res.data.Actores
        director.value = res.data.DirectorPelicula
        fechaEstreno.value = res.data.FechaEstreno
        urlImagen.value =res.data.url_imagen
    })
    .catch((e) => console.log(e));
};

const borrarPelicula = (id) =>{    
    axios.delete("http://localhost:3001/peliculas/"+id)
    .then(res=>console.log(res))
    .catch(e=>console.log(e))
}

const agregarPelicula = (e) =>{
e.preventDefault()
    axios.post("http://localhost:3001/peliculas/",{      
      "Nombre": nombre.value,
      "Descripcion": descripcion.value,
      "Precio": precio.value,
      "Actores": actores.value,
      "DirectorPelicula": director.value,
      "FechaEstreno": fechaEstreno.value,
      "url_imagen": urlImagen.value
    })
    .then(res => console.log(res))
    .catch(e=>console.log(e))
}

getPeliculas();

botonAgregar.addEventListener("click",agregarPelicula)