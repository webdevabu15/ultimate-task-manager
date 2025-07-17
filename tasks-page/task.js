import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDR6nkTWxBFGUWDEKBJZuy21tN47I0Jb0g",
  authDomain: "ultimate-task-manager-a891a.firebaseapp.com",
  databaseURL: "https://ultimate-task-manager-a891a-default-rtdb.firebaseio.com",
  projectId: "ultimate-task-manager-a891a",
  storageBucket: "ultimate-task-manager-a891a.firebasestorage.app",
  messagingSenderId: "180037885484",
  appId: "1:180037885484:web:360cc20cbd0b25a7ad3b89",
  measurementId: "G-789ZVPTDC1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

class Task {
  constructor(title, date, time, category, completed = false, id = null) {
    this.id = id ?? Math.floor(Math.random() * 100000);
    this.title = title;
    this.createdDate = date;
    this.createdTime = time;
    this.category = category
    this.completed = completed;
  }

  taskComplete() {
    this.completed = !this.completed;


  }

  edit(newTitle) {
    this.title = newTitle.trim();
  }
}

let taskList;
try {
  const stored = localStorage.getItem('tasks');
  taskList = stored
    ? JSON.parse(stored).map(t => new Task(t.title,t.createdDate, t.createdTime, t.category, t.completed, t.id))
    : [];
} catch (e) {
  console.error("JSONda xato:", e);
  taskList = [];
}

const taskListWrpDom = document.querySelector('#taskList');

function openModal() {
  document.querySelector('#taskModal').classList.remove('hidden');
  document.getElementById("newTaskTitle").focus();
}

function closeModal() {
  document.getElementById("newTaskTitle").value = '';
  document.querySelector('#taskModal').classList.add('hidden');
}

function addTask() {
  const input = document.getElementById("newTaskTitle").value.trim();
  const date = document.getElementById("newTaskDate").value.trim();
  const time = document.getElementById("newTaskTime").value.trim()
  const category =  document.getElementById('newTaskCategory').value.trim()

  if (!input) return;

  const task = new Task(input,date,time,category);
  taskList.push(task);

  saveTasks();
  closeModal();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(taskList));
  updateDailyProgress();
}

function renderTasks() {
  taskListWrpDom.innerHTML = "";
  taskList.forEach(task => {
    const div = document.createElement("div");
    div.className = `task-item flex justify-between items-center bg-white p-4 rounded shadow my-4 sm:max-flex-col md:flex-row`;
    div.setAttribute('data-id', task.id);

    div.innerHTML = `
      <div>
        <h3 class="text-lg sm: text-base font-semibold ${task.completed ? 'line-through decoration-double decoration-indigo-900' : ''}">
          ${task.title}
        </h3>
        <p class="text-sm text-gray-500">${task.createdDate} ${task.createdTime}</p>
      </div>
      <div class="flex gap-5">
        <button id='complete-btn' class="${task.completed ? 'bg-indigo-500' : 'bg-green-500'} sm: text-xs text-white px-4 py-2 rounded">
          ${task.completed ? 'undo' : 'complete'}
        </button>
        <button id='delete-btn' class="bg-red-500 text-white px-4 py-2 rounded sm: text-xs">delete</button>
        <button id='edit-btn' class="bg-yellow-500 text-white px-4 py-2 rounded sm: text-xs">edit</button>
      </div>
    `;
    taskListWrpDom.appendChild(div);
  });
}


taskListWrpDom.addEventListener('click', (e) => {
  const taskId = +e.target.closest('.task-item')?.getAttribute('data-id');
  const task = taskList.find(t => t.id === taskId);

  if (e.target.closest('#complete-btn') && task) {
    task.taskComplete();
    saveTasks();
    renderTasks();

  } else if (e.target.closest('#delete-btn')) {
    taskList = taskList.filter(t => t.id !== taskId);
    saveTasks();
    renderTasks();

  } else if (e.target.closest('#edit-btn') && task) {
    const newTitle = prompt("Yangi nom:", task.title);
    if (newTitle && newTitle.trim()) {
      task.edit(newTitle);
      saveTasks();
      renderTasks();
    }
  }
});

renderTasks();

function updateDailyProgress() {
  const today = new Date().toISOString().split('T')[0];
  const total = taskList.length;
  const completed = taskList.filter(t => t.completed).length;

  const progress = JSON.parse(localStorage.getItem('progress')) || {};
  progress[today] = { total, completed };

  localStorage.setItem('progress', JSON.stringify(taskList.filter(t => t.completed !== false)));
    

}

  const burgerBtn = document.getElementById("burgerBtn");
  const sidebar = document.getElementById("sidebar");

  burgerBtn.addEventListener("click", () => {
    sidebar.classList.toggle("hidden");
    burgerBtn.classList.toggle('toggleBtn')
  })
