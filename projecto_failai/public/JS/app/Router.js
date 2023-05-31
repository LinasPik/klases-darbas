import Api from "../app/Api.js";

export default class Router {
    constructor() {
        this.path = window.location.pathname;
        this.api = new Api();
    }

        // Funkcija, kuri apdoroja maršrutus
    async handleRoutes() {
        // pavadinimų:kontrolerių žodynas;
        this.kontroleriai = await this.api.get("api/kontroleriai");
        let page
        if(this.path!="/"){
            const galimi_adresai = Object.keys(this.kontroleriai);
            let atrinkti = galimi_adresai.filter(content => this.path.includes(content));
            page = (atrinkti.length)?atrinkti[0]:'404';

            // Paslepiam URL plėtinį
            window.history.pushState(null, null, '/');
            this.module = await import(`../Controllers/${this.kontroleriai[page]}.js`);
            this.controller = new this.module.default();
            this.controller.index();
            }
    };
}
