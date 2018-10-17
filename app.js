var todoList = {
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
      var todo = this.todos[position];
      todo.completed = elementChecked.childNodes[3].checked;
    },
    toggleAll: function() {
      var totalTodos = this.todos.length;
      var completedTodos = 0;
  
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
  
  var handlers = {
    addTodo: function() {
      var addTodoTextInput = document.getElementById('addTodoTextInput');
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
  
  var view = {
    displayTodos: function() {
      var todosUl = document.querySelector('ul');
      todosUl.innerHTML = '';
      todoList.todos.forEach(function(todo, position) {
        var todoLi = document.createElement('li');
        var todoTextWithCompletion = '';
  
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
      var deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'deleteButton';
      return deleteButton;
    },
    createChangeButton: function() {
      var changeButton = document.createElement('button');
      changeButton.textContent = 'Change';
      changeButton.className = 'changeButton';
      return changeButton;
    },
    createCompleteButton: function() {
      var completeButton = document.createElement('input');
      completeButton.setAttribute("type", "checkbox");
      completeButton.className = 'todoComplete';
      return completeButton;
    },
    setUpEventListeners: function() {
      var todosUl = document.querySelector('ul');
      todosUl.addEventListener('click', function(event) {
        var elementClicked = event.target;
        var elementChecked = document.getElementById(parseInt(elementClicked.parentNode.id));
        if (elementClicked.className === 'deleteButton') {
          handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
        }
        if (elementClicked.className === 'changeButton') {
          var selectedTodoText = parseInt(elementClicked.parentNode.id);
          var changedTextValue = prompt("Please enter new text:", selectedTodoText);
          handlers.changeTodo(selectedTodoText, changedTextValue);
        }
        if (elementChecked.childNodes[3].checked === true) {
          // handlers.toggleCompleted(parseInt(elementChecked.parentNode.id));
          console.log(elementChecked.childNodes[3].checked);
        } else {
          console.log('item is not checked');
        }
      });
    }
  };
  
  
  view.setUpEventListeners();
  