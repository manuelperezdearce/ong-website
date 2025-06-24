// FILE: components/Card-Event.js

class CardEvent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        // Leer atributos del elemento (corregido: usar "image" en vez de "img")
        const image = this.getAttribute("image");
        const name = this.getAttribute("name");
        const description = this.getAttribute("description");
        const date = this.getAttribute("date");
        const location = this.getAttribute("location") || "Ubicación no especificada.";
        const details = this.getAttribute("details") || "Sin información adicional.";

        // Renderizar el contenido dinámicamente
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./components/Card.css">
            <div class="card" style="cursor:pointer;">
                <img src="${image}" alt="${name}">
                <div class="card-content">
                    <h3>${name}</h3>
                    <p>${description}</p>
                    <p class="price">Fecha: ${date}</p>
                </div>
            </div>
            <div class="modal" style="display:none;">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h2>${name}</h2>
                    <img src="${image}" alt="${name}" style="max-width:100%;">
                    <p>${description}</p>
                    <p>${details}</p>
                    <p class="price">Fecha: ${date}</p>
                    <p class="location">Ubicación: ${location}</p>
                </div>
            </div>
            <style>
                .modal {
                    position: fixed;
                    z-index: 999;
                    left: 0; top: 0;
                    width: 100vw; height: 100vh;
                    background: rgba(0,0,0,0.5);
                    display: flex; align-items: center; justify-content: center;
                }
                .modal-content {
                    background: #fff;
                    padding: 2rem;
                    border-radius: 8px;
                    max-width: 400px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                    position: relative;
                }
                .close {
                    position: absolute;
                    top: 10px; right: 15px;
                    font-size: 2rem;
                    cursor: pointer;
                }
            </style>
        `;

        const card = this.shadowRoot.querySelector('.card');
        const modal = this.shadowRoot.querySelector('.modal');
        const closeBtn = this.shadowRoot.querySelector('.close');

        card.addEventListener('click', () => {
            modal.style.display = 'flex';
        });

        closeBtn.addEventListener('click', (e) => {
            modal.style.display = 'none';
            e.stopPropagation();
        });

        // Cerrar modal al hacer click fuera del contenido
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.style.display = 'none';
        });
    }
}

customElements.define("event-card", CardEvent);