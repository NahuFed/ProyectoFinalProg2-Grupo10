const grillaIntegrantes = document.getElementById("grillaIntegrantes");

const mostrarIntegrantes = () => {
  axios.get("http://localhost:3001/integrantes").then((res) => {
    res.data.forEach((integrante) => {
      grillaIntegrantes.innerHTML += `
            <div class="mt-3 col-md-3">
          
            <div class="border shadow rounded-4 tarjeta card">
              <img class="card-img-top tarjeta-img-top" src="${integrante.Foto}" />
              <div
                class="tarjeta-body d-flex flex-column justify-content-center align-items-center text-center card-body"
              >
                <div class="mb-5 card-title h5">
                  <h5 class="lead fs-2">${integrante.Nombre}</h5>
                  <h6>Legajo: ${integrante.Legajo}</h6>
                  
                </div>
                <div class="card-text">
                  <div class="d-flex">
                    <a
                      class="text-decoration-none mx-1"
                      href="${integrante.Linkedin}"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span class="circle"
                        ><i class="bi bi-linkedin fs-5 iconColor"></i
                      ></span>
                    </a>
                    <a
                      class="text-decoration-none mx-1"
                      href="${integrante.Github}"
                      target="_blank"
                      rel="noreferrer"
                      ><span class="circle"
                        ><i class="bi bi-github fs-5 iconColor"></i
                      ></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
            
            `;
    });
  });
};

mostrarIntegrantes();
