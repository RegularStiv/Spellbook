//import statements
import { loadFile, hashCode } from "./utils.js";
import "./favorite-cards.js";
//key to all favorited spells
document.querySelector("#spellbooks").onchange = loadDifferentSpells;
const showSpell = spellObj =>{
    //logs the json 
    console.log(spellObj);
    //creates a spell card
    const spellCard = document.createElement('fav-spell-card');
    //sets the name and level 
    spellCard.dataset.name = spellObj.name ?? "No name Found";
    spellCard.dataset.level = spellObj.level ?? "No name Found";
    let classes = spellObj.classes;
    let string = "";
    for (const iterator of classes) {
        string += iterator.name + " ";
    }
    spellCard.dataset.classes = string;
    //if the object does damage
    if(spellObj.damage){
        //gets damage if based on spell slot
        if(spellObj.damage.damage_at_slot_level){
            spellCard.dataset.damage = "Damage Dealt per spell slot " + spellObj.damage.damage_at_slot_level[`${spellObj.level}`] ?? "No name Found";
        }
        //gets damage if based on character level
        else if(spellObj.damage.damage_at_character_level){
            let array = JSON.stringify(spellObj.damage.damage_at_character_level).split(",");
            let string = "";
            array.forEach(element => {
                element += '\n';
                string += element;
            });
            spellCard.dataset.damage = "Damage dealt per level " + string ?? "No name Found";
        }
        //gets damage type if it exists
        if(spellObj.damage.damage_type.name){
            spellCard.dataset.higherLevel =  spellObj.damage.damage_type.name
        }
    }
    //gets healing based on spell slot
    else if(spellObj.heal_at_slot_level){
        let array = JSON.stringify(spellObj.heal_at_slot_level).split(",");
        let string = "";
        array.forEach(element => {
            element += '\n';
            string += element;
        });
        spellCard.dataset.damage = "Healing: " + string ;
        spellCard.dataset.higherLevel = "no damage type";
    }
    //sets damage type and damage/healing 
    else {
        spellCard.dataset.damage = "no damage applies";
        spellCard.dataset.higherLevel = "no damage type";
    }
    //sets desc range and url
    spellCard.dataset.desc = spellObj.desc ?? "No name Found";
    spellCard.dataset.range = spellObj.range ?? "No name Found";
    spellCard.dataset.url = spellObj.url ?? "NAN";
    spellCard.classList.add("column");
    spellCard.classList.add("is-4");
    //appends the section with the card
    document.querySelector("#img").appendChild(spellCard);
  };
function loadDifferentSpells(){
    document.querySelector("#img").innerHTML = "";
    getCardsFromStorage(hashCode(document.querySelector("#spellbooks").value));
    let arrayKey = "sar7743-spellbook-index-key";
    localStorage.setItem(arrayKey, document.querySelector("#spellbooks").value);
}
//calls load file on a url
  const loadURL = (urlEnd) => {
    const url = `https://www.dnd5eapi.co${urlEnd}`;
    loadFile(url,showSpell);
  };
  //sets up the page onload
  function init(){
      
      let arrayKey = "spellbook-array-key";
      if(JSON.parse(localStorage.getItem(arrayKey)) != null){
        let string = "";
        let array = JSON.parse(localStorage.getItem(arrayKey));
        if(array.length == 0 || array[0] == "No Spellbooks Found")
        {
            string = "<option>No Spellbooks Found</option>";
        }
        else{
             for (const iterator of array) {
            string += `<option>${iterator}</option>`;
        }
        }
       
        document.querySelector("#spellbooks").innerHTML = string;
        let index = localStorage.getItem("sar7743-spellbook-index-key");
        for (const iterator of array) {
            if(index == iterator){
                document.querySelector("#spellbooks").value = index;
            }
        }

    }
    else{
        localStorage.setItem(spellbookArrayKey, JSON.stringify([]));
    }

    getCardsFromStorage(hashCode(document.querySelector("#spellbooks").value));
    
  }
  const getCardsFromStorage = (key) =>{
        //if the local storage array exists 
      if(JSON.parse(localStorage.getItem(key)) != null){
          //goes through the JSON and makes an array 
        let urlArray = JSON.parse(localStorage.getItem(key));
        for (const iterator of urlArray) {
            //loads each url in the array
            loadURL(iterator);
        }
      }
  };
  window.onload = init;