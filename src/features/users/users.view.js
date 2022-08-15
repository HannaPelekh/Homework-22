import "./users.css"
export default class UsersView {
    static CLASSES ={
        user_content: "user_content"
    }
    #container = null;
    #userContainer = null;
    constructor(container) {  
      this.#container = container;
    }
    init() {
      this.#userContainer = this.#container
            .querySelector(`.${UsersView.CLASSES.user_content}`);
    }
    createView = () => {       
      return `
        <div class="${UsersView.CLASSES.user_content}">USER</div>`   
      }     
  }