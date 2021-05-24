const inputTask = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');
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

const lineThrough = ({
    target
}) => {
    const label = target.parentNode.parentNode.querySelector(".label");
    if (target.dataset.active === 'false') {
        label.classList.add('done');
        target.parentNode.parentNode.classList.add('darker');
        target.textContent = 'Done';
        target.dataset.active = 'true';
    } else {
        label.classList.remove('done');
        target.parentNode.parentNode.classList.remove('darker');
        target.textContent = 'To Do';
        target.dataset.active = 'false';
    }
}
const deleteElement = ({
    target
}) => {
    const index = target.parentNode.parentNode.dataset.key;
    liArray.splice(index, 1);
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