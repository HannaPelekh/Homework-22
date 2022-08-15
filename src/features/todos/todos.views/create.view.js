import "./create.css"
export default class CreateTodoView {
    #container = null;
    #createContainer = null;
    #buttonCreate;
    #titleCreate = null;
    #bodyCreate = null;    
    #ErrMsgTitle = null;
    #ErrMsgBody = null;
    #inputBox = null;  
    #IS_DATA_VALID = {
        title: false,
        body: false,  
    };
    constructor(container) {
    this.#container = container; 
    this.init();    
    }
    static CLASSES = {  
        add_container: "add_container",       
        input_title: "input_title",
        input_body: "input_body",
        input_create: "input_create",
        button_create: "button_create",
        error: "error",
        title_error: "title_error",
        body_error: "body_error",  
    } 
    init() {
        this.#container.innerHTML = this.renderCreateContainer();
    }
    renderCreateContainer() {   
        return `        
                <div class="${CreateTodoView.CLASSES.add_container}">
                    <input type="text" required class="${CreateTodoView.CLASSES.input_create} ${CreateTodoView.CLASSES.input_title}" placeholder="ToDo Title" id="input_title">
                    <input type="text" required class="${CreateTodoView.CLASSES.input_create} ${CreateTodoView.CLASSES.input_body}" placeholder="ToDo Body" id="input_body">
                    <button id="button_create" class="${CreateTodoView.CLASSES.button_create}">Create ToDo</button>
                </div> 
                <div class="${CreateTodoView.CLASSES.error}">
                    <div class="${CreateTodoView.CLASSES.title_error}"></div>
                    <div class="${CreateTodoView.CLASSES.body_error}"></div>
                </div>`
    };        
    initCreateClasses(){
        this.#buttonCreate = this.#container.querySelector(`.${CreateTodoView.CLASSES.button_create}`); 
        this.#titleCreate = this.#container.querySelector(`.${CreateTodoView.CLASSES.input_title}`); 
        this.#bodyCreate = this.#container.querySelector(`.${CreateTodoView.CLASSES.input_body}`);
        this.#ErrMsgTitle = this.#container.querySelector(`.${CreateTodoView.CLASSES.title_error}`);
        this.#ErrMsgBody = this.#container.querySelector(`.${CreateTodoView.CLASSES.body_error}`);
        this.#inputBox = this.#container.querySelector(`.${CreateTodoView.CLASSES.add_container}`);            
    };
    onTodoCreate = (e) => { 
        this.initCreateClasses();      
        if(e.target.closest(`.${CreateTodoView.CLASSES.input_title}`)){            
            if(this.#titleCreate){
                this.#titleCreate.addEventListener("keyup", this.validateTitle); 
            }           
        }
        if(e.target.closest(`.${CreateTodoView.CLASSES.input_body}`)){
            if(this.#bodyCreate){
                this.#bodyCreate.addEventListener("keyup", this.validateBody);
            }
        }        
        if(e.target.closest(`.${CreateTodoView.CLASSES.button_create}`)){ 
            if(this.#buttonCreate){                            
                const title = this.#titleCreate.value;            
                const body = this.#bodyCreate.value;
                const todo = {title, body}                           
                return todo;   
            }
        };         
    };  
    validateTitle =(e) => { 
        if (e.target.value.trim().length <= 3) {
            this.#ErrMsgTitle.innerText = "Error, Title should be more then 3 symbols";            
            return;
        }        
        this.#ErrMsgTitle.innerText = "";        
        } 
    validateBody = (e) => { 
        if (e.target.value.trim().length <= 3) {
            this.#ErrMsgBody.innerText = "Error, Body should be more then 3 symbols";            
            return;
        } 
        this.#ErrMsgBody.innerText = "";
    }     
    clearDate(){
            this.#titleCreate.value = "";
            this.#bodyCreate.value = "";   
    }
}
