
import "./spell-card.js";
import "./stored-cards.js";
import "./nav-bar.js";
import { hashCode, loadFile } from "./utils.js";
let classSpells = [];
let levelSpells = [];
let spellArray = [];
let url = "https://www.dnd5eapi.co/api/spells?level=0";
let prefix = "sar7743-";
const searchBarKey = prefix + "search-key";
const classKey = prefix + "class-key"; 
const spellKey = prefix + "spell-key";
const spellbookArrayKey = "spellbook-array-key";
const spellbookIndexKey = prefix + "spellbook-index-key";
let spellbookKey = prefix + hashCode(document.querySelector("#spellbook-select").value);
// mobile menu


//#endregion
document.querySelector("#class-select").onchange = filterSpells;
document.querySelector("#level-select").onchange = filterSpells;
document.querySelector("#search-button").onclick = filterSpellsButton;
document.querySelector("#spellbook-select").onchange = filterSpells;
document.querySelector("#new-spell-button").onclick = newSpellBook;
function newSpellBook(){
    if(document.querySelector("#spell-name-box").value == "No Spellbooks Found"){
        document.querySelector("#spell-name-box").value = "Ha Ha You're So Funny Stop";
        return;
    }
    else if(JSON.parse(localStorage.getItem(spellbookArrayKey)) != null){
        let spellbookArray = JSON.parse(localStorage.getItem(spellbookArrayKey));
        for (const iterator of spellbookArray) {
            if(document.querySelector("#spell-name-box").value == iterator){
                alert("Choose a different name. Name is already in use");
                return;
            }
        }
        spellbookArray.push(document.querySelector("#spell-name-box").value);
        localStorage.setItem(spellbookArrayKey,JSON.stringify(spellbookArray));
    }
    else{
        let spellbookArray = [document.querySelector("#spell-name-box").value];
        localStorage.setItem(spellbookArrayKey,JSON.stringify(spellbookArray));
    }
        let string = "";
        let array = JSON.parse(localStorage.getItem(spellbookArrayKey));
        for (const iterator of array) {
            string += `<option>${iterator}</option>`;
        }
        document.querySelector("#spellbook-select").innerHTML = string;

        let hash = hashCode(document.querySelector("#spell-name-box").value);
        localStorage.setItem(hash, JSON.stringify([]));
    
}
function filterSpells() {
    document.querySelector("#img").innerHTML = " ";
    classSpells = [];
    levelSpells = [];
    spellArray = [];
    const filterClass = document.querySelector("#class-select").value;
    const filterSpell = document.querySelector("#level-select").value;
    let levelIndex = parseInt(document.querySelector("#level-select").options[document.querySelector("#level-select").selectedIndex].value);
    let classIndex = (document.querySelector("#class-select").options[document.querySelector("#class-select").selectedIndex].value);
    if(document.querySelector("#spellbook-select").selectedIndex != -1)
    {
        let spellBookIndex = document.querySelector("#spellbook-select").options[document.querySelector("#spellbook-select").selectedIndex].value;
        localStorage.setItem(spellbookIndexKey,spellBookIndex);
    }
    localStorage.setItem(spellKey,levelIndex);
    localStorage.setItem(classKey,classIndex);

    url = "https://www.dnd5eapi.co/api/classes/" + filterClass + "/spells";
    loadFile(url, getClassSpells);
    url = "https://www.dnd5eapi.co/api/spells?level=" + filterSpell;
    loadFile(url, getLevelSpells);

    document.querySelector("#side-cards").innerHTML = `<h2 class = "has-text-black has-text-weight-semibold is-underlined column is-full">Current Spellbook: ${document.querySelector("#spellbook-select").value}</h2>`;

    
    if(JSON.parse(hashCode(document.querySelector("#spellbook-select").value)) != null && document.querySelector("#spellbook-select").value != "No Spellbooks Found"){
        let sideArray = JSON.parse(localStorage.getItem(hashCode(document.querySelector("#spellbook-select").value)));
        for (const iterator of sideArray) {
            loadFile("https://www.dnd5eapi.co"+iterator,showSideSpell);
        }
    }
}
const getClassSpells = json =>{
    classSpells = json.results;
    classSpells.forEach(cSpell => {
        levelSpells.forEach(lSpell => {
            if(cSpell.name == lSpell.name){
                spellArray.push(cSpell);
            }
        });
    });
    if(spellArray.length != 0){
            for (const iterator of spellArray) {
            loadFile("https://www.dnd5eapi.co"+iterator.url + "", showSpell);
        }
    }
};
const getLevelSpells = json =>{
    levelSpells = json.results;
    classSpells.forEach(cSpell => {
        levelSpells.forEach(lSpell => {
            if(cSpell.name == lSpell.name){
                spellArray.push(cSpell);
            }
        });
    });
    if(spellArray.length != 0){
            for (const iterator of spellArray) {
            loadFile("https://www.dnd5eapi.co"+iterator.url + "", showSpell);
        }
    }
    
};

