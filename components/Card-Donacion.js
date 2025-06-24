class CardCampain extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        // Leer atributos del elemento
        const img = this.getAttribute("image");
        const name = this.getAttribute("title");
        const description = this.getAttribute("description");
        const goal = this.getAttribute("goal");
        const collected = this.getAttribute("collected");
        const deadline = this.getAttribute("deadline");
        const status = this.getAttribute("status");
        const link = this.getAttribute("link");

        // Renderizar el contenido dinámicamente
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./components/Card.css">
            <div class="card" style="cursor:pointer;">
                <img src="${img}" alt="${name}">
                <div class="card-content">
                    <h3>${name}</h3>
                    <p>${description}</p>
                    <p><strong>Meta:</strong> ${goal}</p>
                    <p><strong>Recaudado:</strong> ${collected}</p>
                    <p><strong>Estado:</strong> ${status}</p>
                    <p class="price">Fecha límite: ${deadline}</p>
                </div>
            </div>
            <div class="modal" style="display:none;">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h2>${name}</h2>
                    <img src="${img}" alt="${name}" style="max-width:100%;">
                    <p>${description}</p>
                    <p><strong>Meta:</strong> ${goal}</p>
                    <p><strong>Recaudado:</strong> ${collected}</p>
                    <p><strong>Estado:</strong> ${status}</p>
                    <p class="price">Fecha límite: ${deadline}</p>
                    <a href="${link}" target="_blank" style="display:inline-block;margin-top:1rem;padding:0.5rem 1rem;background:#4caf50;color:#fff;border-radius:4px;text-decoration:none;">Donar</a>
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

customElements.define("donacion-card", CardCampain);