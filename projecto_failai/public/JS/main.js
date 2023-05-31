import Router from "./app/Router.js";
import Menu from "./modules/menu.js";

window.onload = () => {
    new Menu;

    const router = new Router();
    router.handleRoutes();

};