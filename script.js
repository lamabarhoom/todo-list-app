const elements = {
    input: document.querySelector('#todoInput'),
    addBtn: document.querySelector('#addBtn'),
    list: document.querySelector('#todoList'),
    emptyState: document.querySelector('#emptyState'),
    counter: document.querySelector('#taskCount'),
    clearBtn: document.querySelector('#clearCompleted'),
    filterGroup: document.querySelector('#filterGroup')
};

const getActiveFilter = () => document.querySelector('.filter-btn.active')?.dataset.filter || 'all';

const applyFilter = () => {
    const filter = getActiveFilter();
    const items = elements.list.querySelectorAll('.todo-item');

    items.forEach(item => {
        const isCompleted = item.classList.contains('completed');
        switch (filter) {
            case 'active':
                item.style.display = isCompleted ? 'none' : 'flex';
                break;
            case 'completed':
                item.style.display = isCompleted ? 'flex' : 'none';
                break;
            default:
                item.style.display = 'flex';
        }
    });
};

const updateUI = () => {
    applyFilter();

    const totalTasks = elements.list.children.length;
    const activeTasks = elements.list.querySelectorAll('.todo-item:not(.completed)').length;
    
    elements.counter.textContent = activeTasks;
    
    elements.emptyState.style.display = totalTasks === 0 ? 'block' : 'none';
};

const createTodoElement = (text) => {
    const li = document.createElement('li');
    li.className = 'todo-item';
    
    li.innerHTML = `
        <input type="checkbox" class="toggle-task">
        <span class="task-text">${text}</span>
        <button class="delete-btn" title="Delete task">&times;</button>
    `;
    return li;
};

const handleAddTask = () => {
    const text = elements.input.value.trim();
    if (!text) return;

    const newTodo = createTodoElement(text);
    elements.list.appendChild(newTodo);
    
    elements.input.value = '';
    elements.input.focus();
    updateUI();
};

elements.list.addEventListener('click', (e) => {
    const target = e.target;
    const todoItem = target.closest('.todo-item');

    if (target.classList.contains('delete-btn')) {
        todoItem.remove();
        updateUI();
    }

    if (target.classList.contains('toggle-task')) {
        todoItem.classList.toggle('completed');
        updateUI();
    }
});

elements.list.addEventListener('dblclick', (e) => {
    if (e.target.classList.contains('task-text')) {
        const span = e.target;
        const newText = prompt("Edit task:", span.textContent);
        if (newText !== null && newText.trim() !== "") {
            span.textContent = newText.trim();
        }
    }
});

elements.filterGroup.addEventListener('click', (e) => {
    if (!e.target.classList.contains('filter-btn')) return;

    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    const filter = e.target.dataset.filter;
    const items = elements.list.querySelectorAll('.todo-item');

    items.forEach(item => {
        const isCompleted = item.classList.contains('completed');
        switch(filter) {
            case 'all': item.style.display = 'flex'; break;
            case 'active': item.style.display = isCompleted ? 'none' : 'flex'; break;
            case 'completed': item.style.display = isCompleted ? 'flex' : 'none'; break;
        }
    });
});

elements.clearBtn.addEventListener('click', () => {
    const completed = elements.list.querySelectorAll('.todo-item.completed');
    completed.forEach(item => item.remove());
    updateUI();
});

elements.addBtn.addEventListener('click', handleAddTask);
elements.input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleAddTask();
});

elements.filterGroup.addEventListener('click', (e) => {
    if (!e.target.classList.contains('filter-btn')) return;

    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    updateUI();
});

elements.clearBtn.addEventListener('click', () => {
    const completed = elements.list.querySelectorAll('.todo-item.completed');
    completed.forEach(item => item.remove());
    updateUI();
});

updateUI();