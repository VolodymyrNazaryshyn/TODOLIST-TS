import { useState } from "react";
import { FilterValuesType } from "./App";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: string) => void,
    changeFilter: (value: FilterValuesType) => void,
    addTask: (title: string) => void,
}

export function Todolist(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("");

    const onNewTitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value);
    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTask();
    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");

    function addTask() { props.addTask(newTaskTitle); setNewTaskTitle('') }

    function Task(taskProps: TaskType) {
        const onRemoveHandler = () => props.removeTask(taskProps.id);

        return (
            <li>
                <input type="checkbox" defaultChecked={taskProps.isDone} />
                <span>{taskProps.title}</span>
                <button onClick={onRemoveHandler}>x</button>
            </li>
        );
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onNewTitleChangeHandler}
                    onKeyDown={onKeyDownHandler}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>{props.tasks.map(t => <Task key={t.id} id={t.id} title={t.title} isDone={t.isDone} />)}</ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
}
