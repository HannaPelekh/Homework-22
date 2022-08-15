import "../todos.css"
import CreateTodoView from "./create.view";
import TodoListView from "./list.view";
import EditTodoView from "./edit.view";
import TodoController from "../todos.controller";

export default class TodosView {
  #container = null;          
  #options = null;
  #createContainer = null;    
  #listContainer = null;
  #editContainer = null;
  #createView = null;
  #listView = null;
  #editView = null; 
  #todoContent = null; 
  static CLASSES = {
    todo_content: "todo_content",
    create_container: "create_container",
    todo_container: "todo_container",
    list_container: "list_container",
    edit_container: "edit_container",    
  }
  constructor(container) {
    this.#container = container;     
     
  }  
  createView = () => { 
    return `
      <div class="${TodosView.CLASSES.todo_content}">
      <div class="${TodosView.CLASSES.create_container}"></div> 
      <div class="${TodosView.CLASSES.todo_container}">
          <div class="${TodosView.CLASSES.list_container}"></div>  
          <div class="${TodosView.CLASSES.edit_container}"></div>
      </div>
      </div>`   
  } 
  init() {    
    this.initView();  
    this.initListeners() 
    this.initContainers()
    new TodoController(this.#container,this);           
  }
  options(options){
    this.#options = options;    
  } 
  initContainers(){
    this.#todoContent = document.querySelector(`.${TodosView.CLASSES.todo_content}`) 
    this.#createContainer = this.#todoContent.querySelector(`.${TodosView.CLASSES.create_container}`) 
    this.#listContainer = this.#todoContent.querySelector(`.${TodosView.CLASSES.list_container}`) 
    this.#editContainer = this.#todoContent.querySelector(`.${TodosView.CLASSES.edit_container}`)     
  }
  initView() { 
    this.initContainers()   
    this.#listView = new TodoListView(this.#listContainer);
    this.#createView = new CreateTodoView(this.#createContainer);
    this.#editView = new EditTodoView(this.#editContainer);     
  }                       
  
  renderTodos(todos) {
    this.#listView.renderTodos(todos); 
  };      
  initListeners() {
    this.initContainers() 
    this.#todoContent.addEventListener('click',this.onTodoClick); 
  };  
  createSingleTodo = (todo) => {        
      this.#listView.createSingleTodo(todo);
  }; 
   
  onTodoClick = (e) => {
    const target = e.target;    
    if(this.#createView.onTodoCreate(e)){      
        this.#options.onCreate(this.#createView.onTodoCreate(e));  
        this.#createView.clearDate();
        return;
    }
    if(this.#listView.onTodoComplete(e)){              
        this.#options.onComplete(this.#listView.onTodoComplete(e));
        return;
    }
    if(this.#listView.onTodoEdit(e)){   
        const curentTodoID = this.#listView.onTodoEdit(e);
        const curentTodo = this.#options.onCurent(curentTodoID);
        this.#editView.EditTodo(curentTodoID, curentTodo); 
                         
        return;
    }
    if(this.#editView.onTodoSave(e)){ 
        this.#options.onSave(this.#editView.onTodoSave(e));  
        return;
    }
    if(this.#listView.onTodoDelete(e)){       
        this.#options.onDelete(this.#listView.onTodoDelete(e));
        return;
    }        
  } 
  saveNewTodo = (todo) => {
      this.#listView.saveNewTodo(todo); 
  }   
  
}
