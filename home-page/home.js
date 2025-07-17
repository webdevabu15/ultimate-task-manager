document.getElementById("logoutBtn").addEventListener("click", logout);
document.getElementById("logoutBtnMobile").addEventListener("click", logout);

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


const userRaw = localStorage.getItem("user");
const user = userRaw ? JSON.parse(userRaw) : { name: "Foydalanuvchi" };
document.getElementById("userName").textContent = user.name;

let tasks;
try {
  const stored = localStorage.getItem("tasks");
  tasks = stored ? JSON.parse(stored) : [];
} catch (e) {
  console.error("tasks JSONda xato:", e);
  tasks = [];
}

function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const active = total - completed;
  const today = tasks.filter(t => !t.completed).slice(0, 2).length;

  document.getElementById("totalTasks").textContent = total;
  document.getElementById("completedTasks").textContent = completed;
  document.getElementById("activeTasks").textContent = active;
  document.getElementById("todayTasks").textContent = today;
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const card = document.createElement("div");
    card.className = `bg-white p-4 rounded-lg shadow flex justify-between items-center ${task.completed ? 'opacity-60' : ''}`;
    card.innerHTML = `
      <div>
        <h4 class="text-lg font-semibold sm: text-xs">${task.title}</h4>
        <p class="text-sm text-gray-500 sm: text-xs">${task.completed ? "✅ completed" : "⏳ inprocess"}</p>
      </div>
      <div class="flex space-x-2">
        <button onclick="toggleComplete(${task.id})" class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 sm: text-xs">
          ${task.completed ? "Bekor qilish" : "Bajarildi"}
        </button>
        <button onclick="deleteTask(${task.id})" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 sm: text-xs">
          O‘chirish
        </button>
      </div>
    `;
    taskList.appendChild(card);
  });

  updateStats();
}

function toggleComplete(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

function logout() {
  window.location.href = "../login.html";
}

renderTasks();

  const burgerBtn = document.getElementById("burgerBtn");
  const sidebar = document.getElementById("sidebar");

  burgerBtn.addEventListener("click", () => {
    burgerBtn.classList.toggle("ml-60")
    sidebar.classList.toggle("hidden");
  })

  ;

