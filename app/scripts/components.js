const lorem = "Irure veniam do nostrud consectetur voluptate qui voluptate tempor duis incididunt non ullamco.";

class Component {
    name = 'name';
    icon = '';
    DOMelement = null;
    styling = {};

    constructor(name, icon) {
        this.name = name;
        this.icon = icon;
    }

    get element() {
        if (this.DOMelement == null)
            this.createBaseElement("component");
        return this.DOMelement;
    }

    createBaseElement(className, elem) {
        if (!elem)
            elem = document.createElement("div");

        if (typeof(className) != 'object')
            className = [className];
        elem.classList.add(...[...className, this.name]);
        elem.draggable = true;
        this.DOMelement = elem;
    }

    setStyling(property, value) {
        if (this.DOMelement)
            this.DOMelement.style[property] = value;
        this.styling[property] = value;
    }
}

class Placeholder extends Component {
    constructor() {
        super("placeholder", "none");
        super.createBaseElement("placeholder");
        super.setStyling("width", "100%");
        this.DOMelement.draggable = false;
    }
}

class Layout extends Component {
    name = "layout";
    constructor(name) {
        super(name, 'fa-border-all')
    }

    createBaseElement(className) {
        let elem = this.createTable(3);
        super.createBaseElement(["layout", "layout-1-1-1", className], elem);
    }

    createTable(amount, insides = []) {
        let table = document.createElement("table");
        let tbody = document.createElement("tbody");
        let trow = document.createElement("tr");
        for (let i = 0; i < amount; i++) {
            let td = document.createElement("td");
            td.insertAdjacentElement("afterbegin", insides[i] ?? (new Placeholder()).element);
            trow.appendChild(td);
        }
        tbody.appendChild(trow);
        table.appendChild(tbody);
        return table;
    }
}

class Text extends Component {
    name = "text";
    text = lorem;
    constructor(name) {
        super(name, 'fa-align-justify')
    }

    createBaseElement(className) {
        super.createBaseElement(className);
        this.DOMelement.innerText = lorem;
    }
}

const options = [
    new Layout(),
    new Text()
]


optionsContainer = document.getElementById('options');
options.forEach(option => {
    let elem = document.createElement('div');
    elem.classList.add('menu-component');
    elem.innerHTML = `<i class="fa-solid ${option.icon}"></i><span>${option.name}</span>`;
    elem.component = option;
    elem.draggable = true;

    optionsContainer.appendChild(elem);
});

document.getElementById("content").appendChild((new Placeholder).element)