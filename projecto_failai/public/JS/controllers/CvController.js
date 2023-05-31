import ControllerInterface from "../app/ControllerInterface.js";
import Api from "../app/Api.js";
import Render from "../app/Render.js";

export default class CvController extends ControllerInterface {
    constructor() {
        super();
        console.log('Cv index');
        this.activate_menu();
       };

    async index() {
        let api = new Api();
        let render = new Render();
        let template = await api.getText('cv.html');
        template = $(template).filter('main').html();
        let data = await api.get('api/cv');
        render.render_view("main", template, data);
//        $('main').html($(template).filter('main').html());
    }

    activate_menu(){
        $('.header-link').removeClass("active");
        $('#cv_link').addClass('active');
    };
}
