import "./content.css"
import TodosView from "../../features/todos/todos.views/todos.view";
import ChatView from "../../features/chat/chat.view";
import UsersView from "../../features/users/users.view";
export class ContentView {
    static CLASSES = {    
        content: "content_container",
    }
    #LINK_NAVIGATION = {
        todos: null,
        users: null,
        chat: null,
    };
    #container = null;
    #todosView = null;
    #chatView = null;
    #usersView = null;
    #contentContainer = null;
    constructor (container){
        this.#container = container;                
    }
    createContentElement() {
        return `
            <div class="${ContentView.CLASSES.content}">  
            </div>` 
    }
    init() {
        this.initContainer();
        this.initViews();
        this.initLinks()
    }
    initViews(){        
        this.#todosView = new TodosView(this.#container);
        this.#chatView = new ChatView(this.#container);
        this.#usersView = new UsersView(this.#container);        
    }
    initLinks(){
        this.#LINK_NAVIGATION.todos = this.#todosView;
        this.#LINK_NAVIGATION.chat = this.#chatView;
        this.#LINK_NAVIGATION.users = this.#usersView;        
    }
    initContainer = () => {        
        this.#contentContainer = document
            .querySelector(`.${ContentView.CLASSES.content}`);
    }
    renderContent(link) {        
        this.initContainer()            
        this.#contentContainer.innerHTML = this.#LINK_NAVIGATION[link].createView()         
        this.#LINK_NAVIGATION[link].init() 
    } 
}

