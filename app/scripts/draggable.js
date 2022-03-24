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
        console.log($(dragged).find(e));
        if (e.previousElementSibling != null && !e.previousElementSibling.classList.contains("dropzone"))
            e.before(dropzone());
        if ($(dragged).find(e).length == 0)
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
        checkRemovePlaceholders(e);
        if (dragged.component != null)
            addElement(e);
        else
            moveElement(e);
        checkAddPlaceholders(e);
    }
}

const checkRemovePlaceholders = (e) => {
    if (e.target.previousElementSibling && e.target.previousElementSibling.classList.contains("placeholder"))
        e.target.parentElement.removeChild(e.target.previousElementSibling);
    if (e.target.nextElementSibling && e.target.nextElementSibling.classList.contains("placeholder"))
        e.target.nextElementSibling.removeChild(e.target.nextElementSibling);
}
const checkAddPlaceholders = (e) => {
    console.log(dragged_last_parent);
    console.log(dragged_last_parent.childNodes);
    console.log(dragged_last_parent.childElementCount);
    if (dragged_last_parent.childElementCount == 1)
        dragged_last_parent.appendChild(new Placeholder().element)
}

const addElement = (e) => {
    let element = new dragged.component.constructor().element;
    e.target.parentNode.insertBefore(element, e.target);
    
}

const moveElement = (e) => {
    dragged.parentNode.removeChild(dragged);
    e.target.style.background = "";
    e.target.parentNode.insertBefore(dragged, e.target);
}