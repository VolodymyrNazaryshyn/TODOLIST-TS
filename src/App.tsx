import { useState } from 'react';
import { v1 } from 'uuid';
import { TaskType, Todolist } from './Todolist';
import './App.css';
import { AddItemForm } from './AddItemForm';

export type FilterValuesType = "all" | "completed" | "active";

type TodolistsType = {
  id: string
  title: string
  filter: FilterValuesType
}

type TasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, setTodolists] = useState<Array<TodolistsType>>([
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" }
  ]);

  const [tasksObj, setTasksObj] = useState<TasksStateType>({
    [todolistId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: true },
      { id: v1(), title: "Rest API", isDone: false },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "Book", isDone: false },
      { id: v1(), title: "Milk", isDone: true },
    ]
  });

  function removeTask(id: string, todolistId: string) {
    const tasks = tasksObj[todolistId];
    const filteredTasks = tasks.filter(t => t.id !== id);
    tasksObj[todolistId] = filteredTasks;
    setTasksObj({ ...tasksObj });
  }

  function addTask(title: string, todolistId: string) {
    const task = { id: v1(), title: title, isDone: false };
    const tasks = tasksObj[todolistId];
    const newTasks = [task, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTasksObj({ ...tasksObj });
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    const tasks = tasksObj[todolistId];
    const task = tasks.find(t => t.id === taskId);

    if (task) {
      task.isDone = isDone;
      setTasksObj({ ...tasksObj });
    }
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    const todolist = todolists.find(tl => tl.id === todolistId);

    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists]);
    }
  }

  const removeTodolist = (todolistId: string) => {
    const filteredTodolist = todolists.filter(tl => tl.id !== todolistId);
    setTodolists(filteredTodolist);
    delete tasksObj[todolistId];
    setTasksObj({ ...tasksObj });
  }

  function Todolists(tlProps: TodolistsType) {
    let tasksForTodoList = tasksObj[tlProps.id];

    if (tlProps.filter === "completed") tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true);

    if (tlProps.filter === "active") tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false);

    return (
      <Todolist
        id={tlProps.id}
        title={tlProps.title}
        tasks={tasksForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeTaskStatus={changeStatus}
        filter={tlProps.filter}
        removeTodolist={removeTodolist}
      />
    )
  }

  function addTodolist(title: string) {
    const todolist: TodolistsType = { id: v1(), filter: "all", title: title };
    setTodolists([todolist, ...todolists]);
    setTasksObj({ ...tasksObj, [todolist.id]: [] });
  }

  return (
    <div className="app">
      <AddItemForm addItem={addTodolist} />
      {todolists.map(tl => <Todolists key={tl.id} id={tl.id} title={tl.title} filter={tl.filter} />)}
    </div>
  );
}

export default App;
