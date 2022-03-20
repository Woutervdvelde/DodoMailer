var dragged;

const dropzone = () => {
    let element = document.createElement('div');
    element.classList.add("dropzone");
    return element;
}

const showDropzones = () => {
    document.querySelectorAll(".component").forEach((e, i) => {
        e.before(dropzone());
        e.after(dropzone());
    });
}

const hideDropzones = () => {
    document.querySelectorAll(".dropzone").forEach(e => {
        e.parentElement.removeChild(e);
    });
}

document.ondragstart = (e) => {
    dragged = e.target;
    e.target.style.opacity = .5;
    showDropzones();
}

document.ondragend = (e) => {
    e.target.style.opacity = "";
    hideDropzones();
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
        e.target.style.background = "";
        dragged.parentNode.removeChild(dragged);
        e.target.parentNode.insertBefore(dragged, e.target);
    }
}