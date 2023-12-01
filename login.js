//se obtiene del DOM el elemento cuyo id es formularioLogin
const formulario = document.getElementById("formularioLogin");

//se crea la funcion login la cual compara los datos ingresados en el formulario con los que existen en la base de datos, mediante un if y usando el metodo find se determina si coinciden el email y la contraseña y si ademas el usuario es admin para luego enviar a la pagina principal o sino (else) mostrar una alerta haciendole saber que no esta autorizado o que el email o la contraseña son incorrectos
const login = (e) => {
  e.preventDefault()
  axios.get("http://localhost:3001/usuarios")
    .then(resp=>
        {
            let cuenta = document.getElementById("cuenta").value
            let password = document.getElementById("password").value
            
            if (resp.data.find((usuario)=>(usuario.Email === cuenta||usuario.Usuario === cuenta )&& usuario.Password === password  && usuario.Usuario === 'admin')){               
                location.href="home.html"
              }else if (resp.data.find((usuario) =>(usuario.Email === cuenta || usuario.Usuario === cuenta) && usuario.Password === password)){
                alert("Usuario no autorizado")
              }else
              alert("Email o password incorrectos")        
        }
        )
    .catch(e =>console.log(e))  

};

// se asocia la funcion login al evento submit del formulario
formulario.addEventListener("submit",login);