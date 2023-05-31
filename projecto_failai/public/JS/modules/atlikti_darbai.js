import Api from "../app/Api.js";

export default class Darbai{
    constructor() {
        this.api = new Api();
        this.data_list;
        this.manoForma = document.querySelector('#kalbu_filtras');
        this.init();
        }

    async init() {
        await this.parsisiusti_darbus();
        this.manoForma.addEventListener('submit', this.filtruoti.bind(this));
        this.filtruoti();
    };

    async parsisiusti_darbus(){
        this.data_list = await this.api.get("api/atlikti_darbai");
    };

    kalbnu_list(obj){
        return obj.categories.split(" ");
    };

// filtras
    darbu_filtras(filtras_list, darbu_list){
        let atrinkti = [];
        darbu_list.forEach((darbas) => {
            let kalbos = this.kalbnu_list(darbas);
            if(filtras_list.some(kalba => kalbos.includes(kalba))){
                atrinkti.push(darbas);
            };
        });

        return atrinkti;
    };


    //pridedam html objektus

    prideti_darbus(darbu_list){
        let div = document.querySelector('div.darbai')
        let inner_html = ''
        darbu_list.forEach((darbas)=> {
            inner_html += `<div class="darbas"><img src=${darbas.img} alt=${darbas.title}><span>${darbas.title} (${this.kalbnu_list(darbas)})</span></div>`;
        });
        div.innerHTML = inner_html;

    };

    //formos submitinimas

    async filtruoti(event){
        if(event){event.preventDefault();};
        let formInputs = (event)?event.target.elements : this.manoForma.elements;
        let filtras_list = [];

    //  pagal checkboxus atrenkam vertes filtrui

        if(formInputs.html.checked){filtras_list.push(formInputs.html.value)};
        if(formInputs.css.checked){filtras_list.push(formInputs.css.value)};
        if(formInputs.js.checked){filtras_list.push(formInputs.js.value)};
        if(formInputs.python.checked){filtras_list.push(formInputs.python.value)};
        if(formInputs.mysql.checked){filtras_list.push(formInputs.mysql.value)};

    //  atnaujinam darbus
        await this.parsisiusti_darbus();
    //  filtruojam
        let atrinkti = this.darbu_filtras(filtras_list, this.data_list);
        this.prideti_darbus(atrinkti);

    //  pritaikom JS funkcijas naujiems objektams
        this.js_nuotraukoms()
    };

    js_nuotraukoms(){
        let darbas_foto = document.querySelectorAll('.darbas > img');
        darbas_foto.forEach((foto) => {
            foto.addEventListener('click', this.paspaudus_foto.bind(this));
        });
    };


    paspaudus_foto(e){
        console.log("paspausta foto");
    };
}