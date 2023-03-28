// Selecting necessary elements from the HTML document
const taskInput = document.querySelector('input[type="text"]');
const addBtn = document.querySelector('button[type="submit"]');
const taskList = document.querySelector('.todo-list ul');
const totalTasks = document.getElementById('total');
const completedTasksLink = document.getElementById('completed');
const uncompletedTasksLink = document.getElementById('uncompleted');
const completeAllTasksLink = document.getElementById('completeAll');
const clearCompletedTasksLink = document.getElementById('clearCompleted');
// Initializing a taskId variable to keep track of the task IDs
let taskId = 0;
// Function to add a new task to the task list
function addTask(event) {
    // Prevents the form from submitting and reloading the page
  event.preventDefault();
  // Trims the white spaces and returns a new string. and checks if it is not empty
  const task = taskInput.value.trim();
  
  if (task !== '') {
      taskId++;
    const taskIdString = 'task-' + taskId;
    const taskItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = taskIdString;
    checkbox.addEventListener('click', completeTask);
    const label = document.createElement('label');

    // we are setting the for attribute of the label to the task ID
    label.setAttribute('for', taskIdString); 
    label.innerText = task;
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.addEventListener('click', deleteTask);
    taskItem.appendChild(checkbox);
    taskItem.appendChild(label);
    taskItem.appendChild(deleteBtn);
    taskList.appendChild(taskItem);
    taskInput.value = '';
    updateTotalTasks();
  }
}
// Function to delete a task item
function deleteTask(event) {
  event.preventDefault();
  // Gets the task item parent element and removes the task item from the task list
  const taskItem = event.target.parentNode;
  taskList.removeChild(taskItem);
  updateTotalTasks();// Updates the total task count
}
// Function to mark a task item as completed or not completed
function completeTask(event) {
  const checkbox = event.target;
  const taskItem = checkbox.parentNode;
  if (checkbox.checked) {
    taskItem.classList.add('checked');// Gets the checkbox element and its parent task item element
  } else {
    taskItem.classList.remove('checked');// If the checkbox is checked, adds the "checked" class to the task item, otherwise removes it
  }
  updateTotalTasks();
}
// Function to update the total task count displayed on the page
function updateTotalTasks() {
    // Counts the number of task items that do not have the "checked" class
  const count = taskList.querySelectorAll('li:not(.checked)').length;
  // Updates the total task count element with the new count
  totalTasks.innerHTML = `<span>${count}</span> tasks left`;
}
// Function to show all task items
function showAllTasks() {
    // Loops through all task items and sets their display style to "block"
  const taskItems = taskList.querySelectorAll('li');
  for (const item of taskItems) {
    item.style.display = 'block';
  }
}
// Function to show only completed task items
function showCompletedTasks() {
    // Shows all task items first
  showAllTasks();
  // Loops through all task items that do not have the "checked" class and hides them
  const taskItems = taskList.querySelectorAll('li:not(.checked)');
  for (const item of taskItems) {
    item.style.display = 'none';
  }
}
// function to display only uncompleted tasks
function showUncompletedTasks() {
  showAllTasks();
    //   Loops through all task items that have the "checked" class and hides them
  const taskItems = taskList.querySelectorAll('li.checked');
  for (const item of taskItems) {
    item.style.display = 'none';
  }
}
// Function to mark all task items as completed
function completeAllTasks() {
    // Loops through all task items that do not have the "checked" class and marks them as completed
    const taskItems = taskList.querySelectorAll('li:not(.checked)');
    for (const item of taskItems) {
    const checkbox = item.querySelector('input[type="checkbox"]');
    checkbox.checked = true;
    item.classList.add('checked');
    }
    // Updates the total task count
    updateTotalTasks();
    }
    // function to clear all completed tasks 
    function clearCompletedTasks() {
        // Loops through all task items that have the "checked" class and removes them from the task list
    const taskItems = taskList.querySelectorAll('li.checked');
    for (const item of taskItems) {
    taskList.removeChild(item);
    }
    updateTotalTasks();
    }
    // we are adding event listeners to the buttons
    addBtn.addEventListener('click', addTask);
    completedTasksLink.addEventListener('click', showCompletedTasks);
    uncompletedTasksLink.addEventListener('click', showUncompletedTasks);
    completeAllTasksLink.addEventListener('click', completeAllTasks);
    clearCompletedTasksLink.addEventListener('click', clearCompletedTasks);
    
    showAllTasks(); // show all tasks by default