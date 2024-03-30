let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

function saveTodoList() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

// Function to add an item to the todo list
function addItem() {
  const itemName = document.getElementById('item-name').value;
  const itemDate = document.getElementById('item-date').value;
  const priority = document.getElementById('priority').value;
  const today = new Date().toISOString().slice(0, 10);

  if (!itemName.trim()) {
    alert("Error: Task name cannot be empty.");
    return;
  }

  if (itemDate < today) {
    alert("Error: Don't select past dates for the task.");
    return;
  }

  const newItem = { name: itemName, date: itemDate, priority: priority, completed: false };
  todoList.push(newItem);
  saveTodoList();
  renderLists();
}

// Function to delete an item from the todo list
function deleteItem(index) {
  todoList.splice(index, 1);
  saveTodoList();
  renderLists();
}

// Function to toggle completion status of a task
function toggleCompleted(index) {
  todoList[index].completed = !todoList[index].completed;
  saveTodoList();
  renderLists();
}

// Function to render todo lists
function renderLists() {
  const today = new Date().toISOString().slice(0, 10);

  const todayTasks = todoList.filter(item => item.date === today && !item.completed);
  const futureTasks = todoList.filter(item => item.date > today && !item.completed);
  const completedTasks = todoList.filter(item => item.completed);

  const todayTasksHTML = todayTasks.map((item, index) => renderTask(item, index)).join('');
  const futureTasksHTML = futureTasks.map((item, index) => renderTask(item, index)).join('');
  const completedTasksHTML = completedTasks.map((item, index) => renderCompletedTask(item, index)).join('');

  document.getElementById('today-tasks-list').innerHTML = todayTasksHTML;
  document.getElementById('future-tasks-list').innerHTML = futureTasksHTML;
  document.getElementById('completed-tasks-list').innerHTML = completedTasksHTML;
}

function renderTask(item, index) {
    const taskClass = item.completed ? 'completed-task' : 'incomplete-task';
    return `
      <div class="task-card ${taskClass}">
        <p>${item.name}</p>
        <p>Priority: ${item.priority}</p>
        <p>Date: ${item.date}</p>
        <button onclick="deleteItem(${index})">Delete</button>
        ${!item.completed ? `<button onclick="toggleCompleted(${index})">Toggle Completed</button>` : ''}
      </div>
    `;
  }
  
  function renderCompletedTask(item, index) {
    return `
      <div class="task-card completed-task">
        <p>${item.name}</p>
        <p>Priority: ${item.priority}</p>
        <p>Date: ${item.date}</p>
        <button onclick="deleteItem(${index})">Delete</button>
      </div>
    `;
  }  

renderLists();
