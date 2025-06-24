import "./Card.js";
import Project from "../objects/projects.js";

class SectionCards extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const title = this.getAttribute("title");
        const dataURL = this.getAttribute("dataURL");

        // Renderizar el título, filtros y un contenedor vacío mientras se cargan los datos
        shadow.innerHTML = `
            <link rel="stylesheet" href="./components/SectionProyectos.css">
            <section class="container">
                <h4>${title}</h4>
                <div class="filters">
                    <input type="text" placeholder="Buscar por título..." class="filter-title">
                    <select class="filter-status">
                        <option value="">Todos los estados</option>
                        <option value="En curso">En curso</option>
                        <option value="Finalizado">Finalizado</option>
                    </select>
                </div>
                <ol class="cards-container">Cargando...</ol>
            </section>
        `;

        this.loadData(dataURL, shadow);
    }

    async loadData(dataURL, shadow) {
        try {
            const response = await fetch(dataURL);
            if (!response.ok) {
                throw new Error(`Error al cargar los datos desde ${dataURL}: ${response.statusText}`);
            }
            const data = await response.json();
            console.log(data);

            // Usar la clase Project para transformar los datos
            let projects = Project.fromArray(data);

            // Guardar proyectos originales para filtrar
            this.allProjects = projects;
            this.renderCards(projects);

            // Agregar listeners para filtros
            const filterTitle = shadow.querySelector('.filter-title');
            const filterStatus = shadow.querySelector('.filter-status');

            filterTitle.addEventListener('input', () => this.applyFilters());
            filterStatus.addEventListener('change', () => this.applyFilters());
        } catch (error) {
            console.error(error);
            const container = shadow.querySelector(".cards-container");
            container.innerHTML = `<p>Error al cargar los datos.</p>`;
        }
    }

    applyFilters() {
        const filterTitle = this.shadowRoot.querySelector('.filter-title').value.trim().toLowerCase();
        const filterStatus = this.shadowRoot.querySelector('.filter-status').value;

        let filtered = this.allProjects;

        if (filterTitle) {
            filtered = Project.filterByTitle(filtered, filterTitle);
        }
        if (filterStatus) {
            filtered = Project.filterByStatus(filtered, filterStatus);
        }

        this.renderCards(filtered);
    }

    renderCards(projects) {
        const cardsHTML = projects.map((project) => {
            return `
            <li>
                <project-card
                    image="${project.image}" 
                    title="${project.title}" 
                    description="${project.description}" 
                    status="${project.status}"
                    details="${project.details}">
                </project-card>
            </li>
            `;
        }).join("");

        const container = this.shadowRoot.querySelector(".cards-container");
        container.innerHTML = cardsHTML || "<p>No se encontraron proyectos.</p>";
    }
}

customElements.define("section-proyectos", SectionCards);