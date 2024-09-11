//sets up the template of the card (html and css)
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
    <button id = "fav-button" class = "button is-info">fav</button>
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
//custom card class
class SpellCard extends HTMLElement{
    constructor(){
        super();
        //sets up shadowroot
        this.attachShadow({mode:"open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    connectedCallback(){
        //sets up the button onclick
        this.button = this.shadowRoot.querySelector("#fav-button");
        this.button.onclick = () =>{
            this.buttonCallBack(this.getAttribute('data-url'));
            this.button.innerHTML = "Favorited";
        }
        this.render();
    }
    //stores the attributes that are being used
    static get observedAttributes(){
        return ["data-name","data-desc","data-damage","data-classes","data-higher-level", "data-range", "data-level","data-url"];
    }
    //logs the changes in values of observed attributes
    attributeChangedCallback(attributeName, oldVal, newVal){
        this.render();
    }
    render(){
        //const url = this.getAttribute('data-url') ? this.getAttribute('data-url') : "<i>name not found</i>";
        const name = this.getAttribute('data-name') ? this.getAttribute('data-name') : "<i>name not found</i>";
        const spellClass = this.getAttribute('data-classes') ? this.getAttribute('data-classes'):"No Classes Can Learn";
        const desc = this.getAttribute('data-desc') ? this.getAttribute('data-desc') : "desc not found";
        const damage = this.getAttribute('data-damage') ? this.getAttribute('data-damage') : "damage not found";
        const higherLevel = this.getAttribute('data-higher-level') ? this.getAttribute('data-higher-level') : "No Damage Type";
        const range = this.getAttribute('data-range') ? this.getAttribute('data-range') : "range not found";
        const level = this.getAttribute('data-level') ? this.getAttribute('data-level') : "level not found";

        //this.url.innerHTML = url;
        this.shadowRoot.querySelector("h2").innerHTML = name;
        this.shadowRoot.querySelector("#spell-classes").innerHTML = "Classes Can Learn " + spellClass;
        this.shadowRoot.querySelector("#spell-level").innerHTML = "Level learned: " + level;
        this.shadowRoot.querySelector("#spell-damage").innerHTML = damage;
        this.shadowRoot.querySelector("#spell-range").innerHTML = "Range: " + range;
        this.shadowRoot.querySelector("#spell-desc").innerHTML = desc;
        this.shadowRoot.querySelector("#spell-higher-level").innerHTML = "Damage Type: " + higherLevel;
    }

}
//defines the element
customElements.define('spell-card',SpellCard);