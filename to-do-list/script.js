const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskText = input.value.trim();
  if (taskText !== '') {
    tasks.push({ text: taskText, completed: false });
    saveTasks();
    renderTasks();
    input.value = '';
  }
});

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function filterTasks(filter) {
  currentFilter = filter;
  renderTasks();
}

function renderTasks() {
  list.innerHTML = '';
  tasks.forEach((task, index) => {
    if (
      (currentFilter === 'completed' && !task.completed) ||
      (currentFilter === 'active' && task.completed)
    ) {
      return;
    }

    const li = document.createElement('li');
    li.textContent = task.text;
    if (task.completed) li.classList.add('completed');

    // Evento para completar tarea
    li.addEventListener('click', () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    // Botón editar
    const editBtn = document.createElement('button');
    editBtn.textContent = '✎';
    editBtn.style.marginLeft = '10px';
    editBtn.style.background = 'transparent';
    editBtn.style.border = 'none';
    editBtn.style.color = 'blue';
    editBtn.style.cursor = 'pointer';

    editBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const newText = prompt('Edita tu tarea:', task.text);
      if (newText !== null && newText.trim() !== '') {
        tasks[index].text = newText.trim();
        saveTasks();
        renderTasks();
      }
    });

    // Botón eliminar
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✖';
    deleteBtn.style.marginLeft = '10px';
    deleteBtn.style.background = 'transparent';
    deleteBtn.style.border = 'none';
    deleteBtn.style.color = 'red';
    deleteBtn.style.cursor = 'pointer';

    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

// Al cargar la página
renderTasks();