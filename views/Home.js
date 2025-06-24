
export default function Home() {
    return `
        
        <section-main-nav></section-main-nav>
        
        <section-proyectos
            id="proyectos"
            title="Proyectos"
            dataURL="./mock/proyectos.json">
        </section-proyectos>

        <section-eventos
            id="eventos"
            title="Eventos"
            dataURL="./mock/eventos.json">
        </section-eventos>

        <section-donaciones
            id="donaciones"
            title="Donaciones"
            dataURL="./mock/donaciones.json">
        </section-donaciones>
      
        <section-videos id="videos" title="Videos Relacionados" dataURL="./mock/ListaPromociones.json"></section-promociones>
    `;
}