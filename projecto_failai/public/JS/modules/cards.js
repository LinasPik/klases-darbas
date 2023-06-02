import Api from "../app/Api.js";
import Tabs from "../modules/tabs.js";

export default class Cards {
    constructor() {
        this.api = new Api;
        this.tabs = new Tabs;
        this.apiURL = "http://127.0.0.1:8024/cards"
        this.saveB = document.getElementById("save");
        this.review = document.getElementById("review");
        this.back = document.getElementById("back");
        this.front = document.getElementById("front");
        this.count = document.getElementById("count");

        this.back2 = document.getElementById("back2");
        this.front2 = document.getElementById("front2");
        this.next = document.getElementById("next");
        this.delete_c = document.getElementById("delete");
        this.edit = document.getElementById("edit");

        this.save_edit = document.getElementById("save_edit");
        this.next_edit = document.getElementById("next_edit");
        this.back3 = document.getElementById("back3");
        this.front3 = document.getElementById("front3");

        this.review_tab = document.querySelectorAll('.show_tab')[0];
        this.edit_tab = document.querySelectorAll('.edit_tab')[0];
        this.create_tab = document.querySelectorAll('#tab1')[0];

        this.set_count();
        this.pseudo_id = 0;
        this.saveB.addEventListener('click', this.save_card.bind(this));
        this.review.addEventListener('click', this.to_view.bind(this));
        this.review_tab.addEventListener('click', this.to_view.bind(this));
        this.edit.addEventListener('click', this.to_edit.bind(this));
        this.edit_tab.addEventListener('click', this.to_edit.bind(this));
        this.next.addEventListener('click', this.nextCard.bind(this));
        this.next_edit.addEventListener('click', this.nextEdit.bind(this));
        this.delete_c.addEventListener('click', this.remove.bind(this));
        this.save_edit.addEventListener('click', this.saveEdit.bind(this));
        this.create_tab.addEventListener('click', this.to_create.bind(this));

        }

    card_gen(front, back){
        let  cardList = JSON.parse(localStorage.getItem('cardList')) || [];
        return {frontSide: front, backSide: back};
    }

    async set_count(){
        let cardList = await this.get_cards();
        this.count.textContent = "Number of FlashCards: " +  cardList.length;
        console.log("set to "+cardList.length);
    }

    async to_view() {
        event.preventDefault();

        let cardList = await this.get_cards();
        if(cardList.length!==0){
        this.front2.textContent = cardList[0].frontSide;
        this.back2.textContent = cardList[0].backSide;}

        let id = $('.show_tab')[0].id;
        this.tabs.activate_tabs(id);
    }

    async save_card(event){
            event.preventDefault();
            if(![this.back.value, this.front.value].includes("")){
                let card = this.card_gen(this.front.value, this.back.value)
                await this.api.post(this.apiURL, card, 1);

                this.set_count();
                this.back.value = "";
                this.front.value = "";
                }else{
                    alert("Fill both sides of the card before saving!");
                }
    }

    async get_cards(id=false){
        let url = (id)? this.apiURL+"/"+id : this.apiURL;
        let cards = await this.api.get(url, 1);
        let n = 0;
        cards.forEach(c=>{c.pseudo_id=n; n++;})

        return cards;
    }

    async showCard(pseudo_id){
        let cardList = await this.get_cards();
        front2.textContent = (cardList[pseudo_id]) ? cardList[pseudo_id].frontSide : "FrontSide";
        back2.textContent = (cardList[pseudo_id]) ? cardList[pseudo_id].backSide : "BackSide";
    };

    async nextCard(){
        let cardList = await this.get_cards();
        this.pseudo_id = (cardList.length-1 > this.pseudo_id) ? this.pseudo_id+1:0;
        this.showCard(this.pseudo_id);
    };

    async nextEdit(){
        event.preventDefault();
        let cardList = await this.get_cards();
        this.pseudo_id = (cardList.length-1 > this.pseudo_id) ? this.pseudo_id+1:0;
        front3.value = (cardList[this.pseudo_id]) ? cardList[this.pseudo_id].frontSide : "FrontSide";
        back3.value = (cardList[this.pseudo_id]) ? cardList[this.pseudo_id].backSide : "BackSide";
    };


    async remove(){
        if(confirm("Do you want to delete this card?")){
            let cardList = await this.get_cards();
//          2 lygio patikrinimas
            if(cardList[this.pseudo_id]['frontSide']==this.front2.textContent){
                let doomed = cardList.filter(c => c.pseudo_id == this.pseudo_id)[0];
                await this.api.delete(this.apiURL+'/'+doomed.id, 1);
                this.nextCard();

                }else{alert("Error!");
                console.log(cardList[this.pseudo_id]['frontSide'],this.front2.textContent)};
        };
    };

    async to_edit() {
        event.preventDefault();
        let cardList = await this.get_cards();
        this.front3.value = cardList[this.pseudo_id].frontSide;
        this.back3.value = cardList[this.pseudo_id].backSide;

        let id = $('.edit_tab')[0].id;
        this.tabs.activate_tabs(id);
    };

    async to_create(){
        await this.set_count();
        this.tabs.activate_tabs("tab1");
    };


async saveEdit(){
    event.preventDefault();
            if(![this.back3.value, this.front3.value].includes("")){
                let cardList = await this.get_cards();
                let card = this.card_gen(this.front3.value, this.back3.value)
                let edited = cardList.filter(c => c.pseudo_id == this.pseudo_id)[0];
                await this.api.put(this.apiURL+"/"+edited.id, card, 1);

                }else{
                    alert("Fill both sides of the card before saving!");
                }
};

};




