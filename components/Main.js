// FILE: components/Main.js
import "./SectionProyectos.js";
import "./SectionMainNav.js";
import "./SectionEventos.js";
import "./SectionDonaciones.js";
import "./SectionVideos.js";

class Main extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });

        // Crear un contenedor para los hijos
        const childrenHTML = Array.from(this.children)
            .map((child) => child.outerHTML)
            .join("");

        // Renderizar el contenido en el Shadow DOM
        shadow.innerHTML = `
            <!-- <link rel="stylesheet" href="./components/Main.css"> -->
            <main class="Main">
                ${childrenHTML}
            </main>
        `;

        // Limpiar los hijos del componente en el DOM principal
        this.innerHTML = "";

        this.handleNavigation();
    }

    handleNavigation() {
        // Seleccionar los enlaces de navegación desde el Shadow DOM
        const links = this.shadowRoot.querySelectorAll("nav ul li a");
        // Verificar si los enlaces existen
        if (!links.length) {
            console.error("No se encontraron enlaces de navegación dentro del Shadow DOM.");
            return;
        }

        // Agregar eventos a cada enlace
        links.forEach((link) => {
            link.addEventListener("click", (event) => {
                event.preventDefault();
                const targetId = link.getAttribute("href").substring(1); // Obtener el ID del destino
                const targetElement = this.shadowRoot.querySelector(`#${targetId}`); // Buscar el destino en el Shadow DOM

                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: "smooth" }); // Hacer scroll al destino
                } else {
                    console.error(`No se encontró el elemento con ID: ${targetId} dentro del Shadow DOM.`);
                }
            });
        });
    }
}

customElements.define("custom-main", Main);