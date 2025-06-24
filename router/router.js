import Header from "./../components/Header.js";
import Footer from "./../components/Footer.js";
import Home from "../views/Home.js";
import About from "../views/About.js";
import Login from "../views/Login.js";
import Register from "../views/Register.js";

const body = document.querySelector("#app");

const routes = {
    "#/": Home,
    "#/about": About,
    "#/login": Login,
    "#/register": Register,
};

export function router() {
    // Obtén el hash actual o usa la raíz "#/"
    const path = window.location.hash || "#/";
    const view = routes[path] || Home;

    // Renderiza la vista correspondiente
    body.innerHTML = `
        ${Header()}
        <main class="main">
            ${view()}
        </main>
        ${Footer()}
    `;

    // Agrega eventos a los enlaces de navegación
    document.querySelectorAll("nav ul li a").forEach((link) => {
        link.addEventListener("click", handleNavigation);
    });
}

export function handleNavigation(event) {
    event.preventDefault(); // Evita el comportamiento predeterminado del navegador
    const path = event.target.getAttribute("href"); // Obtén el valor del atributo href
    window.location.hash = path; // Cambia el hash en la URL
}

// Escucha cambios en el hash
window.addEventListener("hashchange", router);

// Inicializa el enrutador al cargar la página
window.addEventListener("DOMContentLoaded", router);