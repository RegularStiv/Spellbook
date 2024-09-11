//makes the card for the favorite page
import "./nav-bar.js";
//makes the key for localstorage
const favKey = "sar7743-fav-key";

//makes the template html and css
const template = document.createElement("template");
template.innerHTML = `
<head>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
</head>
<style>
.make-five-hundred{
    overflow-y: scroll;
    overflow-x:hidden;
    height: 500px;
}
</style>
<div >
<div class = "card has-shadow">
    <header class = "card-header">
    <h2 id = "spell-name" class = "card-header-title">title</h2>
    <button id = "remove-button" class = "button is-info">Unfavorite</button>
    </header>
</div>
    <div class = "card has-shadow make-five-hundred">
    <div class = "card-content">
    <div class = "content has-text-centered">
    <p id = "spell-classes">Classes Can Learn: </p>
    <p id = "spell-level">Level Learned: </p>
    <p id = "spell-damage">Damage: </p>
    <p id = "spell-range">Range:</p>
    <p id = "spell-desc">Desc:</p>
    <p id = "spell-higher-level">HL:</p>
    <p id = "url"></p>
    </div>
    </div>
</div>
</div>
`;

//custom html class 
class FavSpellCard extends HTMLElement{
    constructor(){
        super();

        //sets the shadowroot elements 
        this.attachShadow({mode:"open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    connectedCallback(){
        //sets the button html to use in the js
        this.button = this.shadowRoot.querySelector("#remove-button");
        //sets the button onclick to remove itself from the localstorage and the favorites list
        this.button.onclick = () =>{
            if (JSON.parse(localStorage.getItem(favKey)) != null){
                let urlArray = JSON.parse(localStorage.getItem(favKey));
                let urlRemoved = this.getAttribute('data-url');
                for (let i = 0; i < urlArray.length; i++) {
                    if(urlRemoved == urlArray[i]){
                        urlArray.splice(i,1);
                    }
                }
                localStorage.setItem(favKey,JSON.stringify(urlArray));
            }
            this.remove();
        }
        //renders the favorite list
        this.render();
    }
    disconnectedCallback(){
        //removes the onclick from the button after deletion
        this.shadowRoot.querySelector("#remove-button").onclick = null;
    }
    static get observedAttributes(){
        return ["data-name","data-desc","data-damage","data-classes","data-higher-level", "data-range", "data-level", "data-url"];
    }
    attributeChangedCallback(attributeName, oldVal, newVal){
        console.log(attributeName, oldVal, newVal);
        this.render();
    }
    render(){
        //gets the observed attributes and sets them if it isnt found
        const name = this.getAttribute('data-name') ? this.getAttribute('data-name') : "<i>name not found</i>";
        const spellClass = this.getAttribute('data-classes') ? this.getAttribute('data-classes'):"No Classes Can Learn";
        const desc = this.getAttribute('data-desc') ? this.getAttribute('data-desc') : "desc not found";
        const damage = this.getAttribute('data-damage') ? this.getAttribute('data-damage') : "damage not found";
        const higherLevel = this.getAttribute('data-higher-level') ? this.getAttribute('data-higher-level') : "No Damage Applies";
        const range = this.getAttribute('data-range') ? this.getAttribute('data-range') : "range not found";
        const level = this.getAttribute('data-level') ? this.getAttribute('data-level') : "level not found";

        //sets each html element with the observed attributes
        this.shadowRoot.querySelector("h2").innerHTML = name;
        this.shadowRoot.querySelector("#spell-classes").innerHTML = "Classes Can Learn " + spellClass;
        this.shadowRoot.querySelector("#spell-level").innerHTML = "Level learned: " + level;
        this.shadowRoot.querySelector("#spell-damage").innerHTML =  damage;
        this.shadowRoot.querySelector("#spell-range").innerHTML = "Range:" + range;
        this.shadowRoot.querySelector("#spell-desc").innerHTML = desc;
        this.shadowRoot.querySelector("#spell-higher-level").innerHTML = "Type of Damage: " + higherLevel;
    }

}
customElements.define('fav-spell-card',FavSpellCard);