import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { FilterValuesType } from "./App";
import { Button, Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

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
        const onClickHandler = () => todolistProps.removeTask(taskProps.id, todolistProps.id);
        const onChangeStatusHandler = (e: React.ChangeEvent<HTMLInputElement>) => todolistProps.changeTaskStatus(taskProps.id, e.currentTarget.checked, todolistProps.id);
        const onChangeTitleHandler = (newValue: string) => todolistProps.changeTaskTitle(taskProps.id, newValue, todolistProps.id);

        return (
            <div className={taskProps.isDone ? "is-done" : ''}>
                <Checkbox
                    checked={taskProps.isDone}
                    onChange={onChangeStatusHandler}
                />
                <EditableSpan title={taskProps.title} onChange={onChangeTitleHandler} />
                <IconButton onClick={onClickHandler}><Delete /></IconButton>
            </div>
        );
    }

    const addTask = (title: string) => todolistProps.addTask(title, todolistProps.id);

    return <>
        <h3>
            <EditableSpan title={todolistProps.title} onChange={changeTodolistTitle} />
            <IconButton onClick={removeTodolist}><Delete /></IconButton>
        </h3>
        <AddItemForm addItem={addTask} />
        <>{todolistProps.tasks.map(t => <Task key={t.id} id={t.id} title={t.title} isDone={t.isDone} />)}</>
        <div>
            <Button
                variant={todolistProps.filter === "all" ? "contained" : "text"}
                onClick={onAllClickHandler}>All</Button>
            <Button
                variant={todolistProps.filter === "active" ? "contained" : "text"}
                onClick={onActiveClickHandler}>Active</Button>
            <Button
                variant={todolistProps.filter === "completed" ? "contained" : "text"}
                onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </>
}
