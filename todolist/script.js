const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoItemslist = document.querySelector('.todo-items');

let todos = [];

todoForm.addEventListener('submit', 
    function(event){
        event.preventDefault();
        addTodo(todoInput.value);

    }
);

function addTodo(item){
    if(item !== ''){
        const todo = {
            id: Date.now(),
            name: item,
            completed: false
        };

        todos.push(todo);
        addToLocalStorage(todos);

        todoInput.value = '';
    }
}
function renderTodo(todos) {
    todoItemslist.innerHTML = '';

    todos.forEach(function (item) {
        const checked = item.completed ? 'checked' : null;

        const li = document.createElement('li');
        li.setAttribute('class', 'item');

        li.setAttribute('data-key', item.id);

        if (item.completed == true) {
            li.classList.add('checked'); // Corrected line
        }
        li.innerHTML = `
        <input type='checkbox' class='checkbox' ${checked}>
        <span class='todo-item-style'>${item.name}</span>
        <button class='delete-button'>X</button>
        `;

        todoItemslist.append(li);
    });
}


    function addToLocalStorage(todos){
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodo(todos);
    }

    function getFormLocalStorage(){
        const reference = localStorage.getItem('todos');

        if(reference){
            todos = JSON.parse(reference);
            renderTodo(todos);
        }
    }

    function toggle(id){
        todos.forEach(function(item){
            if(item.id == id){
                item.completed =! item.completed;
            }

        });

        addToLocalStorage(todos);
    }


    function deleteTodo(id){
        todos = todos.filter(function(item){
            return item.id != id;
        });

        addToLocalStorage(todos);
    }

    getFormLocalStorage();

    todoItemslist.addEventListener('click', function(event){

        if(event.target.type == 'checkbox'){
            toggle(event.target.parentElement.getAttribute('data-key'));
        }

        if(event.target.classList.contains('delete-button')){
               deleteTodo(event.target.parentElement.getAttribute('data-key'));
        }
    });