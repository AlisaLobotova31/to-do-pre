let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
	const existedTasks = localStorage.getItem("tasks");
	if (existedTasks) {
		return JSON.parse(existedTasks);
	}
	return items;
}

function getTasksFromDOM() {
	const itemsNamesElements = document.querySelectorAll(".to-do__item-text");
	const tasks = [];

	itemsNamesElements.forEach((elem) => {
		tasks.push(elem.textContent);
	});

	return tasks;
}

function saveTasks(tasks) {
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
	const upButton = clone.querySelector(".to-do__item-button_type_up");
  const downButton = clone.querySelector(".to-do__item-button_type_down");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");

	textElement.textContent = item;

	upButton.addEventListener("click", () => {
		const prevElement = clone.previousElementSibling;
		if (prevElement) {
			prevElement.before(clone);
			items = getTasksFromDOM();
			saveTasks(items);
		}
	});

	downButton.addEventListener("click", () => {
		const nextElement = clone.nextElementSibling;
		if (nextElement) {
			nextElement.after(clone);
			items = getTasksFromDOM();
			saveTasks(items);
		}
	});

	deleteButton.addEventListener("click", () => {
		clone.remove();
		items = getTasksFromDOM();
		saveTasks(items);
	});

	duplicateButton.addEventListener("click", () => {
		const itemName = textElement.textContent;
		const newItem = createItem(itemName);
		listElement.prepend(newItem);
		items = getTasksFromDOM();
		saveTasks(items);
	});

	editButton.addEventListener("click", () => {
		textElement.setAttribute("contenteditable", "true");
		textElement.focus();
	});

	textElement.addEventListener("blur", () => {
		textElement.setAttribute("contenteditable", "false");
		items = getTasksFromDOM();
		saveTasks(items);
	});

	return clone;
}

formElement.addEventListener("submit", (event) => {
	event.preventDefault();

	const newTaskText = inputElement.value;
	const newTask = createItem(newTaskText);

	listElement.prepend(newTask);
	inputElement.value = "";

	items = getTasksFromDOM();
	saveTasks(items);
});

items = loadTasks();

items.forEach((item) => {
	const itemElement = createItem(item);
	listElement.append(itemElement);
});