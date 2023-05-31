export default class Render {
//  į target html elementą prideda pagal data surenderintą template file'ą
    render_view(target, templateFile, data) {
        $(target).html(this.replacePlaceholders(templateFile, data));
        };

//  vietas tarp [] stringe pakeičia objekto elementais
    replacePlaceholders(str, obj) {
        const regex = /\[([^\]]+)]/g;
        return str.replace(regex, (_, prop) => {
            let value = obj;
            const props = prop.split('.');
            props.forEach((prop) => {
                if (value && value.hasOwnProperty(prop)) {
                    value = value[prop];
                } else {
                    return ''; // Jei objektas neturi elemento - gražina tuščią str
                }
            });
            return value;
        });
    }

}
