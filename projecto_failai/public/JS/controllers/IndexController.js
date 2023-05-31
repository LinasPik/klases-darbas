//import ControllerInterface from "./app/ControllerInterface.js";
import Api from "../app/Api.js";

export class IndexController{

    index() {
        console.log('Index index');
        this.activate_menu();
        let api = new Api();

        api.getText('index.html').then(data => {
            $('main').html($(data).filter('main').html());
        });
    }

   activate_menu(){
        $('.header-link').removeClass("active");
        $('#index_link').addClass('active');
    };
}

// Export the Cv class as the default export
export default IndexController;
