
const h4selectors = document.getElementsByTagName("h4");
const spanselectors = document.getElementsByTagName("span");
let copy = JSON.parse(localStorage.getItem("names")) || ["Kevin", "Jakob", "Joe", "Michael", "Sonja", "Dario", "Ludwig"]
const aufgaben = ["Küchendienst", "Kochdienst", "Einkaufsdienst", "Bad/Toilettendienst", "Mülldienst", "Blumen/Wohnzimmerdienst", "Kostgeld", "Wäsche/Haushaltsdienst"]
let names = [...copy]

function relaodbutton() {
    names = [...copy]
    setnames()
}

function savenames() {
    let names_array = []
    let inputs = document.getElementsByTagName("input")
    for (let i = 0; i < inputs.length; i++) {
        names_array.push(inputs[i].value)
    }
    copy = names_array
    localStorage.setItem("names", JSON.stringify(copy))
    document.querySelectorAll(".delete").forEach((e) => e.remove())
    document.querySelectorAll(".grid_button").forEach((e) => e.remove())
    const grid_div = document.querySelector(".flex_box")
    copy.forEach((e) => grid_div.innerHTML += button(e))
}

function addinputname() {
    document.querySelector(".flex_box").innerHTML += button("name")
}

function getbutton(index) {
    return document.getElementsByTagName("button")[index];
}

const reload = `<button id="reload" onclick="relaodbutton()">Reload</button>`
document.body.innerHTML += reload

const plus = `<button id="plus" onclick="addinputname()">Plus</button>`
document.body.innerHTML += plus

const save = `<button id="save" onclick="savenames()">Save</button>`
document.body.innerHTML += save

function clearname(name) {
    let index = copy.indexOf(name)
    copy.splice(index, 1)
    document.querySelectorAll(`input[value="${name}"]`).forEach((e) => e.remove())
    document.querySelectorAll(".delete")[index].remove()
}

function button(name) {
    const button = `
        <input type="text" class="grid_button" value="${name}">
        <button class="delete" onclick="clearname('${name}')">Löschen</button>
    `;

    return button;
}


function addname() {
    document.querySelector(".flex_box").innerHTML = ""
    for (let i = 0; i < copy.length; i++) {
        document.querySelector(".flex_box").innerHTML += button(copy[i])
    }
}
addname()
function setupdate() {
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const day = `${date}.${month}.${year}`

    document.getElementsByTagName("h2")[0].innerHTML = day
    const nextMonday = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);
    const nextweek = `${nextMonday.getDate()}.${nextMonday.getMonth() + 1}.${nextMonday.getFullYear()}`;
    document.getElementsByTagName("h2")[1].innerHTML = nextweek;
}

function setspannames() {
    if (names.length === 0) {
        names = [...copy]
    }

    let random = Math.floor(Math.random() * names.length);
    let randomname = names.splice(random, 1)[0];

    return randomname
}
function setnames() {
    for (let i = 0; i < spanselectors.length; i++) {
        let name = setspannames();
        if (i === 6 && name === "Sonja") {
            setnames()
        } else {
            spanselectors[i].innerHTML = i === 7 ? "Sonja" : name
        }
    }
}

function setupaufgaben() {
    for (let i = 0; i < h4selectors.length; i++) {
        h4selectors[i].innerHTML = aufgaben[i]
    }
}

function setupbody() {
    document.body.innerHTML += span
}
setupbody()
setnames()
setupdate()
setupaufgaben()