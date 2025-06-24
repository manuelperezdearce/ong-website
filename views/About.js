// File: views/About.js
export default function About() {
    return `
        <section class="about-container">
            <h2>Acerca de Friendly ONG</h2>
            <article class="max-width-800">
                <h4>¿Quiénes somos?</h4>
                <p>
                    En Friendly ONG, trabajamos por un mundo más verde, justo y solidario. Somos una organización sin fines de lucro dedicada a la protección del medio ambiente, la reforestación con especies nativas y el apoyo a comunidades vulnerables.
                    <br>
                    Nuestro equipo está formado por personas comprometidas con el cambio social y ambiental, que creen en la colaboración y la educación como motores de transformación. 
                    <br>
                    Desde campañas de plantación de árboles y limpieza de espacios naturales, hasta programas de educación ambiental y apoyo comunitario, buscamos generar un impacto positivo y duradero.
                    <br>
                    ¡Súmate a nuestra causa y sé parte del cambio!
                </p>
            </article>
            <article class="about-fotos-restaurante">
                <img src="https://www.cerronavia.cl/wp-content/uploads/2021/04/arbol-luchador_portada.jpg" alt="Voluntarios plantando árboles">
                <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80" alt="Bosque nativo">
                <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80" alt="Niños aprendiendo sobre el medio ambiente">
                <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80" alt="Voluntariado en acción">
            </article>
            <article class="max-width-800">
                <h4>Dónde encontrarnos</h4>
                <address>
                    Calle Esperanza Verde 456, Oficina 12, Santiago, Chile. Código Postal: 8320000.
                </address>
                <iframe loading="lazy" allowfullscreen src="https://maps.google.com/maps?q=Santiago%2C+Chile&output=embed"></iframe>
            </article>
        </section>
    `;
}