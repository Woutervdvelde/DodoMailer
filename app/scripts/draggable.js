var dragged;
var dragged_last_parent;
const content = document.getElementById("content");

const dropzone = () => {
    let element = document.createElement('div');
    element.classList.add("dropzone");
    return element;
}

const showDropzones = () => {
    if (content.children.length > 0 && !content.children[0].classList.contains("placeholder"))
        content.insertAdjacentElement("afterbegin",dropzone());
    document.querySelectorAll(".component, .placeholder").forEach((e, i) => {
        if (e.previousElementSibling != null && !e.previousElementSibling.classList.contains("dropzone"))
            e.before(dropzone());
        e.after(dropzone());
    });
}

const hideDropzones = () => {
    document.querySelectorAll(".dropzone").forEach(e => {
        e.parentElement.removeChild(e);
    });
}

const showOutlines = (show = true) => {
    document.getElementById("content").querySelectorAll("td").forEach(elem => {
        if (show) elem.classList.add("show-outline");
        else elem.classList.remove("show-outline");
    })
}

document.ondragstart = (e) => {
    dragged = e.target;
    dragged_last_parent = e.target.parentElement;
    e.target.style.opacity = .5;
    showDropzones();
    showOutlines(true);
}

document.ondragend = (e) => {
    e.target.style.opacity = "";
    hideDropzones();
    showOutlines(false);
}

document.ondragover = (e) => {
    e.preventDefault();
}

document.ondragenter = (e) => {
    if (e.target.className == "dropzone") {
        e.target.style.opacity = .75;
        e.target.style.height = "50px";
        e.target.innerText = "Drop here";
    }
}

document.ondragleave = (e) => {
    if (e.target.className == "dropzone") {
        e.target.style.opacity = .5;
        e.target.style.height = "25px";
        e.target.innerText = "";
    }
}

document.ondrop = (e) => {
    e.preventDefault();
    if (e.target.className == "dropzone") {
        if (dragged.component != null)
            addElement(e);
        else
            moveElement(e);
        checkPlaceholders(e);
    }
}

const checkPlaceholders = (e) => {
    //TODO BUG: removes too many placeholders
    // for (let elem of e.target.parentElement.querySelectorAll(".placeholder")) {
    //     if (e.target.parentElement.id == "content") {
    //         console.log("parent is content container");
    //         elem.parentElement.removeChild(elem);
    //         break;
    //     } else if (elem.parentElement.tagName == "TD") {
    //         console.log(`removing child from TD`)
    //         elem.parentElement.removeChild(elem);
    //     }
    // };
    console.log(e.target.previousElementSibling);
    if (e.target.previousElementSibling.classList.contains("placeholder"))
        e.target.parentElement.removeChild(e.target.previousElementSibling)

    //when children = 1 since the dropzone is still active
    if (dragged_last_parent.tagName == "TD" && dragged_last_parent.children.length == 1)
        dragged_last_parent.appendChild(new Placeholder().element);
}

const addElement = (e) => {
    let element = new dragged.component.constructor().element;
    e.target.parentNode.appendChild(element);
    
}

const moveElement = (e) => {
    dragged.parentNode.removeChild(dragged);
    e.target.style.background = "";
    e.target.parentNode.insertBefore(dragged, e.target);
}