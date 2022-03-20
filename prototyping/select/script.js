//COMPONENTS
const selectedMenu = () => {
    let element = document.createElement('div')
    element.classList.add('selectedMenu');
    element.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    return element;
}



var selected;

$(document).ready(() => {
    // $(".component").click(e => componentClick(e))
    $(".component").click(componentClick)
    $(".container").click((e) => e.target.classList.contains("container") ? deselect() : null)
})

function componentClick(e) {
    if (selected != null && selected.is($(this))) return;
    deselect(e);

    selected = $(this);
    selected.addClass("selected");
    selected.prepend(selectedMenu());
}

const deselect = (e) => {
    if (selected == null) return;

    $(".selectedMenu").remove();
    selected.removeClass("selected");
    selected = null;
}