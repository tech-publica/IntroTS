/*
 * LESSON 11 SOLUTIONS
 */

export {};

interface SolutionTask {
  readonly id: string;
  title: string;
  completed: boolean;
}

function solutionRequireElement<TElement extends Element>(
  selector: string,
  constructor: { new (): TElement },
): TElement {
  const element = document.querySelector(selector);

  if (!(element instanceof constructor)) {
    throw new Error(`Missing or invalid element: ${selector}`);
  }

  return element;
}

const solutionForm = solutionRequireElement(
  "#task-form",
  HTMLFormElement,
);
const solutionTitleInput = solutionRequireElement(
  "#task-title",
  HTMLInputElement,
);
const solutionList = solutionRequireElement(
  "#task-list",
  HTMLUListElement,
);
const solutionCount = solutionRequireElement(
  "#task-count",
  HTMLOutputElement,
);
const solutionEmptyMessage = solutionRequireElement(
  "#no-tasks",
  HTMLParagraphElement,
);

const solutionTasks: SolutionTask[] = [
  {
    id: crypto.randomUUID(),
    title: "Read the DOM lesson",
    completed: true,
  },
  {
    id: crypto.randomUUID(),
    title: "Complete the task-list exercise",
    completed: false,
  },
];

function solutionCreateTaskItem(
  task: SolutionTask,
): HTMLLIElement {
  const item = document.createElement("li");
  item.classList.add("task-item");
  item.classList.toggle("completed", task.completed);
  item.dataset.taskId = task.id;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.dataset.action = "toggle";
  checkbox.setAttribute(
    "aria-label",
    `Mark ${task.title} as complete`,
  );

  const title = document.createElement("span");
  title.textContent = task.title;

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.textContent = "Delete";
  deleteButton.dataset.action = "delete";
  deleteButton.setAttribute("aria-label", `Delete ${task.title}`);

  item.append(checkbox, title, deleteButton);
  return item;
}

function solutionRenderTasks(): void {
  const fragment = document.createDocumentFragment();

  solutionTasks.forEach((task) => {
    fragment.append(solutionCreateTaskItem(task));
  });

  solutionList.replaceChildren(fragment);
  solutionCount.value = String(solutionTasks.length);
  solutionEmptyMessage.hidden = solutionTasks.length > 0;
}

solutionForm.addEventListener(
  "submit",
  (event: SubmitEvent): void => {
    event.preventDefault();

    const title = solutionTitleInput.value.trim();

    if (title === "") {
      solutionTitleInput.focus();
      return;
    }

    solutionTasks.push({
      id: crypto.randomUUID(),
      title,
      completed: false,
    });

    solutionForm.reset();
    solutionTitleInput.focus();
    solutionRenderTasks();
  },
);

solutionList.addEventListener(
  "click",
  (event: MouseEvent): void => {
    if (!(event.target instanceof Element)) {
      return;
    }

    const deleteButton = event.target.closest<HTMLButtonElement>(
      'button[data-action="delete"]',
    );
    const item = deleteButton?.closest<HTMLLIElement>(
      "[data-task-id]",
    );
    const taskId = item?.dataset.taskId;

    if (taskId === undefined) {
      return;
    }

    const index = solutionTasks.findIndex(
      (task) => task.id === taskId,
    );

    if (index !== -1) {
      solutionTasks.splice(index, 1);
      solutionRenderTasks();
    }
  },
);

solutionList.addEventListener(
  "change",
  (event: Event): void => {
    if (
      !(event.target instanceof HTMLInputElement) ||
      event.target.dataset.action !== "toggle"
    ) {
      return;
    }

    const item = event.target.closest<HTMLLIElement>(
      "[data-task-id]",
    );
    const taskId = item?.dataset.taskId;
    const task = solutionTasks.find(
      (candidate) => candidate.id === taskId,
    );

    if (task !== undefined) {
      task.completed = event.target.checked;
      solutionRenderTasks();
    }
  },
);

solutionRenderTasks();
