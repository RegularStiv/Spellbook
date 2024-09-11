import { hashCode,loadFile } from "./utils.js";
const template = document.createElement("template");
template.innerHTML = `
<head>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
</head>
<style>
    width:100px;
</style>
<div class = "card has-shadow">
    <header class = "card-header">
    <h2 id = "spell-name" class = "card-header-title">title</h2>
    <button id = "un-fav-button" class = "button is-info pt-1">unfavorite</button>
    </header>
    <p id = "url"></p>
    </div>
</div>
`;

class SideSpellCard extends HTMLElement{
    constructor(){
        super();
        //sets up shadowroot
        this.attachShadow({mode:"open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    connectedCallback(){
        //sets up the button onclick
        this.button = this.shadowRoot.querySelector("#un-fav-button");
        this.button.onclick = () =>{
            if (JSON.parse(localStorage.getItem(hashCode(document.querySelector("#spellbook-select").value))) != null){
                let urlArray = JSON.parse(localStorage.getItem(hashCode(document.querySelector("#spellbook-select").value)));
                let urlRemoved = this.getAttribute('data-url');
                for (let i = 0; i < urlArray.length; i++) {
                    if(urlRemoved == urlArray[i]){
                        urlArray.splice(i,1);
                    }
                }
                localStorage.setItem(hashCode(document.querySelector("#spellbook-select").value),JSON.stringify(urlArray));
            }
            console.log(document.querySelector("#img").childNodes[1].dataset.name);
            for (let iterator = 1; iterator <  document.querySelector("#img").childNodes.length; iterator++) {
                if(document.querySelector("#img").childNodes[iterator].dataset.name == this.getAttribute('data-name')){
                    document.querySelector("#img").childNodes[iterator].shadowRoot.querySelector("#fav-button").innerHTML = "fav";
                }
            }
            this.remove();
        }
        //renders the favorite list
        this.render();
    }
    //stores the attributes that are being used
    static get observedAttributes(){
        return ["data-name", "data-url"];
    }
    //logs the changes in values of observed attributes
    attributeChangedCallback(attributeName, oldVal, newVal){
        console.log(attributeName, oldVal, newVal);
        this.render();
    }
    render(){
        //const url = this.getAttribute('data-url') ? this.getAttribute('data-url') : "<i>name not found</i>";
        const name = this.getAttribute('data-name') ? this.getAttribute('data-name') : "<i>name not found</i>";

        //this.url.innerHTML = url;
        this.shadowRoot.querySelector("h2").innerHTML = name;
    }

}
//defines the element
customElements.define('side-spell-card', SideSpellCard);