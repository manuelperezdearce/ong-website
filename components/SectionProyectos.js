import "./Card.js";

class SectionCards extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const title = this.getAttribute("title");
        const dataURL = this.getAttribute("dataURL");

        // Renderizar el título y un contenedor vacío mientras se cargan los datos
        shadow.innerHTML = `
            <link rel="stylesheet" href="./components/SectionProyectos.css">
            <section class="container">
                <h4>${title}</h4>
                <ol class="cards-container">Cargando...</ol>
            </section>
        `;

        // Cargar los datos dinámicamente
        this.loadData(dataURL, shadow);
    }

    async loadData(dataURL, shadow) {
        try {
            const response = await fetch(dataURL);
            if (!response.ok) {
                throw new Error(`Error al cargar los datos desde ${dataURL}: ${response.statusText}`);
            }
            const data = await response.json();

            // Generar las tarjetas dinámicamente
            const cardsHTML = data.map((element) => {
                return `
                <li>
                    <project-card
                        img="${element.image}" 
                        title="${element.title}" 
                        description="${element.description}" 
                        status="${element.status}"
                        details="${element.details}">
                    </project-card>
                </li>
                `;
            }).join("");

            // Actualizar el contenido del contenedor de tarjetas
            const container = shadow.querySelector(".cards-container");
            container.innerHTML = cardsHTML;
        } catch (error) {
            console.error(error);
            const container = shadow.querySelector(".cards-container");
            container.innerHTML = `<p>Error al cargar los datos.</p>`;
        }
    }
}

customElements.define("section-proyectos", SectionCards);