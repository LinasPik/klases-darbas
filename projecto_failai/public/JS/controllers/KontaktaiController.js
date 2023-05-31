//import ControllerInterface from "./app/ControllerInterface.js";
import Api from "../app/Api.js";
import AddEmail from "../modules/add_email.js";

export class KontaktaiController{

    index() {
        console.log('Kontaktai index');
        this.activate_menu();
        let api = new Api();

        api.getText('kontaktai.html').then(data => {
            $('main').html($(data).filter('main').html());
            new AddEmail();
        });
    }

    activate_menu(){
        $('.header-link').removeClass("active");
        $('#kontaktai_link').addClass('active');
    };
}

// Export the Cv class as the default export
export default KontaktaiController;
