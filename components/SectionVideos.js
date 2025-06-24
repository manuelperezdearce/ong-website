class SectionVideos extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const title = this.getAttribute("title");
        const dataURL = this.getAttribute("dataURL");

        // Renderizar el título y un contenedor vacío mientras se cargan los datos
        shadow.innerHTML = `
            <link rel="stylesheet" href="./components/SectionVideos.css">
            <section class="container">
                <h4>${title}</h4>
                <div class="cards-container">
                <iframe  src="https://www.youtube.com/embed/WMslluyhO8I" title="Ejemplo de Video Personalizado   Ayuda Para ONG" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                <h5>El marketing con vídeos personalizados ayuda a organizaciones no gubernamentales a conectar con sus socios y voluntarios de forma eficaz, gracias a la personalización.

                Esta iniciativa es 100% gratuita para ONGs, para que puedan enviar emails, sms u otro tipo de mensajes personalizados añadiendo video marketing, captando a la atención y transmitiendo un mensaje de esperanza a las personas en sus bases de datos.
                </h5>
                </div>
            </section>
        `;

    }
}
customElements.define("section-videos", SectionVideos);



