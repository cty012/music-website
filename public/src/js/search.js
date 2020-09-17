function search() {
    // check empty
    key = document.getElementById("search-bar").value;
    if (key == "") {
        return;
    }
    // find elements "music-head" and "music-body"
    var head = document.getElementById("music-head");
    var body = document.getElementById("music-body");
    // show and hide
    document.getElementById("bar").innerHTML = "";
    document.getElementById("bar").classList.remove("hidden");
    document.getElementById("bar-content").classList.remove("hidden");
    document.getElementById("home-msg").classList.add("hidden");
    // change contents
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
    Object.keys(myMusics).forEach(year => {
        Object.keys(myMusics[year]).forEach(composer => {
            myMusics[year][composer].forEach((music, index) => {
                if (music["name"].toUpperCase().indexOf(key.toUpperCase()) > -1) {
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
                }
            });
        });
    });
    document.getElementById("music-header").innerHTML = "Path: search results of \"" + key.replace(/\s/g, "&nbsp;") + "\":";
    press(null, Array.from(document.getElementsByClassName("menu-button")), "pressed");
    press(null, Array.from(document.getElementsByClassName("bar-button")), "pressed");
}
