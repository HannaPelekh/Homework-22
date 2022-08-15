import "./list.css"
export default class TodoListView {
    #container; 
    #currentEl= null;
    #currentTodo = null;
    #todos = null;     
    #listContainer = null; 
    static CLASSES = {       
        list: "list", 
        todo_items: "todo_items",
        todo_complete: "todo_complete",        
        hideComplete_Btn: "hide_element",
        close: "close",
        dateAndComplete: "dateAndComplete",
        complete: "complete_btn",
        active_item: "active_item",
        title: "title",
        body: "body",
        time_box: "time_box",        
    }   
    constructor(container) {
        this.#listContainer = container;            
    }         
    renderTodos(todos){              
        this.#todos = this.#listContainer.innerHTML = todos.map(t => this.createTodoEl(t)).join('')        
        return this.#todos
    }
    createTodoEl(todo) {
        return `<div class="${TodoListView.CLASSES.todo_items} ${
            todo.isComplete ? TodoListView.CLASSES.todo_complete : ""
            }" id="${todo.id}">
            <div class="${TodoListView.CLASSES.close}"></div>
            <h2 class="${TodoListView.CLASSES.title}">${todo.title}</h2>
            <p class="${TodoListView.CLASSES.body}">${todo.body}</p>
            <div class="${TodoListView.CLASSES.dateAndComplete}">
                <div class="${TodoListView.CLASSES.time_box}">
                    <p>${this.createDate(todo.createDate)}</p>
                    <p>${this.createTime(todo.createTime)}</p>
                </div>    
                <button class="${TodoListView.CLASSES.complete} ${
                    todo.isComplete ? TodoListView.CLASSES.hideComplete_Btn : ""
                    }" id="${todo.id}">complete</button>
            </div>
        </div>`
    }
   
    createDate(date){
        const newDate = moment(date).format("DD.MM.YYYY")        
        return newDate
    }
    createTime(time){
        const newTime = moment(time).format("HH:mm:ss")        
        return newTime
    } 
    createSingleTodo = (todo) => { 
        this.#listContainer.insertAdjacentHTML('afterbegin',this.createTodoEl(todo));
    };   
    saveNewTodo = (todo) => {        
         this.#currentTodo = this.#listContainer.querySelector(`.${TodoListView.CLASSES.active_item}`);
        if(this.#currentTodo.id === todo.id){ 
            this.#currentTodo.querySelector(`.${TodoListView.CLASSES.title}`).innerHTML = todo.title;
            this.#currentTodo.querySelector(`.${TodoListView.CLASSES.body}`).innerHTML = todo.body;    
            this.#currentTodo.classList.remove(TodoListView.CLASSES.active_item); 
        }     
    }       
    getCurrentTodo(e){                   
        this.#currentEl = e.target.closest(`.${TodoListView.CLASSES.todo_items}`); 
    } 
    onTodoComplete = (e) => {
        this.getCurrentTodo(e);              
        if(e.target.closest(`.${TodoListView.CLASSES.complete}`)){              
            if(this.#currentEl){   
                this.#currentEl.classList.add(TodoListView.CLASSES.todo_complete); 
                e.target.closest(`.${TodoListView.CLASSES.complete}`).classList
                .add(TodoListView.CLASSES.hideComplete_Btn)
                return this.#currentEl.id;
            }
        }
    }
    onTodoEdit = (e) => {
        this.getCurrentTodo(e);
        if(this.#currentEl){         
            if(e.target.closest(`.${TodoListView.CLASSES.title}`) || 
                e.target.closest(`.${TodoListView.CLASSES.body}`)){  
                this.removeTodoActivClass();         
                this.setTodoActivClass(e);                                    
                return this.#currentEl.id;
            }    
        }
    }    
    removeTodoActivClass = () => { 
        if(this.#listContainer){ 
             [...this.#listContainer.children].forEach(todo => todo.classList.remove(TodoListView.CLASSES.active_item));  
        }      
    }
    setTodoActivClass(e) { 
        this.getCurrentTodo(e);
        if(this.#currentEl){
            this.#currentEl.classList.add(TodoListView.CLASSES.active_item); 
        }
    } 
    onTodoDelete(e) {  
        this.getCurrentTodo(e);        
        if(e.target.closest(`.${TodoListView.CLASSES.close}`)){ 
            if(this.#currentEl){          
                this.#currentEl.remove();                         
                return this.#currentEl.id;  
        }}
    };  
}