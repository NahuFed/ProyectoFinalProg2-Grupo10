let grillapelis = document.getElementById("grillapelis")

const getPelis = () =>{
    axios.get("http://localhost:3001/peliculas")
    .then(resp => {
        resp.data.forEach(peli => {
            grillapelis.innerHTML += `
            <div class="col-3">
            <div class="card text-bg-dark h-100">
                <img src="${peli.url_imagen}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${peli.Nombre}</h5>
                  <p class="card-text">${peli.Descripcion}</p>
                  <a href="#" class="btn btn-secondary">Ver mas</a>
                </div>
              </div>`
        });    
        
    })
}
getPelis()

