const inputTask = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');
const liList = document.getElementsByClassName('task');
const taskNumber = document.querySelector("h2");
const searchInput = document.querySelector(".search")
const liArray = [];

const render = () => {
    ul.textContent = "";
    taskNumber.textContent = `Lista zadań do zrobienia: ${liArray.length}`
    liArray.forEach((element, key) => {
        element.dataset.key = key;
        ul.appendChild(element);
    })
}

const lineThrough = (e) => {
    const label = e.target.parentNode.parentNode.querySelector(".label");
    if (e.target.dataset.active === 'false') {
        // e.target.parentNode.style.textDecoration = 'line-through';
        label.classList.add('done');
        e.target.textContent = 'Done';
        e.target.dataset.active = 'true';
    } else {
        // e.target.parentNode.style.textDecoration = 'none';
        label.classList.remove('done');
        e.target.textContent = 'To Do';
        e.target.dataset.active = 'false';
    }
}
const deleteElement = ({
    target
}) => {
    // e.target.parentNode.remove();

    const index = target.parentNode.parentNode.dataset.key;
    liArray.splice(index, 1);
    console.log(liArray)
    // const taskNumbers = [...document.querySelectorAll('.label')];
    render();

}

const addTask = (e) => {
    e.preventDefault();
    if (input.value === "") return;
    const task = document.createElement('li');
    task.className = 'task';
    liArray.push(task);
    task.innerHTML = `<span class="label">${input.value}</span><div class="buttons"><button data-active="false" class="check">To Do</button><button class="del">X</button><div>`;
    input.value = ''; // clean input
    render();
    document.querySelectorAll('.check').forEach(item => item.addEventListener('click', lineThrough)); // single 'to do' button
    document.querySelectorAll('.del').forEach(item => item.addEventListener('click', deleteElement));
}

const searchTask = ({
    target
}) => {
    const mySearch = target.value.toLowerCase();
    const newArray = liArray.filter(li => li.textContent.toLowerCase().includes(mySearch));
    ul.textContent = "";
    newArray.forEach(li => ul.appendChild(li))


}

inputTask.addEventListener('submit', addTask);
searchInput.addEventListener('input', searchTask);