export default class AddEmail {
    constructor() {
        this.kiti_mailai_list = [];
        this.plius_mail = document.querySelector('#add_mail');
        this.form = document.querySelector('#kontaktu_forma');
        this.before_x = document.querySelector('#kursas_div');

        this.plius_mail.addEventListener('click', this.add_email.bind(this));
//        console.log(this.kiti_mailai_list.length);
        }

    add_email(){
        let n = this.kiti_mailai_list.length + 2;
        let name = "email" + n;

        let div = document.createElement('div');
        div.id = "email_div_"+n;

        let label = document.createElement('label');
        label.htmlFor = name;
        label.textContent = "El. paštas " + n;

        let input = document.createElement('input');
        input.type = "email";
        input.name = name;
        input.id = name;

        let remove = document.createElement('label');
        remove.classList.add('remove');
        remove.textContent = "-";
        remove.addEventListener('click', this.remove_parent.bind(this));

        div.append(label);
        div.append(input);
        div.append(remove);


        this.form.insertBefore(div, this.before_x);
        this.kiti_mailai_list.push(div);
    };

    remove_parent(e){
        let death_mark = e.target.parentNode.id;
        this.kiti_mailai_list = this.kiti_mailai_list.filter(obj => obj.id !== death_mark);

        e.target.parentNode.remove();

        this.update_order();
    };

    update_remove(){
        let removes = document.querySelectorAll('.remove');

        removes.forEach((r)=>{
            r.addEventListener('click', this.remove_parent.bind(this));
        });
    };

    update_order(){
        let n = 2;

        this.kiti_mailai_list.forEach((d)=>{
            console.log(n);
            let name = "email" + n;
            let children = d.children;
            let label = children[0];
            let input = children[1];

            d.id = "email_div_"+n;

            label.htmlFor = name;
            label.textContent = "El. paštas " + n;

            input.name = name;
            input.id = name;

            n++;
        });
    };

}