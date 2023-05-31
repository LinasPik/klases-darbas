export class Api {
    constructor() {
        this.url = 'http://localhost';
    }

    get(url) {
        return fetch(`${this.url}/${url}`)
            .then(response => response.json());
    }

    getText(url) {
        return $.get(`${this.url}/${url}`);
    }

    post(url, data) {
        return fetch(`${this.url}/${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json());
    }

    put(url, data) {
        return fetch(`${this.url}/${url}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json());
    }

    delete(url) {
        return fetch(`${this.url}/${url}`, {
            method: 'DELETE',
        })
            .then(response => response.json());
    }


    // Funkcija, kuri krauna modulį iš HTML failo
    loadPage(page) {
        fetch(`${page}.html`)
            .then(response => response.text())
            .then(html => {
                const mainContent = document.querySelector('main');
                mainContent.innerHTML = html;
            })
            .catch(error => {
                console.error('Klaida kraunant puslapį:', error);
            });
    }

}

export default Api;