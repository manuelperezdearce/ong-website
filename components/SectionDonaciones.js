import "./Card-Donacion.js";
import Donacion from "../objects/donaciones.js";

class SectionDonaciones extends HTMLElement {
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
                        <option value="Activa">Activa</option>
                        <option value="Finalizada">Finalizada</option>
                    </select>
                    <input type="date" class="filter-deadline" placeholder="Filtrar por fecha límite">
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

            // Usar la clase Donacion para transformar los datos
            let donaciones = Donacion.fromArray(data);

            // Guardar donaciones originales para filtrar
            this.allDonaciones = donaciones;
            this.renderCards(donaciones);

            // Agregar listeners para filtros
            const filterTitle = shadow.querySelector('.filter-title');
            const filterStatus = shadow.querySelector('.filter-status');
            const filterDeadline = shadow.querySelector('.filter-deadline');

            filterTitle.addEventListener('input', () => this.applyFilters());
            filterStatus.addEventListener('change', () => this.applyFilters());
            filterDeadline.addEventListener('change', () => this.applyFilters());
        } catch (error) {
            console.error(error);
            const container = shadow.querySelector(".cards-container");
            container.innerHTML = `<p>Error al cargar los datos.</p>`;
        }
    }

    applyFilters() {
        const filterTitle = this.shadowRoot.querySelector('.filter-title').value.trim().toLowerCase();
        const filterStatus = this.shadowRoot.querySelector('.filter-status').value;
        const filterDeadline = this.shadowRoot.querySelector('.filter-deadline').value;

        let filtered = this.allDonaciones;

        if (filterTitle) {
            filtered = Donacion.filterByTitle(filtered, filterTitle);
        }
        if (filterStatus) {
            filtered = Donacion.filterByStatus(filtered, filterStatus);
        }
        if (filterDeadline) {
            // Convertir fecha de input (aaaa-mm-dd) a dd-mm-aaaa
            const [yyyy, mm, dd] = filterDeadline.split("-");
            const formatted = `${dd}-${mm}-${yyyy}`;
            filtered = Donacion.filterByDeadline(filtered, formatted);
        }

        this.renderCards(filtered);
    }

    renderCards(donaciones) {
        const cardsHTML = donaciones.map((donacion) => {
            return `
            <li>
                <donacion-card
                    title="${donacion.title}" 
                    description="${donacion.description}" 
                    goal="${donacion.goal}"
                    collected="${donacion.collected}"
                    deadline="${donacion.deadline}"
                    status="${donacion.status}"
                    image="${donacion.image}"
                    link="${donacion.link}">
                </donacion-card>
            </li>
            `;
        }).join("");

        const container = this.shadowRoot.querySelector(".cards-container");
        container.innerHTML = cardsHTML || "<p>No se encontraron donaciones.</p>";
    }
}

customElements.define("section-donaciones", SectionDonaciones);