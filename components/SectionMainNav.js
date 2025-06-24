// FILE: SectionMainNav.js

class SectionMainNav extends HTMLElement {
    constructor() {
        super();

        // Renderizar el contenido directamente en el DOM principal
        this.innerHTML = `
            <link rel="stylesheet" href="./components/SectionMainNav.css">
            <nav class="nav container">
                <ul class="nav-lis">
                    <li><a href="#proyectos">Proyectos</a></li>
                    <li><a href="#eventos">Eventos</a></li>
                    <li><a href="#donaciones">Donaciones</a></li>
                    <li><a href="#videos">Vídeos Relacionados</a></li>
                </ul>
            </nav>
        `;
    }
}

customElements.define("section-main-nav", SectionMainNav);



