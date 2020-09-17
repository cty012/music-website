function homeButton(year) {
    // find element "homew-msg"
    var element = document.getElementById("home-msg");
    // show and hide
    document.getElementById("bar").classList.add("hidden");
    document.getElementById("bar-content").classList.add("hidden");
    element.classList.remove("hidden");
    // change contents
    element.innerHTML = "";
    homeMsg.forEach(msgLine => {
        element.innerHTML += (
            `<p class="home-paragraph">` +
                msgLine +
            `</p>`
        );
    });
    press("Home", Array.from(document.getElementsByClassName("menu-button")), "pressed");
}

function menuButton(year) {
    // find element "bar"
    var element = document.getElementById("bar");
    // show and hide
    document.getElementById("bar").classList.remove("hidden");
    document.getElementById("bar-content").classList.remove("hidden");
    document.getElementById("home-msg").classList.add("hidden");
    //change contents
    var str = `<div id="arrow-left" onmouseover="scrollToLeft()" onmouseout="stopScroll()"></div><div id="bar-box">`;
    Object.keys(myMusics[year]).forEach(composer => {
        str += (
            `<button class="bar-button" onclick="barButton(\`` + year + `\`, \`` + composer + `\`)">` +
                composer +
            `</button>`
        );
    });
    str += `</div><div id="arrow-right" onmouseover="scrollToRight()" onmouseout="stopScroll()"></div>`;
    element.innerHTML = str;
    press(year, Array.from(document.getElementsByClassName("menu-button")), "pressed");
}

function barButton(year, composer) {
    var head = document.getElementById("music-head");
    var body = document.getElementById("music-body");
    head.innerHTML = (
        `<tr>
            <th class="music-button-holder">play</th>
            <th class="music-name left">name</th>
            <th class="music-description left">description</th>
            <th class="music-composer">composer</th>
            <th class="music-year">year</th>
        </tr>`
    );
    body.innerHTML = "";
    myMusics[year][composer].forEach((music, index) => {
        body.innerHTML += (
            `<tr class="music-info">
                <td class="music-button-holder">
                    <img class="music-button round" src="/src/img/play.png" onclick="musicButton(\`` + year + `\`, \`` + composer + `\`, ` + index + `, \`` + music["name"] + `\`)"></img>
                </td>
                <td class="music-name left">` + music["name"] + `</td>
                <td class="music-description left">` + music["info"] + `</td>
                <td class="music-composer">` + composer + `</td>
                <td class="music-year">` + year + `</td>
            </tr>`
        );
    });
    document.getElementById("music-header").innerHTML = "Path: " + year + " >>> " + composer + ":";
    press(composer, Array.from(document.getElementsByClassName("bar-button")), "pressed");
}

function press(button, buttons, clazz) {
    buttons.forEach(btn => {
        if (btn.innerHTML == button) {
            btn.classList.add(clazz);
        } else {
            btn.classList.remove(clazz);
        }
    });
}

var scrolling = null;

function scrollToLeft() {
    scrolling = setInterval(() => {
        document.getElementById("bar-box").scrollLeft -= 4
    }, 20);
}

function scrollToRight() {
    scrolling = setInterval(() => {
        document.getElementById("bar-box").scrollLeft += 4
    }, 20);
}

function stopScroll() {
    clearInterval(scrolling);
}
