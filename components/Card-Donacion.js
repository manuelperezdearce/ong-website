class CardCampain extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.collected = 0;
        this.goal = 0;
        this.goalReached = false;
    }

    connectedCallback() {
        // Leer atributos del elemento
        const img = this.getAttribute("image");
        const name = this.getAttribute("title");
        const description = this.getAttribute("description");
        const goalStr = this.getAttribute("goal");
        const collectedStr = this.getAttribute("collected");
        const deadline = this.getAttribute("deadline");
        const status = this.getAttribute("status");
        const link = this.getAttribute("link");

        // Convertir a número para cálculos
        this.collected = Number(collectedStr.replace(/[^0-9.-]+/g, ""));
        this.goal = Number(goalStr.replace(/[^0-9.-]+/g, ""));

        // Renderizar el contenido dinámicamente
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./components/Card.css">
            <div class="card" style="cursor:pointer;">
                <img src="${img}" alt="${name}">
                <div class="card-content">
                    <h3>${name}</h3>
                    <p>${description}</p>
                    <p><strong>Meta:</strong> ${goalStr}</p>
                    <p><strong>Recaudado:</strong> <span class="collected-amount">${collectedStr}</span></p>
                    <p><strong>Estado:</strong> ${status}</p>
                    <p class="price">Fecha límite: ${deadline}</p>
                    <div class="donar-section">
                        <input type="number" min="1" placeholder="Monto a donar" class="input-donar">
                        <button class="btn-donar">Donar</button>
                    </div>
                </div>
            </div>
            <div class="modal" style="display:none;">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h2>${name}</h2>
                    <img src="${img}" alt="${name}" style="max-width:100%;">
                    <p>${description}</p>
                    <p><strong>Meta:</strong> ${goalStr}</p>
                    <p><strong>Recaudado:</strong> <span class="collected-amount-modal">${collectedStr}</span></p>
                    <p><strong>Estado:</strong> ${status}</p>
                    <p class="price">Fecha límite: ${deadline}</p>
                    <div class="donar-section">
                        <input type="number" min="1" placeholder="Monto a donar" class="input-donar-modal">
                        <button class="btn-donar-modal">Donar</button>
                    </div>
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
                .donar-section {
                    margin-top: 1rem;
                    display: flex;
                    gap: 0.5rem;
                }
                .donar-section input[type="number"] {
                    width: 100px;
                    padding: 0.3rem;
                }
                .btn-donar, .btn-donar-modal {
                    background: #4caf50;
                    color: #fff;
                    border: none;
                    border-radius: 4px;
                    padding: 0.5rem 1rem;
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

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.style.display = 'none';
        });

        // Usar solo el input y botón de la card principal
        const inputDonar = this.shadowRoot.querySelector('.input-donar');
        const btnDonar = this.shadowRoot.querySelector('.btn-donar');
        const collectedSpan = this.shadowRoot.querySelector('.collected-amount');
        const collectedSpanModal = this.shadowRoot.querySelector('.collected-amount-modal');
        const inputDonarModal = this.shadowRoot.querySelector('.input-donar-modal');

        // Sincronizar input de modal con el principal
        inputDonar.addEventListener('input', () => {
            inputDonarModal.value = inputDonar.value;
        });
        inputDonarModal.addEventListener('input', () => {
            inputDonar.value = inputDonarModal.value;
        });

        // Un solo botón para donar (el de la card principal)
        btnDonar.addEventListener('click', () => {
            const monto = Number(inputDonar.value);
            if (monto > 0) {
                this.collected += monto;
                collectedSpan.textContent = `$${this.collected.toLocaleString("es-CL")}`;
                collectedSpanModal.textContent = `$${this.collected.toLocaleString("es-CL")}`;
                inputDonar.value = "";
                inputDonarModal.value = "";
                this.checkGoal();
            }
        });

        // El botón de la modal solo cierra la modal y dispara el botón principal
        const btnDonarModal = this.shadowRoot.querySelector('.btn-donar-modal');
        btnDonarModal.addEventListener('click', () => {
            btnDonar.click();
            modal.style.display = 'none';
        });
    }

    checkGoal() {
        if (this.collected >= this.goal) {
            if (!this.goalReached) {
                this.goalReached = true;
                alert("¡Meta alcanzada! Gracias por tu aporte.");
            }
        }
    }
}

customElements.define("donacion-card", CardCampain);