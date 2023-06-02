export default class Cards {
    constructor() {
        this.saveB = document.getElementById("save");
        this.review = document.getElementById("review");
        this.back = document.getElementById("back");
        this.front = document.getElementById("front");
        this.count = document.getElementById("count");

        this.set_count();
        this.saveB.addEventListener('click', this.save_card.bind(this));
        this.review.addEventListener('click', this.popup.bind(this));
        }

    card_gen(front, back){
        let  cardList = JSON.parse(localStorage.getItem('cardList')) || [];
        return {frontSide: front, backSide: back};
    }

    set_count(){
        let cardList = JSON.parse(localStorage.getItem('cardList')) || [];
        this.count.textContent = "Number of FlashCards: " +  cardList.length;
    }

    popup() {
        event.preventDefault();
        window.open("http://localhost/showcard.html", "Popup Window", "width=520, height=500");
    }

    save_card(event){
            event.preventDefault();
            if(![this.back.value, this.front.value].includes("")){
                let cardList = JSON.parse(localStorage.getItem('cardList')) || [];
                let card = this.card_gen(this.front.value, this.back.value)
                cardList.push(card);
                cardList = JSON.stringify(cardList);
                localStorage.setItem('cardList', cardList);
                this.set_count()
                }
    }
};




