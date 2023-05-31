//import ControllerInterface from "./app/ControllerInterface.js";
import Api from "../app/Api.js";
import Darbai from "../modules/atlikti_darbai.js";

export class PortfolioController{

    index() {
        console.log('Portfolio index');
        this.activate_menu();
        let api = new Api();

        api.getText('portfolio.html').then(data => {
            $('main').html($(data).filter('main').html());
            new Darbai();
        });
    }

    activate_menu(){
        $('.header-link').removeClass("active");
        $('#portfolio_link').addClass('active');
    };
}

// Export the Cv class as the default export
export default PortfolioController;
