export default function Header() {
    // Retorna el HTML del header
    const headerHTML = `
        <header>
        <section>
            <article>
                <a class="a-logo" href="#/"><img src="../public/onglogo.png" alt="Logo del Sitio ONG"></a>
                <h1>Friendly ONG</h1>
            </article>
            <nav>
            <button class="btn-menu" id="btn-menu" aria-label="Abrir menú">
                <i class="fa-solid fa-bars"></i>
            </button>
            <ul class="nav-list">
                <li><a href="#/">Inicio</a></li>
                <li><a href="#/about">Nosotros</a></li>
               <!-- <li><a href="#/login">Ingresar</a></li>
                <li><a href="#/register">Registrar</a></li> -->
            </ul>
            <ul class="nav-listfull">
                <li><a href="#/">Inicio</a></li>
                <li><a href="#/about">Nosotros</a></li>
               <!-- <li><a href="#/login">Ingresar</a></li>
                <li><a href="#/register">Registrar</a></li> -->
            </ul>
            </nav>
        </section>
    </header>
    `;

    // Agrega el evento para el botón del menú después de renderizar el HTML
    setTimeout(() => {
        const btnMenu = document.getElementById("btn-menu");
        const navList = document.querySelector(".nav-list");
        let isMenuOpen = false; // Variable booleana para controlar el estado del menú

        btnMenu.addEventListener("click", () => {
            isMenuOpen = !isMenuOpen; // Alterna el estado del menú
            navList.classList.toggle("open", isMenuOpen); // Aplica o elimina la clase "open"
            btnMenu.setAttribute(
                "aria-label",
                isMenuOpen ? "Cerrar menú" : "Abrir menú"
            ); // Cambia el atributo aria-label para accesibilidad
        });
    }, 0);

    return headerHTML;
}