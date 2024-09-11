const loadFile = (url,callback) => {
    const fetchPromise = async () => {
      const response = await fetch(url);
      callback(await response.json());
    }
    fetchPromise();
  };
function setNavActive(){
let pathName = window.location.pathname;
let page = pathName.split('/').pop();
const navbarItems = document.querySelectorAll(".navbar-item");
for (const n of navbarItems) {
    let nPageName = n.href.split("/").pop();
    if(nPageName == page){
        n.classList.toggle('is-active');
    }
}
}
function setDropDown(){
  const burgerIcon = document.querySelector('#burger');
  const navbarMenu = document.querySelector('#nav-links');

burgerIcon.addEventListener("click", () => {
    navbarMenu.classList.toggle('is-active');
});
}
const hashCode = (str) => {
  let hash = 0;
  if (str.length == 0) {
      return hash;
  }
  for (let i = 0; i < str.length; i++) {
      let char = str.charCodeAt(i);
      hash = hash * 31 + char;
  }
  return hash;
};
  export {loadFile,setNavActive, setDropDown, hashCode};