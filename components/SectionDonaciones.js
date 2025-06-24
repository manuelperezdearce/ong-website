import "./Card-Donacion.js";

class SectionCampains extends HTMLElement {
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

            // Generar las tarjetas dinámicamente con los atributos correctos
            const cardsHTML = data.map((element) => {
                return `
                <li>
                    <donacion-card
                        title="${element.title}" 
                        description="${element.description}" 
                        goal="${element.goal}"
                        collected="${element.collected}"
                        deadline="${element.deadline}"
                        status="${element.status}"
                        image="${element.image}"
                        link="${element.link}">
                    </donacion-card>
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

customElements.define("section-donaciones", SectionCampains);