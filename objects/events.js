class Event {
    constructor({ name, date, location, description, image, details }) {
        this.name = name;
        this.date = date;
        this.location = location;
        this.description = description;
        this.image = image;
        this.details = details;
    }

    static fromArray(dataArray) {
        return dataArray.map(item => new Event(item));
    }

    static filterByLocation(events, location) {
        return events.filter(event =>
            event.location && event.location.toLowerCase().includes(location.toLowerCase())
        );
    }

    static filterByName(events, search) {
        return events.filter(event =>
            event.name && event.name.toLowerCase().includes(search.toLowerCase())
        );
    }

    // Convierte fecha de input (aaaa-mm-dd) a dd/mm/aaaa y compara con event.date
    static filterByDate(events, date) {
        if (!date) return events;
        // date viene como "aaaa-mm-dd"
        const [yyyy, mm, dd] = date.split("-");
        const formatted = `${dd}/${mm}/${yyyy}`;
        return events.filter(event =>
            event.date && (event.date === formatted || event.date === `${dd}-${mm}-${yyyy}`)
        );
    }
}

export default Event;