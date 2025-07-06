const planner = document.getElementById('planner');
const clearBtn = document.getElementById('clear-tasks');
const workingHours = [
  { hour: 9, label: '9 AM' },
  { hour: 10, label: '10 AM' },
  { hour: 11, label: '11 AM' },
  { hour: 12, label: '12 PM' },
  { hour: 13, label: '1 PM' },
  { hour: 14, label: '2 PM' },
  { hour: 15, label: '3 PM' },
  { hour: 16, label: '4 PM' },
  { hour: 17, label: '5 PM' },
];

function getTimeBlockClass(blockHour) {
  const now = new Date();
  const currentHour = now.getHours();

  if (blockHour < currentHour) return 'past';
  if (blockHour === currentHour) return 'present';
  return 'future';
}

// Load saved tasks from localStorage or empty object
function loadTasks() {
  const saved = localStorage.getItem('dailyPlannerTasks');
  return saved ? JSON.parse(saved) : {};
}

// Save tasks to localStorage
function saveTasks(tasks) {
  localStorage.setItem('dailyPlannerTasks', JSON.stringify(tasks));
}

function createTimeBlock(hourObj, savedTasks) {
  const blockClass = getTimeBlockClass(hourObj.hour);

  const timeBlock = document.createElement('div');
  timeBlock.className = `time-block ${blockClass}`;

  const hourLabel = document.createElement('div');
  hourLabel.className = 'hour';
  hourLabel.textContent = hourObj.label;

  const taskDiv = document.createElement('div');
  taskDiv.className = 'task';

  const textarea = document.createElement('textarea');
  textarea.value = savedTasks[hourObj.hour] || '';
  textarea.placeholder = 'Enter task...';

  taskDiv.appendChild(textarea);

  const saveBtn = document.createElement('button');
  saveBtn.className = 'save-btn';
  saveBtn.textContent = '💾';

  saveBtn.addEventListener('click', () => {
    const tasks = loadTasks();
    tasks[hourObj.hour] = textarea.value;
    saveTasks(tasks);
    saveBtn.textContent = '✅';
    setTimeout(() => (saveBtn.textContent = '💾'), 1000);
  });

  timeBlock.appendChild(hourLabel);
  timeBlock.appendChild(taskDiv);
  timeBlock.appendChild(saveBtn);

  return timeBlock;
}

function renderPlanner() {
  const savedTasks = loadTasks();
  planner.innerHTML = '';

  workingHours.forEach(hourObj => {
    const timeBlock = createTimeBlock(hourObj, savedTasks);
    planner.appendChild(timeBlock);
  });
}

clearBtn.addEventListener('click', () => {
  localStorage.removeItem('dailyPlannerTasks');
  renderPlanner();
});

function createTimeBlock(hourObj, savedTasks) {
  const blockClass = getTimeBlockClass(hourObj.hour);

  const timeBlock = document.createElement('div');
  timeBlock.className = `time-block ${blockClass}`;

  const hourLabel = document.createElement('div');
  hourLabel.className = 'hour';
  hourLabel.textContent = hourObj.label;

  const taskDiv = document.createElement('div');
  taskDiv.className = 'task';

  const textarea = document.createElement('textarea');
  textarea.value = savedTasks[hourObj.hour] || '';
  textarea.placeholder = 'Enter task...';

  taskDiv.appendChild(textarea);

  const saveBtn = document.createElement('button');
  saveBtn.className = 'save-btn';
  saveBtn.textContent = '💾';

  // Separate tick element (hidden initially)
  const tick = document.createElement('span');
  tick.textContent = '✔️';
  tick.style.color = 'green';
  tick.style.fontSize = '20px';
  tick.style.marginLeft = '8px';
  tick.style.visibility = savedTasks[hourObj.hour] ? 'visible' : 'hidden';

  // Save button click event
  saveBtn.addEventListener('click', () => {
    const tasks = loadTasks();
    tasks[hourObj.hour] = textarea.value;
    saveTasks(tasks);
    tick.style.visibility = 'visible';  // Show tick on save
  });

  // Hide tick if user changes content after save
  textarea.addEventListener('input', () => {
    tick.style.visibility = 'hidden';
  });

  timeBlock.appendChild(hourLabel);
  timeBlock.appendChild(taskDiv);
  timeBlock.appendChild(saveBtn);
  timeBlock.appendChild(tick);

  return timeBlock;
}

renderPlanner();
