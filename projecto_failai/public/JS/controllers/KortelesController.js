//import ControllerInterface from "./app/ControllerInterface.js";
import Api from "../app/Api.js";
import Cards from "../modules/cards.js";
import Tabs from "../modules/tabs.js"

export default class KortelesController{

    index() {
        console.log('Korteles index');
        this.activate_menu();
        let api = new Api();

        api.getText('korteles.html').then(data => {
            $('main').html($(data).filter('main').html());
            new Cards();
            let tab = new Tabs();
            tab.listen();
        });

    }

    activate_menu(){
        $('.header-link').removeClass("active");
        $('#korteles_link').addClass('active');
    };
}

