document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('task-form');
  const taskTitle = document.getElementById('task-title');
  const taskList = document.getElementById('task-list');

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3000/tasks'); 
      const data = await response.json();
      taskList.innerHTML = '';
      data.tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span>${task.title}</span>
          <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(li);
      });
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = taskTitle.value;
    try {
      await fetch('http://localhost:3000/tasks', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, completed: false })
      });
      taskTitle.value = '';
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  });

  fetchTasks();
});

const deleteTask = async (id) => {
  try {
    await fetch(`http://localhost:3000/tasks/${id}`, { 
      method: 'DELETE'
    });
    fetchTasks();
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};
