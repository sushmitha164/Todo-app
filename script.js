let todos = [];
let todoCounter = 0;

const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoCategory = document.getElementById('todoCategory');
const todoTime = document.getElementById('todoTime');
const todoPoints = document.getElementById('todoPoints');

const todoList = document.getElementById('todoList');
const emptyMessage = document.getElementById('emptyMessage');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');

todoForm.addEventListener('submit', function (e) {
  e.preventDefault();
  addTodo();
});

function addTodo() {
  const text = todoInput.value.trim();
  if (text === '') {
    alert('Please enter a task!');
    return;
  }

  const newTodo = {
    id: todoCounter,
    text: text,
    category: todoCategory.value,
    time: todoTime.value,
    points: parseInt(todoPoints.value),
    completed: false
  };

  todos.push(newTodo);
  todoCounter++;

  todoInput.value = '';
  todoCategory.value = '';
  todoTime.value = '';
  todoPoints.value = '';

  displayTodos();
}

function displayTodos() {
  todoList.innerHTML = '';

  if (todos.length === 0) {
    emptyMessage.style.display = 'block';
    updateProgress();
    return;
  }

  emptyMessage.style.display = 'none';

  todos.forEach(function (todo) {
    const listItem = document.createElement('li');
    listItem.className = 'todo-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', function () {
      todo.completed = checkbox.checked;
      displayTodos(); // re-render and update progress
    });

    const taskText = document.createElement('span');
    taskText.className = 'todo-text';
    taskText.textContent = todo.text;
    if (todo.completed) {
      taskText.classList.add('completed');
    }

    const categoryTag = document.createElement('span');
    categoryTag.className = 'category-tag';
    categoryTag.classList.add(todo.category.toLowerCase().replace(/\s/g, ''));
    categoryTag.textContent = todo.category;

    const time = document.createElement('small');
    time.classList.add('due-text');
    time.innerHTML = `<strong>Due:</strong> ${todo.time}`;

    const points = document.createElement('small');
    points.classList.add('points-text');
    points.innerHTML = `<strong>Points:</strong> ${todo.points}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = function () {
      deleteTodo(todo.id);
    };

    listItem.appendChild(checkbox);
    listItem.appendChild(taskText);
    listItem.appendChild(document.createElement('br'));
    listItem.appendChild(categoryTag);
    listItem.appendChild(document.createElement('br'));
    listItem.appendChild(time);
    listItem.appendChild(document.createElement('br'));
    listItem.appendChild(points);
    listItem.appendChild(deleteBtn);

    todoList.appendChild(listItem);
  });

  updateProgress();
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  displayTodos();
}

function updateProgress() {
  let totalPoints = 0;
  let completedPoints = 0;

  todos.forEach(todo => {
    totalPoints += todo.points;
    if (todo.completed) {
      completedPoints += todo.points;
    }
  });

  const percent = totalPoints > 0 ? Math.round((completedPoints / totalPoints) * 100) : 0;
  progressBar.style.width = `${percent}%`;
  progressText.textContent = `${completedPoints} / ${totalPoints} points completed`;
}
