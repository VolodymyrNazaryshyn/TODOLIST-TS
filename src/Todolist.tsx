import { useState } from "react";
import { FilterValuesType } from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
}

export function Todolist(todolistProps: TodolistType) {
    const [title, setTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const onNewTitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        e.key === "Enter" && addTask();
    }

    const onAllClickHandler = () => todolistProps.changeFilter("all", todolistProps.id);
    const onActiveClickHandler = () => todolistProps.changeFilter("active", todolistProps.id);
    const onCompletedClickHandler = () => todolistProps.changeFilter("completed", todolistProps.id);
    const removeTodolist = () => todolistProps.removeTodolist(todolistProps.id);

    function addTask() {
        if (title.trim() !== '') {
            todolistProps.addTask(title.trim(), todolistProps.id);
            setTitle('');
        } else {
            setError("Title is required");
        }
    }

    function Task(taskProps: TaskType) {
        const onRemoveHandler = () => todolistProps.removeTask(taskProps.id, todolistProps.id);
        const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
            todolistProps.changeTaskStatus(taskProps.id, e.currentTarget.checked, todolistProps.id);
        };

        return (
            <li className={taskProps.isDone ? "is-done" : ''}>
                <input
                    type="checkbox"
                    checked={taskProps.isDone}
                    onChange={onChangeHandler}
                />
                <span>{taskProps.title}</span>
                <button onClick={onRemoveHandler}>x</button>
            </li>
        );
    }

    return (
        <div>
            <h3>{todolistProps.title} <button onClick={removeTodolist}>x</button></h3>
            <div>
                <input
                    className={error ? "error" : ""}
                    value={title}
                    onChange={onNewTitleChangeHandler}
                    onKeyDown={onKeyDownHandler}
                />
                <button onClick={addTask}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>{todolistProps.tasks.map(t => <Task key={t.id} id={t.id} title={t.title} isDone={t.isDone} />)}</ul>
            <div>
                <button
                    className={todolistProps.filter === "all" ? "active-filter" : ''}
                    onClick={onAllClickHandler}>All</button>
                <button
                    className={todolistProps.filter === "active" ? "active-filter" : ''}
                    onClick={onActiveClickHandler}>Active</button>
                <button
                    className={todolistProps.filter === "completed" ? "active-filter" : ''}
                    onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
}
