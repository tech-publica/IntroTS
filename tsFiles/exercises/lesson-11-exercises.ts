/*
 * LESSON 11 EXERCISES
 *
 * Build an interactive task list using the supplied HTML page.
 */

export {};

interface ExerciseTask {
  readonly id: string;
  title: string;
  completed: boolean;
}

const exerciseTasks: ExerciseTask[] = [];

// 1. Select and safely narrow:
//    #task-form, #task-title, #task-list, #task-count, and #no-tasks.
const exerciseForm =
  document.querySelector<HTMLFormElement>("#task-form");
const exerciseTitleInput =
  document.querySelector<HTMLInputElement>("#task-title");
const exerciseList =
  document.querySelector<HTMLUListElement>("#task-list");
const exerciseCount =
  document.querySelector<HTMLOutputElement>("#task-count");
const exerciseEmptyMessage =
  document.querySelector<HTMLParagraphElement>("#no-tasks");

if (
  exerciseForm === null ||
  exerciseTitleInput === null ||
  exerciseList === null ||
  exerciseCount === null ||
  exerciseEmptyMessage === null
) {
  throw new Error("The task-list HTML is incomplete.");
}

// Stable non-null aliases can safely be captured by the functions below.
const exerciseTaskList = exerciseList;
const exerciseTaskCount = exerciseCount;
const exerciseNoTasks = exerciseEmptyMessage;

// 2. Create and return an <li> for one task.
//    Include a checkbox, visible title, and delete button.
//    Store the task ID in the li's dataset.
function exerciseCreateTaskItem(
  task: ExerciseTask,
): HTMLLIElement {
  const item = document.createElement("li");
  item.textContent = task.title;
  return item;
}

// 3. Render every task with a DocumentFragment and replaceChildren.
//    Update task-count and the hidden state of no-tasks.
function exerciseRenderTasks(): void {
  exerciseTaskList.replaceChildren();
  exerciseTaskCount.value = String(exerciseTasks.length);
  exerciseNoTasks.hidden = exerciseTasks.length > 0;
}

// 4. Handle submit. Prevent navigation, validate the trimmed title,
//    create a task with crypto.randomUUID(), reset, focus, and render.
exerciseForm.addEventListener(
  "submit",
  (event: SubmitEvent): void => {
    event.preventDefault();
    console.log("Implement task creation.", exerciseTitleInput.value);
  },
);

// 5. Use one delegated click listener on task-list to delete tasks.
exerciseList.addEventListener(
  "click",
  (_event: MouseEvent): void => {
    // Find a button with data-action="delete", read its task ID,
    // remove the matching task from the array, and render.
  },
);

// 6. Use one delegated change listener to update checkbox completion.
exerciseList.addEventListener(
  "change",
  (_event: Event): void => {
    // Narrow event.target to HTMLInputElement, verify its action,
    // find the task by ID, update completed, and render.
  },
);

exerciseRenderTasks();

// Keep the function in use while the starter implementation is incomplete.
void exerciseCreateTaskItem;
