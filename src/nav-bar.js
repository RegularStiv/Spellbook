
const template = document.createElement("template");
template.innerHTML = `
<head>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
</head>
<style>
    #burger{
        height: 70px;
    }
#dndampersand{
    max-height:50px;
}
.navbar-menu{
    height:70px;
}
</style>
<nav class="navbar has-shadow is-info"> 
    <!-- logo/brand -->
    <div class="navbar-brand">
      <a class="navbar-item" href="home.html">
        <img id = "dndampersand" src="images/dragon_ampersand.svg" alt="temparary dnd logo" class="py-2 px-2">
      </a>
      <a class="navbar-burger" id="burger">
        <span></span>
        <span></span>
        <span></span> 
      </a>
    </div>

    <div class="navbar-menu" id="nav-links">
      <div class="navbar-end">
        <a href="home.html" class="navbar-item">Home</a>
        <a href="documentation.html" class="navbar-item">Documentation</a>
        <a href="community.html" class="navbar-item">Community</a>
        <a href="favorites.html" class="navbar-item">Favorites</a>
        <a href="app.html" class="navbar-item">App</a>
      </div>
    </div>
  </nav>
  `;

  class NavBar extends HTMLElement{
    constructor(){
        super();

        //sets the shadowroot elements 
        this.attachShadow({mode:"open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        let pathName = window.location.pathname;
            let page = pathName.split('/').pop();
                const navbarItems = this.shadowRoot.querySelectorAll(".navbar-item");
        for (const n of navbarItems) {
            let nPageName = n.href.split("/").pop();
            if(nPageName == page){
        n.classList.toggle('is-active');
        }
        }               

        const burgerIcon = this.shadowRoot.querySelector('#burger');
        const navbarMenu = this.shadowRoot.querySelector('#nav-links');

        burgerIcon.addEventListener("click", () => {
            navbarMenu.classList.toggle('is-active');
        });
    }
  }
  customElements.define('nav-bar',NavBar);