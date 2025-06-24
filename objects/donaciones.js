class Donacion {
    constructor({ title, description, goal, collected, deadline, status, image, link }) {
        this.title = title;
        this.description = description;
        this.goal = goal;
        this.collected = collected;
        this.deadline = deadline;
        this.status = status;
        this.image = image;
        this.link = link;
    }

    static fromArray(dataArray) {
        return dataArray.map(item => new Donacion(item));
    }

    static filterByStatus(donaciones, status) {
        return donaciones.filter(donacion =>
            donacion.status && donacion.status.toLowerCase() === status.toLowerCase()
        );
    }

    static filterByTitle(donaciones, search) {
        return donaciones.filter(donacion =>
            donacion.title && donacion.title.toLowerCase().includes(search.toLowerCase())
        );
    }

    static filterByDeadline(donaciones, date) {
        return donaciones.filter(donacion =>
            donacion.deadline && donacion.deadline === date
        );
    }
}

export default Donacion;