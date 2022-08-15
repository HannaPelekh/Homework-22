import "./styles.css";
import "./myframework.css"

import { HeaderView } from "./layout/header/header.view";
import { ContentView } from "./layout/content/content.view";
import { FooterView } from "./layout/footer/footer.view";
export default class MainView {
  #mainContainer = null;
  #headerView = null;
  #contentView = null;
  #footerView = null; 
  #mainLink = "todos";
  static CLASSES = {
    main_container: "main_container"
  }
  constructor(container) {
    this.#mainContainer = container;
    this.init();
    this.#contentView.renderContent(this.#mainLink);
  }
  init() {    
    this.initViews();
    this.renderMainView();     
  }
  renderMainView = () => {
    this.#mainContainer.innerHTML = `
      <div class="${MainView.CLASSES.main_container}">
          ${this.#headerView.createHeaderElement().element}
          ${this.#contentView.createContentElement()}
          ${this.#footerView.createFooterElement()}   
      </div>`;
  }
  initViews() {
    this.#headerView = new HeaderView(this.#mainContainer, 
      {cb: this.onHeaderChange}
    );
    this.#contentView = new ContentView(this.#mainContainer);
    this.#footerView = new FooterView(this.#mainContainer);
    this.#contentView.init()    
  }

  onHeaderChange = (link) => {    
    this.#contentView.renderContent(link);
  }
}
