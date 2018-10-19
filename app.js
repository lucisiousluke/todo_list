let todoList = {
    todos: [],
    addTodo: function(todoText) {
      this.todos.push({
        todoText: todoText,
        completed: false
      });
    },
    changeTodo: function(position, todoText) {
      this.todos[position].todoText = todoText;
    },
    deleteTodo: function(position) {
      this.todos.splice(position, 1);
    },
    toggleCompleted: function(position) {
      let todo = this.todos[position];
      todo.completed = elementChecked.childNodes[3].checked;
    },
    toggleAll: function() {
      let totalTodos = this.todos.length;
      let completedTodos = 0;
  
      // Get number of completed todos.
      this.todos.forEach(function(todo) {
        if (todo.completed === true) {
          completedTodos++;
        }
      });
  
      this.todos.forEach(function(todo) {
        //case 1: if everything is true make everything flase
        if (completedTodos === totalTodos) {
          todo.completed = false;
        } else {
          //case 2: if everything is false make everything true
          todo.completed = true;
        }
      });
    }
  };
  
  let handlers = {
    addTodo: function() {
      let addTodoTextInput = document.getElementById('addTodoTextInput');
      todoList.addTodo(addTodoTextInput.value);
      addTodoTextInput.value = '';
      view.displayTodos();
    },
    changeTodo: function(position, todoText){
        todoList.changeTodo(position, todoText);
      view.displayTodos();
    },
    deleteTodo: function(position) {
      todoList.deleteTodo(position);
      view.displayTodos();
    },
    toggleCompleted: function(position) {
      todoList.toggleCompleted(position);
      view.displayTodos();
    },
    toggleAll: function() {
      todoList.toggleAll();
      view.displayTodos();
    }
  };
  
  let view = {
    displayTodos: function() {
      let todosUl = document.querySelector('ul');
      todosUl.innerHTML = '';
      todoList.todos.forEach(function(todo, position) {
        let todoLi = document.createElement('li');
        let todoTextWithCompletion = '';
  
        if (todo.completed === true) {
          todoTextWithCompletion = '(x) ' + todo.todoText;
        } else {
          todoTextWithCompletion = '( ) ' + todo.todoText;
        }
  
        todoLi.id = position;
        todoLi.textContent = todoTextWithCompletion;
        todoLi.appendChild(this.createDeleteButton());
        todoLi.appendChild(this.createChangeButton());
        todoLi.appendChild(this.createCompleteButton());
  
  
  
        todosUl.appendChild(todoLi);
      }, this);
    },
    createDeleteButton: function() {
      let deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'deleteButton';
      return deleteButton;
    },
    createChangeButton: function() {
      let changeButton = document.createElement('button');
      changeButton.textContent = 'Change';
      changeButton.className = 'changeButton';
      return changeButton;
    },
    createCompleteButton: function() {
      let completeButton = document.createElement('input');
      completeButton.setAttribute("type", "checkbox");
      completeButton.className = 'todoComplete';
      return completeButton;
    },
    setUpEventListeners: function() {
      let todosUl = document.querySelector('ul');
      todosUl.addEventListener('click', function(event) {
        let elementClicked = event.target;
        let elementChecked = document.getElementById(parseInt(elementClicked.parentNode.id));
        if (elementClicked.className === 'deleteButton') {
          handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
        }
        if (elementClicked.className === 'changeButton') {
          let selectedTodoText = parseInt(elementClicked.parentNode.id);
          let changedTextValue = prompt("Please enter new text:", selectedTodoText);
          handlers.changeTodo(selectedTodoText, changedTextValue);
        }
        if (elementChecked.childNodes[3].checked) {
          // handlers.toggleCompleted(parseInt(elementChecked.parentNode.id));
          elementChecked.style.background = 'red';
        } else {
          elementChecked.style.background = 'transparent';
        }
      });
    }
  };
  
  
  view.setUpEventListeners();
  