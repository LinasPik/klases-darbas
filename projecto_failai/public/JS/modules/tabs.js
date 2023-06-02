export default class Tabs {
    constructor() {
        let tab1 = this.tab_gen(document.querySelector('#tab1'), document.querySelector('#content1'));
        let tab2 = this.tab_gen(document.querySelector('#tab2'), document.querySelector('#content2'));
        let tab3 = this.tab_gen(document.querySelector('#tab3'), document.querySelector('#content3'));
        let tab4 = this.tab_gen(document.querySelector('#tab4'), document.querySelector('#content4'));
        this.tabs_list = [tab1, tab2, tab3, tab4];

        this.tabs = document.querySelectorAll('.tab');
        this.exits = document.querySelectorAll('.exit');
        this.header = document.querySelector('#tabs');
        this.main = document.querySelector('main');
        this.tabName = document.querySelector('#tabName');
        this.tabContent = document.querySelector('#tabContent');
        this.submit = document.querySelector('#submit');
    }


    listen(){
        this.tab_listener();
        this.submit.addEventListener('click', this.add_tab.bind(this));
    };

    tab_gen(tab_v, con_v){
        return {tab: tab_v, content: con_v};
    };

    update_tabs(){
        this.tabs = document.querySelectorAll('.tab');
        this.exits = document.querySelectorAll('.exit');
    };

    activate_tabs(tab){
        this.tabs_list.forEach((t)=>{
            if(tab == t.tab.id){
                t.tab.classList.add('active');
                t.content.classList.add('active_c');
            }else{
                t.tab.classList.remove('active');
                t.content.classList.remove('active_c');
            };
        });
    };

    add_tab(e){
        e.preventDefault();
        let name = (tabName.value=="") ? "Naujas":tabName.value;
        let content = tabContent.value;
        let n = this.tabs_list.length+1;

        let tab = document.createElement('div');
        tab.classList.add("tab");
        tab.id = "tab"+n;
        tab.textContent = name;

        let div = document.createElement('div');
        div.classList.add("content");
        div.id = "content"+n;


        let new_content = document.createElement('div');
        new_content.classList.add("new_content");
        new_content.id = "new_content"+n;
        new_content.innerHTML = content;
        div.append(new_content);



        let exit = document.createElement('span');
        exit.classList.add("exit");
        exit.id = "exit"+n;
        exit.textContent = "X";
        tab.append(exit);

        this.header.append(tab);
        this.main.append(div);
        this.tabs_list.push(this.tab_gen(document.querySelector('#tab'+n), document.querySelector('#content'+n)));

        this.update_tabs();

        this.tab_listener();

    };


    tab_listener(){
        this.tabs.forEach((t)=>{
            t.addEventListener('click', (e)=>{
                if(!t.classList.contains('active')){
                    this.activate_tabs(e.target.id);
                }
            });
        });

        let exit_tabs = Array.from(this.tabs);


        exit_tabs.slice(1).forEach((t)=>{
            t.addEventListener('mouseenter', (e)=>{
                let exit = e.target.children[0];
                exit.classList.add('active_e');
            });
            t.addEventListener('mouseleave', (e)=>{
                let exit = e.target.children[0];
                exit.classList.remove('active_e');
            });
        });

        this.exits.forEach((exit)=>{
            exit.addEventListener("click", this.exit_tab.bind(this));
        });
    };


    exit_tab(e){
        e.stopPropagation();
        let death_mark = e.target.parentNode.id;
        let doomed = this.tabs_list.filter(obj => obj.tab.id == death_mark)[0];
        let active = this.tabs_list.filter(obj => obj.tab.classList.contains('active'))[0];
        if(death_mark==active.tab.id){this.activate_tabs('tab1');};

        doomed.tab.remove();
        doomed.content.remove();

        this.tabs_list = this.tabs_list.filter(obj => obj.tab.id !== death_mark);
        this.update_order();
    };


    update_order(){
        let n = 1;
        this.tabs_list.forEach((t)=>{
            t.tab.id = "tab"+n;
            t.content.id = 'content'+n;
            n++;
        });
    };

}











