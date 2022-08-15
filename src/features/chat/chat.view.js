import ChatController from "./chat.controller";
import "./chat.css";

export default class ChatView {
  static CLASSES ={
    chat_content: "chat_content",
    chat_container: "chat_container",
    chat_users_container: "chat_users_container",
    chat_content_container: "chat_content_container",
    chat_message_container: "chat_message_container",
    chat_action_container: "chat_action_container",
    chat_input: "chat_input",
    chat_send: "chat_send",
    chat_user: "chat_user",
}
#chatContainer = null;
  constructor() {    
    new ChatController(this);    
  }
  createView = () => {     
    return `
        <div class="${ChatView.CLASSES.chat_content}">
          <div class="${ChatView.CLASSES.chat_container}">
            <div class="${ChatView.CLASSES.chat_users_container}">
                <div class="${ChatView.CLASSES.chat_user}">Vasya</div>
                <div class="${ChatView.CLASSES.chat_user}">Bob</div>
                <div class="${ChatView.CLASSES.chat_user}">Francesco</div>
                <div class="${ChatView.CLASSES.chat_user}">Eva</div>
                <div class="${ChatView.CLASSES.chat_user}">Adam</div>
            </div>
            <div class="${ChatView.CLASSES.chat_content_container}">
              <div class="${ChatView.CLASSES.chat_message_container}">messages</div>
              <div class="${ChatView.CLASSES.chat_action_container}">
                <input type="text" class="${ChatView.CLASSES.chat_input}">
                <button class="${ChatView.CLASSES.chat_send}">Send msg</button>
              </div>
            </div>
          </div>
        </div>`;
  }
  
  renderUser = (users) => {   
  //   function onload() {  
  //   this.setListeners();
  //   document.querySelector(`.${ChatView.CLASSES.chat_users_container}`).innerHTML =
  //   this.crateUsers(users);
    }
    init(){
      this.#chatContainer = document.querySelector(`.${ChatView.CLASSES.chat_users_container}`)
    }
  // }

  // crateUsers(users) {
  //   return users.map(this.createUserEl).join("");
  // }
  // createUserEl(u) {
  //   return `
  //       <div class="chat_user">
  //           ${u.name}
  //       </div>
  //   `;
  // }
  // setListeners() {      
  //   document
  //     .querySelector(".chat_users_container")
  //     .addEventListener("click", this.onuserClick);
  //   document.querySelector(".chat_send").addEventListener("click", this.onSend);
  // }
  // onSend = () => {};
  // onuserClick = () => {};
}
