import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
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
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export function Todolist(todolistProps: TodolistType) {
    const onAllClickHandler = () => todolistProps.changeFilter("all", todolistProps.id);
    const onActiveClickHandler = () => todolistProps.changeFilter("active", todolistProps.id);
    const onCompletedClickHandler = () => todolistProps.changeFilter("completed", todolistProps.id);
    const removeTodolist = () => todolistProps.removeTodolist(todolistProps.id);
    const changeTodolistTitle = (newTitle: string) => todolistProps.changeTodolistTitle(todolistProps.id, newTitle);

    function Task(taskProps: TaskType) {
        const onRemoveHandler = () => todolistProps.removeTask(taskProps.id, todolistProps.id);
        const onChangeStatusHandler = (e: React.ChangeEvent<HTMLInputElement>) => todolistProps.changeTaskStatus(taskProps.id, e.currentTarget.checked, todolistProps.id);
        const onChangeTitleHandler = (newValue: string) => todolistProps.changeTaskTitle(taskProps.id, newValue, todolistProps.id);

        return (
            <li className={taskProps.isDone ? "is-done" : ''}>
                <input
                    type="checkbox"
                    checked={taskProps.isDone}
                    onChange={onChangeStatusHandler}
                />
                <EditableSpan
                    title={taskProps.title}
                    onChange={onChangeTitleHandler} />
                <button onClick={onRemoveHandler}>x</button>
            </li>
        );
    }

    const addTask = (title: string) => todolistProps.addTask(title, todolistProps.id);

    return (
        <div>
            <h3><EditableSpan title={todolistProps.title} onChange={changeTodolistTitle} /> <button onClick={removeTodolist}>x</button></h3>
            <AddItemForm addItem={addTask} />
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
