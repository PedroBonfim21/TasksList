const tasksUl = document.querySelector('.tasks');
const inputTasks = document.querySelector('.inputTasks');
const btnTask = document.querySelector('.add-button');

addSavedTasks()

function addSavedTasks() {
    const Savedtasks = localStorage.getItem('Tasks')
    const listOfTasks = JSON.parse(Savedtasks)
  
    for (let Savedtasks of listOfTasks) {
      createTasks(Savedtasks);
    }
}

function createLi() {
    const li= document.createElement('li');
    return li;
}

function createTasks(inputxt) {
    const li = createLi();
    li.innerHTML = inputxt;
    tasksUl.appendChild(li);
    clearInput();
    createDelBtn(li);
    saveTasks();
}

function clearInput() {
    inputTasks.value = ''
    inputTasks.focus()
}

function createDelBtn(li){
    const delBtn = document.createElement('button');
    delBtn.innerText= 'Delete'
    delBtn.setAttribute('class','delete')
    li.appendChild(delBtn)
}

function saveTasks() {
    const allTasks= tasksUl.querySelectorAll('li')
    const taskslist=[]

    for (let tasks of allTasks) {
        let taskText = tasks.innerText;
        taskText = taskText.replace('Delete','').trim()
        taskslist.push(taskText)
    }
    const tasksJSON= JSON.stringify(taskslist)
    localStorage.setItem('Tasks',tasksJSON)

}

btnTask.addEventListener('click', function () {
    if (!inputTasks.value) return;
    createTasks(inputTasks.value);
})

inputTasks.addEventListener('keypress', function(e) {
    if (e.key === 'Enter'){
        if (!inputTasks.value) return;
        createTasks(inputTasks.value);
      }   
})

document.addEventListener('click', function(e){
    const el = e.target
    if (el.classList.contains('delete')) {
        el.parentElement.remove()
        saveTasks()
    }
})