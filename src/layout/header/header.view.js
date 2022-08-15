import "./header.css";
export class HeaderView {  
  #menu = [
    {
      title: "Todos",
      link: "todos",
    },
    {
      title: "Users",
      link: "users",
    },
    {
      title: "Chat",
      link: "chat",
    },
  ];
  #headerContainer = null;
  #options = null;
  #container = null;
  #menuContainer = null;
  static CLASSES = {    
    header: "header_container",
    menu: "menu_container",
    menu_item: "menu_item",    
  }
  constructor(container, options) {    
    this.#options = options;
    this.#container = container;        
  } 
  createHeaderElement() {
    return {
      element: `
      <div class="${HeaderView.CLASSES.header}">
        ${this.createMenu()}
      </div>`,
          cb: this.setListener(),
    }
  }
  createMenu() {
    return `
        <ul class="${HeaderView.CLASSES.menu}">
          ${this.#menu.map(this.createMenuItem).join("")}
        </ul>`;
  }
  createMenuItem(item) {    
    return `
    <li>
      <a class="${HeaderView.CLASSES.menu_item}" name="${item.link}">${item.title}</a> 
    </li>`;
  } 
  setListener = () => { 
    this.#container.addEventListener("click", (e) => this.onMenuItemClick(e));
    
  }   
  onMenuItemClick(e) {
    if(e.target.classList.contains(HeaderView.CLASSES.menu_item)){      
      const item = e.target.closest(".menu_item");    
      this.#options.cb(item.getAttribute("name"));   
    } 
  }
}