function filterSpellsButton(){
    document.querySelector("#img").innerHTML = " ";
    spellArray = [];
    url = "https://www.dnd5eapi.co/api/spells/?name=";
    let search = document.querySelector("#search-box").value;
    url += search;
    loadFile(url, loopAllSpells);
    localStorage.setItem(searchBarKey,search);
}
const loopAllSpells = json => {
    for (const iterator of json.results) {
        loadFile("https://www.dnd5eapi.co"+iterator.url, showSpell);
    }
};
function init(){
    if(JSON.parse(localStorage.getItem(spellbookArrayKey)) != null){
        let string = "";
        let array = JSON.parse(localStorage.getItem(spellbookArrayKey));
        if(array.length == 0 || array[0] == "No Spellbooks Found")
        {
            string = "<option>No Spellbooks Found</option>";
        }
        else{
             for (const iterator of array) {
            string += `<option>${iterator}</option>`;
        }
        }
       
        document.querySelector("#spellbook-select").innerHTML = string;
    }
    else{
        localStorage.setItem(spellbookArrayKey, JSON.stringify([]));
    }
    if(localStorage.getItem(spellbookIndexKey) == null){
        localStorage.setItem(spellbookIndexKey, 0);
    }
    else{
        document.querySelector("#spellbook-select").value = localStorage.getItem(spellbookIndexKey);
    }
    document.querySelector("#search-box").value = localStorage.getItem(searchBarKey);
    if(localStorage.getItem(classKey) == null){
        localStorage.setItem(classKey, 0);
    }
    else{
        document.querySelector("#class-select").value = localStorage.getItem(classKey);
    }
    if(localStorage.getItem(spellKey) == null){
        localStorage.setItem(spellKey, 0);
    }
    else{
        document.querySelector("#level-select").value = localStorage.getItem(spellKey);
    }
    
    filterSpells();
}
const showSpell = spellObj =>{
    const spellCard = document.createElement('spell-card');
    spellCard.dataset.name = spellObj.name ?? "No name Found";
    spellCard.dataset.level = spellObj.level ?? "No name Found";
    let classes = spellObj.classes;
    let string = "";
    for (const iterator of classes) {
        string += iterator.name + " ";
    }
    spellCard.dataset.classes = string;
    if(spellObj.damage){
        if(spellObj.damage.damage_at_slot_level){
            spellCard.dataset.damage = "Damage Dealt per spell slot " + spellObj.damage.damage_at_slot_level[`${spellObj.level}`] ?? "No name Found";
        }
        else if(spellObj.damage.damage_at_character_level){
            let array = JSON.stringify(spellObj.damage.damage_at_character_level).split(",");
            let string = "";
            array.forEach(element => {
                element += '\n';
                string += element;
            });
            spellCard.dataset.damage = "Damage dealt per level " + string ?? "No name Found";
        }
        if(spellObj.damage.damage_type.name){
            spellCard.dataset.higherLevel =  spellObj.damage.damage_type.name
        }
    }
    else if(spellObj.heal_at_slot_level){
        let array = JSON.stringify(spellObj.heal_at_slot_level).split(",");
        let string = "";
        array.forEach(element => {
            element += '\n';
            string += element;
        });
        spellCard.dataset.damage = "Healing: " + string ;
    }
    else {
        spellCard.dataset.damage = "no damage applies";
        spellCard.dataset.higherLevel = "no damage type";
    }
    spellCard.dataset.desc = spellObj.desc ?? "No name Found";
    spellCard.dataset.range = spellObj.range ?? "No name Found";
    spellCard.dataset.url = spellObj.url ?? "NAN";
    if(JSON.parse(localStorage.getItem(hashCode(document.querySelector("#spellbook-select").value))) != null){
        let urlArray = JSON.parse(localStorage.getItem(hashCode(document.querySelector("#spellbook-select").value)));
        for(let i = 0; i < urlArray.length; i++)
        {
            if(spellCard.dataset.url == urlArray[i]){
                spellCard.shadowRoot.querySelector("#fav-button").innerHTML = "favorited";
            }
        }
    }
    spellCard.classList.add("column");
    spellCard.classList.add("is-4");
    document.querySelector("#img").appendChild(spellCard);

    spellCard.buttonCallBack = addToFavorites;
    
};
const showSideSpell = spellObj =>{
    const spellCard = document.createElement('side-spell-card');
    spellCard.dataset.name = spellObj.name ?? "No Name Found";
    spellCard.dataset.url = spellObj.url ?? "No url Found";

    spellCard.classList.add("column");
    spellCard.classList.add("is-full");
    document.querySelector("#side-cards").appendChild(spellCard);
};
function addToFavorites(url){
    spellbookKey = hashCode(document.querySelector("#spellbook-select").value);
    if(JSON.parse(localStorage.getItem(spellbookKey)) != null){
        let urlArray = JSON.parse(localStorage.getItem(spellbookKey));
        for(let i = 0; i < urlArray.length; i++){
            if(url == urlArray[i])
            {
                return;
            }
        }
        urlArray.push(url);
        localStorage.setItem(spellbookKey,JSON.stringify(urlArray));
    }
    else{
        let urlArray = [url];
        localStorage.setItem(spellbookKey, JSON.stringify(urlArray));
    }
    loadFile("https://www.dnd5eapi.co" + url,showSideSpell);
}

window.onload = init;