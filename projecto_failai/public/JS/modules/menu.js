import Api from "../app/Api.js";

export default class Menu{
    constructor() {
        this.api = new Api();
        this.add_menu();
        }

    add_menu(){
        this.api.get("api/menu").then(data=>{
            let nav = $('<nav></nav>');
            console.log(data);
            data.forEach(d=>{
                let a = $("<a>", {
                    class: "header-link",
                    "data-goTo": d["href"],
                    text: d["text"],
                    id: d["href"]+"_link"
                }).on('click', this.goTo.bind(this));
                if(d["href"]=="index"){a.addClass("active")};
                nav.append(a);
            });
            $("header").append(nav);
        });
    };

    async goTo(e){
//        window.location.href =  $(e.target).attr("data-goTo")
          let to = $(e.target).attr("data-goTo")
          let kontroleriai = await this.api.get("api/kontroleriai");
          this.module = await import(`../Controllers/${kontroleriai[to]}.js`);
          this.controller = new this.module.default();
          this.controller.index();

    };

}