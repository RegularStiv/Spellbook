import { hashCode } from "./utils.js";
const template = document.createElement("template");
template.innerHTML = `
<head>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
</head>
<style>
.community-card{
    height:300px;
    overflow-y: scroll;
}
</style>
<div class = "card has-shadow community-card">
<header class = "card-header">
    <h2 id = "spell-name" class = "card-header-title">title</h2>
</header>
<div class = "card-content">

    <button id = "save-button" class = "button is-info">Save</button>
    <div id ="add-things">
    </div>
    </div>
</div>
`;

class CommunitySpellCard extends HTMLElement{
    constructor(){
        super();
        //sets up shadowroot
        this.attachShadow({mode:"open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    connectedCallback(){
        //sets up the button onclick
        this.button2 = this.shadowRoot.querySelector("#save-button");
        this.button2.onclick = () => {
            if(localStorage.getItem(hashCode(`Community Saved Spellbook - ${this.dataset.name}`)) == null){
                let spells = [];
                spells = this.dataset.urls.split(",");
                localStorage.setItem(hashCode(`Community Saved Spellbook - ${this.dataset.name}`),JSON.stringify(spells));
                
                if(JSON.parse(localStorage.getItem("spellbook-array-key")) != null){
                    let localSpells = JSON.parse(localStorage.getItem("spellbook-array-key"));
                    localSpells.push(`Community Saved Spellbook - ${this.dataset.name}`);
                    localStorage.setItem("spellbook-array-key",JSON.stringify(localSpells));
                }
                console.log("saved");
            }
            else{
                alert("item has already been saved!");
            }
        }
        //renders the favorite list
        this.render();
    }
    //stores the attributes that are being used
    static get observedAttributes(){
        return ["data-name","data-urls"];
    }
    //logs the changes in values of observed attributes
    attributeChangedCallback(attributeName, oldVal, newVal){
        console.log(attributeName, oldVal, newVal);
        this.render();
    }
    render(){
        const name = this.getAttribute('data-name') ? this.getAttribute('data-name') : "<i>name not found</i>";

        this.shadowRoot.querySelector("h2").innerHTML = name;
    }

}
//defines the element
customElements.define('community-spell-card', CommunitySpellCard);