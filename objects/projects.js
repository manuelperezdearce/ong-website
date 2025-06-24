class Project {
    constructor({ title, description, image, details, status }) {
        this.title = title;
        this.description = description;
        this.image = image;
        this.details = details;
        this.status = status;
    }

    static fromArray(dataArray) {
        return dataArray.map(item => new Project(item));
    }

    static filterByStatus(projects, status) {
        return projects.filter(project =>
            project.status && project.status.toLowerCase() === status.toLowerCase()
        );
    }

    static filterByTitle(projects, search) {
        return projects.filter(project =>
            project.title && project.title.toLowerCase().includes(search.toLowerCase())
        );
    }

    static filterByDetail(projects, search) {
        return projects.filter(project =>
            project.details && project.details.toLowerCase().includes(search.toLowerCase())
        );
    }
}

export default Project;
