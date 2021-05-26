const inputTask = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');
const taskNumber = document.querySelector("h2");
const searchInput = document.querySelector(".search")
const btnAdd = document.querySelector('.add')
const liArray = [];
const spanArray = [];

const render = () => {
    ul.textContent = "";
    taskNumber.textContent = `Tasks To Do: ${liArray.length}`
    liArray.forEach((element, key) => {
        element.dataset.key = key;
        ul.appendChild(element);
    })
}

const lineThrough = ({
    target
}) => {
    const label = target.closest('li').querySelector(".label");
    if (target.dataset.active === 'false') {
        label.classList.add('done');
        target.closest('li').classList.add('darker');
        target.textContent = 'To Do';
        target.dataset.active = 'true';
    } else {
        label.classList.remove('done');
        target.closest('li').classList.remove('darker');
        target.textContent = 'Done';
        target.dataset.active = 'false';
    }
}
const deleteElement = ({
    target
}) => {
    const index = target.closest('li').dataset.key;
    liArray.splice(index, 1);
    render();
}

const stateHandle = () => {
    if (input.value === "") {
        btnAdd.disabled = true;
        btnAdd.classList.add('opa');
    } else {
        btnAdd.disabled = false;
        btnAdd.classList.remove('opa');
    }
}

const addTask = (e) => {
    e.preventDefault();
    const task = document.createElement('li');
    task.className = 'task';
    liArray.push(task);
    task.innerHTML = `<span class="label">${input.value}</span><div class="buttons"><button data-active="false" class="checkBtn">Done</button><button class="delBtn">&#10005</button><div>`;
    input.value = ''; // clean input
    // btnAdd.disabled = true;
    // btnAdd.classList.add('opa');
    stateHandle();
    render();
    document.querySelectorAll('.checkBtn').forEach(item => item.addEventListener('click', lineThrough)); // single 'to do' button
    document.querySelectorAll('.delBtn').forEach(item => item.addEventListener('click', deleteElement));

}
const searchTask = (e) => {
    const mySearch = e.target.value.toLowerCase();
    const newArray = liArray.filter(li => li.textContent.replace('Done', '').replace('To Do', '').toLowerCase().includes(mySearch));
    ul.textContent = "";
    newArray.forEach(li => ul.appendChild(li));
}
input.addEventListener('change', stateHandle);
inputTask.addEventListener('submit', addTask);
searchInput.addEventListener('input', searchTask);