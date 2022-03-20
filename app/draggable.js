var dragged;
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
        e.target.parentElement.querySelectorAll(".placeholder").forEach(elem => {
            if (elem.parentElement.id == "content" || elem.parentElement.tagName == "td")
                elem.parentElement.removeChild(elem);
        });

        if (dragged.component != null)
            addElement(e);
        else
            moveElement(e);
    }
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