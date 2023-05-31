//import ControllerInterface from "./app/ControllerInterface.js";
import Api from "../app/Api.js";

export class AdminController{

    index() {
        console.log('Admin index');

        let api = new Api();

        api.getText('admin.html').then(data => {
            $('main').html($(data).filter('main').html());
        });
    }
}

// Export the Cv class as the default export
export default AdminController;
