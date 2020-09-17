function init() {
    var element = document.getElementById("menu-button-holder");
    element.innerHTML = (
        "<button class=\"menu-button\" onclick=\"homeButton()\">Home</button>"
    )
    Object.keys(myMusics).forEach(year => {
        element.innerHTML += (
            "<button class=\"menu-button\" onclick=\"menuButton('" + year + "')\">" +
                year +
            "</button>"
        );
    });
    homeButton();
}

window.onload = init;
