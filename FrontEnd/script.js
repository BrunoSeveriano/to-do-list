const url = "http://127.0.0.1:8000";


//Selecionando elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const todoListAll = document.querySelectorAll("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-btn");
const todoDiv = document.querySelector("#todo-list .todo");
const createBtn = document.querySelector("#create-btn");
const deleteBtn = document.querySelector("#remove-todo");

let idTask;

let oldInputValue;

function getList() {    

  fetch(`${url}/api/todos`)
    .then((res) => {      
      return res.json();
    })
    .then((data) => {      
      showList(data);
    });
}

function editTask(editId, name) {
  fetch(`${url}/api/todos/${editId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      completed: false,
    }),
  })
    .then((res) => {      
      return res.json();
    })
    .then((data) => {      
      showList(data);
    });
}

function createTask(name) {
  fetch(`${url}/api/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      completed: false,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      var paragraphs = document.getElementsByTagName("todo-list");

      for (var i = 0, len = paragraphs.length; i < len; ) {
        if (paragraphs[i]) paragraphs[i].remove();
      }
      
      getList();
    });
}

function deleteTask(id) {
  fetch(`${url}/api/todos/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {      
      getList();
    });
}


function showList(data) {  
  for (let i = 0; i < data.length; i++) {
    const todo = data[i];
    const div = document.createElement("div");
    div.classList.add("todo");
    todoList.appendChild(div);

    const p = document.createElement("p");
    p.innerText = todo.name;
    div.appendChild(p);    
    buttons(div, todo.id);
  }


}



const buttons = (div, id) => {
  const buttonDone = document.createElement("button");
  buttonDone.classList.add("finish-todo");
  buttonDone.setAttribute("id", id);
  const iconDone = document.createElement("i");
  iconDone.classList.add("ri-check-line");
  buttonDone.appendChild(iconDone);
  div.appendChild(buttonDone);

  const buttonEdit = document.createElement("button");
  buttonEdit.classList.add("edit-todo");
  buttonEdit.setAttribute("id", id);
  const iconEdit = document.createElement("i");
  iconEdit.classList.add("ri-ball-pen-fill");
  buttonEdit.appendChild(iconEdit);
  div.appendChild(buttonEdit);

  const buttonDelete = document.createElement("button");
  buttonDelete.classList.add("remove-todo");
  buttonDelete.setAttribute("id", id);
  const iconDelete = document.createElement("i");
  iconDelete.classList.add("ri-close-line");
  buttonDelete.appendChild(iconDelete);
  div.appendChild(buttonDelete);
};

//Função para adicionar elementos ao html
const saveTodo = (text) => {
  const todo = document.createElement("div");
  todo.classList.add("todo");

  const todoTitle = document.createElement("p");
  todoTitle.innerText = text;
  todo.appendChild(todoTitle);

  const doneBtn = document.createElement("button");
  doneBtn.classList.add("finish-todo");
  doneBtn.innerHTML = '<i class="ri-check-line"></i>';
  todo.appendChild(doneBtn);

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-todo");
  editBtn.innerHTML = '<i class="ri-ball-pen-fill"></i>';
  todo.appendChild(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("remove-todo");
  deleteBtn.innerHTML = '<i class="ri-close-line"></i>';
  todo.appendChild(deleteBtn);

  todoList.appendChild(todo);

  todoInput.value = "";
};

//Esconder formulario para ediatar tarefa

const hideEditForm = () => {
  editForm.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
};

//Função para editar tarefa

const updateTodo = (text) => {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("p");

    if (todoTitle.innerText === oldInputValue) {
      todoTitle.innerText = text;
    }
  });
};

//Evento de click

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = todoInput.value;

  if (inputValue) {
    saveTodo(inputValue);
  }
});

document.addEventListener("click", (e) => {
  const targetEl = e.target;
  const parentEl = targetEl.closest("div");
  let todoTitle;

  if (parentEl && parentEl.querySelector("p")) {
    todoTitle = parentEl.querySelector("p").innerText;
  }

  if (targetEl.classList.contains("finish-todo")) {
    parentEl.classList.toggle("done");
  }

  if (targetEl.classList.contains("remove-todo")) {
    deleteTask(e.target.id);
    parentEl.remove();
    
  }

  if (targetEl.classList.contains("edit-todo")) {
    hideEditForm();   

    editInput.value = todoTitle;
    oldInputValue = todoTitle;
  }
});

//Cancelar edição

cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();
  hideEditForm();
});

//Editar tarefa

editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  

  hideEditForm();  
  editTask(idTask, editInput.value);
});

todoList.addEventListener("click", (e) => {  
  idTask = e.target.id;
});

createBtn.addEventListener("click", () => {  
  createTask(todoInput.value);
});


