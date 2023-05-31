//import ControllerInterface from "./CI.js";
import Api from "../app/Api.js";

export class NotFoundController{

    index() {
        console.log('404 index');

        let api = new Api();

        api.getText('404.html').then(data => {
            $('main').html($(data).filter('main').html());
        });
    }
}

// Export the Cv class as the default export
export default NotFoundController;
