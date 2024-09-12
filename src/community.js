import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase, ref, set, push, onValue, increment, DataSnapshot } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-database.js";
import { loadFile } from "./utils.js";
import "./community-card.js"
let array = [];
let smallCardArray = [];
let smallCardArrayURL = [];
let string = "";
let spellCardContainer;
let prefix = "sar7743-";
let offset = 0;
const searchBarKey = prefix + "search-key";
const classKey = prefix + "class-key";
const spellKey = prefix + "spell-key";
const spellbookIndexKey = prefix + "spellbook-index-key";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD8qy5zZPvuvOFlPTiv21uElEVoJgFa3q4",
    authDomain: "d-and-d-project-e0c45.firebaseapp.com",
    projectId: "d-and-d-project-e0c45",
    storageBucket: "d-and-d-project-e0c45.appspot.com",
    messagingSenderId: "109482561895",
    appId: "1:109482561895:web:ae329cc6c1ba6732531fc2"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app);
const db = getDatabase();

const likedSpellBookPath = "sar7743-spellbook-saved/";

const pushSpellBookToCloud = spellB => {
    document.querySelector("#card-section").innerHTML = "";
    const db = getDatabase();
    const favRef = ref(db, `${likedSpellBookPath}${spellB.hash}`);
    set(favRef, spellB); // `dog` is an object with `.title`, `.url`, `.likes` properties etc
};

const favRef = ref(db, likedSpellBookPath);
const scoresChanged = (snapshot) => {
    array = [];
    snapshot.forEach(spellB => {

        const childKey = spellB.key;
        const childData = spellB.val();
        let obj = { childKey, childData };
        array.push(obj);
        console.log(array);

    });
    if (array.length > 0) {
        if (array.length < (offset + parseInt(document.querySelector("#display-select").value))) {
            
            for (let i = offset; i < array.length; i++) {
                spellCardContainer = document.createElement('community-spell-card');
                spellCardContainer.classList.add("column");
                spellCardContainer.classList.add("is-one-fifth");
                spellCardContainer.dataset.name = array[i].childData.title;
                spellCardContainer.dataset.urls = array[i].childData.spellCards;
                string = "";
                array[i].childData.spellCards.forEach(element => {
                    string += `<p>${element.split("/").pop()}</p>`;
                    
                });
                spellCardContainer.shadowRoot.querySelector("#add-things").innerHTML = string;
                document.querySelector("#card-section").appendChild(spellCardContainer);
            }
            
        }
        else {
            for (let i = offset; i < (offset + parseInt(document.querySelector("#display-select").value)); i++) {
                    if(array[i] != null)
                    {
                        spellCardContainer = document.createElement('community-spell-card');
                        spellCardContainer.classList.add("column");
                        spellCardContainer.classList.add("is-one-fifth");
                        spellCardContainer.dataset.name = array[i].childData.title;
                        spellCardContainer.dataset.urls = array[i].childData.spellCards;
                        string = "";
                        array[i].childData.spellCards.forEach(element => {
                        string += `<p>${element.split("/").pop()}</p>`;
                        
                    });
                    spellCardContainer.shadowRoot.querySelector("#add-things").innerHTML = string;
                    document.querySelector("#card-section").appendChild(spellCardContainer);
                    }
                    
                }
            }
        }
    else {
        document.querySelector("#card-section").innerHTML = "NO SPELLBOOKS FOUND";
    }
};
const loadURL = (urlEnd) => {
    const url = `https://www.dnd5eapi.co${urlEnd}`;
    loadFile(url, showSpell);
}
onValue(favRef, scoresChanged);
import { hashCode } from "./utils.js";
import "./nav-bar.js"
const spellbookArrayKey = "spellbook-array-key";
document.querySelector("#push-button").onclick = pushSpellBook;

function pushSpellBook() {
    console.log(document.querySelector("#spellbook-select").value);
    if (JSON.parse(localStorage.getItem(spellbookArrayKey)) != null) {
        let array = JSON.parse(localStorage.getItem(hashCode(document.querySelector("#spellbook-select").value)));
        if (JSON.parse(localStorage.getItem(spellbookArrayKey))[0] == "No Spellbooks Found") {
            alert("No Spellbooks found to push please make a spellbook first!");
            return;
        }
        else if (array.length == 0) {
            alert("Nothing in Spellbook plaese add some spells to the spellbook");
            return;
        }
        else {
            let hash = hashCode(document.querySelector("#spellbook-select").value);
            let likes = 0;
            let title = document.querySelector("#spellbook-select").value;
            let spellCards = [];
            if (JSON.parse(localStorage.getItem(hash) != null)) {
                spellCards = JSON.parse(localStorage.getItem(hash));
            }
            else {
                return;
            }
            let spellB = {
                hash: hash,
                likes: likes,
                title: title,
                spellCards: spellCards
            };
            pushSpellBookToCloud(spellB);
            console.log("done!");
        }
    }
}
const showSpell = (spellObj) => {
   string += `<p> ${spellObj.name} </p>`;
}
function nextButton(){
    if((offset + parseInt(document.querySelector("#display-select").value) < array.length))
    {
        offset += parseInt(document.querySelector("#display-select").value);
        document.querySelector("#card-section").innerHTML = "";
        onValue(favRef, scoresChanged);
    }
        
}
function displayChange(){
    document.querySelector("#card-section").innerHTML = "";
    onValue(favRef, scoresChanged);
}
function prevButton(){
    if((offset - parseInt(document.querySelector("#display-select").value)) < 0)
    {
        offset = 0;
    }
    else{
        offset -= parseInt(document.querySelector("#display-select").value);
    }
    document.querySelector("#card-section").innerHTML = "";
        onValue(favRef, scoresChanged);
}

function init() {
    if (JSON.parse(localStorage.getItem(spellbookArrayKey)) != null) {
        let string = "";
        let array = JSON.parse(localStorage.getItem(spellbookArrayKey));
        if (array.length == 0 || array[0] == "No Spellbooks Found") {
            string = "<option>No Spellbooks Found</option>";
        }
        else {
            for (const iterator of array) {
                string += `<option>${iterator}</option>`;
            }
        }

        document.querySelector("#spellbook-select").innerHTML = string;
    }
    else {
        localStorage.setItem(spellbookArrayKey, JSON.stringify([]));
    }
    document.querySelector("#next-button").onclick = nextButton;
    document.querySelector("#prev-button").onclick = prevButton;
    document.querySelector("#display-select").onchange = displayChange;
}

window.onload = init;