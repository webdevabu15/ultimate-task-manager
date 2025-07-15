// 📊 Weekly progress by category (for Pie Chart)
function getWeeklyProgressByCategory() {
  const taskList = JSON.parse(localStorage.getItem('tasks')) || [];

  const categoryMap = {};

  taskList.forEach(task => {
    if (!task.completed || !task.category) return;

    const category = task.category || "Unknown";
    categoryMap[category] = (categoryMap[category] || 0) + 1;
  });

  return categoryMap;
}

function drawWeeklyCategoryChart() {
  const canvas = document.getElementById("weeklyCategoryChart");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const data = getWeeklyProgressByCategory();

  if (window.weeklyChart) window.weeklyChart.destroy();

  const colors = [
    "#1e40af", "#047857", "#b91c1c", "#a16207", "#4c1d95",
    "#0f766e", "#f97316", "#e11d48", "#10b981"
  ];

  window.weeklyChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: Object.keys(data),
      datasets: [{
        label: "Completed Tasks",
        data: Object.values(data),
        backgroundColor: colors.slice(0, Object.keys(data).length)
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'bottom'
        }
      }
    }
  });
}

function getStreakDays() {
  const taskList = JSON.parse(localStorage.getItem('tasks')) || [];

  const completedDates = taskList
    .filter(t => t.completed && t.createdDate)
    .map(t => t.createdDate);

  const uniqueDates = [...new Set(completedDates)].sort().reverse();

  let streak = 0;
  let current = new Date();
  current.setHours(0, 0, 0, 0); 

  for (let i = 0; i < uniqueDates.length; i++) {
    const dateStr = uniqueDates[i];
    const date = new Date(dateStr);
    date.setHours(0, 0, 0, 0);

    const diff = (current - date) / (1000 * 60 * 60 * 24); 

    if (diff === 0 || diff === 1) {
      streak++;
      current.setDate(current.getDate() - 1); 
    } else if (diff > 1) {
      break; 
    }
  }

  return streak;
}


function getWeeklyGrowthDiff() {
  const taskList = JSON.parse(localStorage.getItem('tasks')) || [];

  const today = new Date();
  const thisWeekStart = new Date(today);
  thisWeekStart.setDate(today.getDate() - 6);
  const lastWeekStart = new Date(today);
  lastWeekStart.setDate(today.getDate() - 13);

  let thisWeek = 0, lastWeek = 0;

  taskList.forEach(task => {
    if (!task.completed) return;

    const date = new Date(`${task.createdDate}T${task.createdTime}`);
    if (date >= thisWeekStart && date <= today) thisWeek++;
    else if (date >= lastWeekStart && date < thisWeekStart) lastWeek++;
  });

  return thisWeek - lastWeek;
}

function getProductivityScore() {
  const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
  const total = taskList.length;
  const completed = taskList.filter(t => t.completed).length;
  return total ? Math.round((completed / total) * 100) : 0;
}

function getTopCategoryThisWeek() {
  const taskList = JSON.parse(localStorage.getItem('tasks')) || [];

  const map = {};

  taskList.forEach(task => {
    if (!task.completed || !task.category) return;

    const cat = task.category || "Unknown";
    map[cat] = (map[cat] || 0) + 1;
  });

  const sorted = Object.entries(map).sort((a, b) => b[1] - a[1]);
  return sorted.length ? `${sorted[0][0]} (${sorted[0][1]} tasks)` : "No data";
}


document.addEventListener("DOMContentLoaded", () => {
  drawWeeklyCategoryChart();
  document.getElementById("streakDays").textContent = getStreakDays();
  document.getElementById("growthBadge").textContent = getWeeklyGrowthDiff();
  document.getElementById("productivityScore").textContent = getProductivityScore() + "%";
  document.getElementById("topCategory").textContent = getTopCategoryThisWeek();
});

  const burgerBtn = document.getElementById("burgerBtn");
  const sidebar = document.getElementById("sidebar");

  burgerBtn.addEventListener("click", () => {
    burgerBtn.classList.toggle("toggleBtn")
    sidebar.classList.toggle("hidden");
  })
