const lorem = "Irure veniam do nostrud consectetur voluptate qui voluptate tempor duis incididunt non ullamco.";

class Component {
    name = 'name';
    icon = '';
    element = null;
    styling = {};

    constructor(name, icon) {
        this.name = name;
        this.icon = icon;
    }

    createBaseElement(className) {
        let elem = document.createElement("div");
        elem.classList.add(className);
        this.element = elem;
    }

    setStyling(property, value) {
        if (this.element)
            this.element.style[property] = value;
        this.styling[property] = value;
    }
}

class Placeholder extends Component {
    constructor() {
        super("placeholder", "none");
        super.createBaseElement("placeholder");
        super.setStyling("width", "100%");
    }
}

class Grid extends Component {
    method = 'somemethod';
    constructor(name) {
        super(name, 'fa-border-all')
    }
}

class Text extends Component {
    constructor(name) {
        super(name, 'fa-align-justify')
    }
}

const options = [
    new Grid('layout'),
    new Text('Text')
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