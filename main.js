const inputTask = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');
const taskNumber = document.querySelector("h2");
const searchInput = document.querySelector(".search")
const btnAdd = document.querySelector('.add')
const liArray = [];

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
    // if (input.value === "") {
    //     btnAdd.disabled = true;
    // } else {
    //     btnAdd.disabled = false;
    // }
    /* rozwiązanie wyżej dłuższe, to samo osiągam zapisem poniżej */
    btnAdd.disabled = input.value === "";
}
const checkDuplicats = () => {
    const mapArray = liArray.map(li => li.textContent.toLowerCase().slice(0, -5))
    const findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item.toLowerCase()) !== index)
    const duplicates = findDuplicates(mapArray);
    if (duplicates.length > 0) {
        alert("You Have Entered This Task Before");
        liArray.pop();
        render();
    }
}

const addTask = (e) => {
    e.preventDefault();
    const task = document.createElement('li');
    task.className = 'task';
    liArray.push(task);
    task.innerHTML = `<span class="label">${input.value}</span><div class="buttons"><button data-active="false" class="checkBtn">Done</button><button class="delBtn">&#10005</button><div>`;
    stateHandle();
    render();
    checkDuplicats();
    document.querySelectorAll('.checkBtn').forEach(item => item.addEventListener('click', lineThrough));
    document.querySelectorAll('.delBtn').forEach(item => item.addEventListener('click', deleteElement));
    input.value = ''; // clean input
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