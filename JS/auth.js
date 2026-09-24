
// inicia objeto de datos
const CREDENCIALES = {
  correo: "correo@gmail.com",
  contrasena: "Burguesia2026",
};

// guarda un valor en SESION_KEY
const SESION_KEY = "sesionActiva";
const REDIRECCION_KEY = "redireccionLogin";

// define la función obtenerRutaBase
function obtenerRutaBase() {
  // devuelve el resultado
  return typeof RUTA_BASE !== "undefined" ? RUTA_BASE : "";
}

/* Sesion */

// define la función estaAutenticado
function estaAutenticado() {
  // lee dato del navegador
  return localStorage.getItem(SESION_KEY) === "true";
}

// define la función iniciarSesion
function iniciarSesion(correo, contrasena) {
  // guarda un valor en correoOk
  const correoOk =
    (correo || "").trim().toLowerCase() === CREDENCIALES.correo.toLowerCase();
  const contrasenaOk = (contrasena || "") === CREDENCIALES.contrasena;

  // revisa una condición
  if (correoOk && contrasenaOk) {
    // guarda dato en el navegador
    localStorage.setItem(SESION_KEY, "true");
    return true;
  }
  return false;
}

// define la función cerrarSesion
function cerrarSesion() {
  // borra dato del navegador
  localStorage.removeItem(SESION_KEY);


  // revisa una condición
  if (typeof vaciarCarrito === "function") {
    vaciarCarrito();
  } else {
    // guarda dato en el navegador
    localStorage.setItem("carrito", "[]");
  }
}

// define la función actualizarBotonCuenta
function actualizarBotonCuenta() {
  // guarda un valor en boton
  const boton = document.getElementById("btnCuenta");
  if (!boton) return;

  // revisa una condición
  if (estaAutenticado()) {
    // cambia un atributo del elemento
    boton.setAttribute("href", "#");
    boton.title = "Cerrar sesión";
    boton.onclick = (e) => {
      // evita la acción por defecto
      e.preventDefault();
      if (confirm("¿Deseas cerrar sesión?")) {
        cerrarSesion();
        window.location.reload();
      }
    };
  } else {
    // cambia un atributo del elemento
    boton.setAttribute("href", obtenerRutaBase() + "Login.html");
    boton.title = "Iniciar sesión";
    boton.onclick = null;
  }
}

/* redireccion login */
// define la función pedirInicioSesion
function pedirInicioSesion() {
  // guarda dato en el navegador
  localStorage.setItem(REDIRECCION_KEY, window.location.href);
  window.location.href = obtenerRutaBase() + "Login.html";
}

// define la función obtenerYLimpiarRedireccion
function obtenerYLimpiarRedireccion() {
  // guarda un valor en url
  const url = localStorage.getItem(REDIRECCION_KEY);
  localStorage.removeItem(REDIRECCION_KEY);
  return url;
}

/* formulario login */

// se ejecuta al cargar la página
document.addEventListener("DOMContentLoaded", () => {

  actualizarBotonCuenta();

  // guarda un valor en formulario
  const formulario = document.getElementById("formLogin");
  if (!formulario) return; 

  if (estaAutenticado()) {
    // cambia de página
    window.location.href = "../index.html";
    return;
  }

  // guarda un valor en errorEl
  const errorEl = document.getElementById("errorLogin");

  // escucha el evento submit
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    // guarda un valor en correo
    const correo = document.getElementById("correoLogin").value;
    const contrasena = document.getElementById("contrasenaLogin").value;

    // revisa una condición
    if (iniciarSesion(correo, contrasena)) {
      // guarda un valor en destino
      const destino = obtenerYLimpiarRedireccion();

      // cambia de página
      window.location.href = destino || "../index.html";
    } else if (errorEl) {
      // cambia el texto mostrado
      errorEl.textContent = "Correo o contraseña incorrectos.";
      errorEl.style.display = "block";
    }
  });
});
