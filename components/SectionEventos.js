import "./Card-Event.js";
import Event from "../objects/events.js";

class SectionEventos extends HTMLElement {
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
                    <input type="text" placeholder="Buscar por nombre..." class="filter-name">
                    <input type="text" placeholder="Buscar por ubicación..." class="filter-location">
                    <input type="date" class="filter-date">
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

            // Usar la clase Event para transformar los datos
            let events = Event.fromArray(data);

            // Guardar eventos originales para filtrar
            this.allEvents = events;
            this.renderCards(events);

            // Agregar listeners para filtros
            const filterName = shadow.querySelector('.filter-name');
            const filterLocation = shadow.querySelector('.filter-location');
            const filterDate = shadow.querySelector('.filter-date');

            filterName.addEventListener('input', () => this.applyFilters());
            filterLocation.addEventListener('input', () => this.applyFilters());
            filterDate.addEventListener('change', () => this.applyFilters());
        } catch (error) {
            console.error(error);
            const container = shadow.querySelector(".cards-container");
            container.innerHTML = `<p>Error al cargar los datos.</p>`;
        }
    }

    applyFilters() {
        const filterName = this.shadowRoot.querySelector('.filter-name').value.trim().toLowerCase();
        const filterLocation = this.shadowRoot.querySelector('.filter-location').value.trim().toLowerCase();
        const filterDate = this.shadowRoot.querySelector('.filter-date').value;

        let filtered = this.allEvents;

        if (filterName) {
            filtered = Event.filterByName(filtered, filterName);
        }
        if (filterLocation) {
            filtered = Event.filterByLocation(filtered, filterLocation);
        }
        if (filterDate) {
            filtered = Event.filterByDate(filtered, filterDate);
        }

        this.renderCards(filtered);
    }

    renderCards(events) {
        const cardsHTML = events.map((event) => {
            return `
            <li>
                <event-card
                    image="${event.image}" 
                    name="${event.name}" 
                    description="${event.description}" 
                    details="${event.details}"
                    date="${event.date}"
                    location="${event.location}">
                </event-card>
            </li>
            `;
        }).join("");

        const container = this.shadowRoot.querySelector(".cards-container");
        container.innerHTML = cardsHTML || "<p>No se encontraron eventos.</p>";
    }
}

customElements.define("section-eventos", SectionEventos);