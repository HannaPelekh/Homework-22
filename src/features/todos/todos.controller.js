import TodoModel from "./todos.model";
import TodosView from "./todos.views/todos.view";


export default class TodoController {
    #container = null;
    #view = null;
    #model = null;
    #todos = null;

    constructor(container, view) {             
       this.#container = container
       this.#model = new TodoModel(this); 
       this.#view = view;       
       this.#view.options({
        onCreate: this.onTodoCreate,
        onComplete: this.onTodoComplete,
        onDelete: this.onTodoDelete,
        onSave:  this.onSaveTodo,
        onCurent: this.onGetCurentTodo,    
        });      
       this.init();
    }
    async init() {        
        this.#todos = await this.#model.getTodos();                          
        this.#view.renderTodos(this.#todos); 
    }
    onTodoCreate = async (todo) => {   
        const newTodo =  await this.#model.crateTodo(todo)    
        this.#view.createSingleTodo(newTodo); 
    }
    onTodoComplete = async (id) => {          
        const todo = this.#todos
            .find(t => t.id === id);
        todo.isComplete = true; 
        await this.#model.completeTodo(id, todo)           
    }
    onTodoDelete = (id) => {         
        return this.#model.deleteTodo(id);        
    }
    onGetCurentTodo = (id) => {          
        const curentTodo = this.#todos.find((todo) => todo.id === id);       
        return curentTodo
    }
    onSaveTodo = async (todo) => {        
        await this.#model.editeTodo(todo);   
        this.#view.saveNewTodo(todo);      
    }
}



 