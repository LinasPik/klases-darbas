export class Api {
    constructor() {
        this.url = 'http://localhost';
    }

    get(url, other = false) {
        url = (other)? url : `${this.url}/${url}`;
        return fetch(url)
            .then(response => response.json());
    }

    getText(url, other = false) {
        url = (other)? url : `${this.url}/${url}`;
        return $.get(url);
    }

    post(url, data, other = false) {
        url = (other)? url : `${this.url}/${url}`;
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json());
    }

    put(url, data, other = false) {
        url = (other)? url : `${this.url}/${url}`;
        return fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json());
    }

    delete(url, other = false) {
        url = (other)? url : `${this.url}/${url}`;
        return fetch(url, {
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