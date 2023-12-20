import { useState } from 'react';
import { v1 } from 'uuid';
import { TaskType, Todolist } from './Todolist';
import { AddItemForm } from './AddItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';

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

  const [tasks, setTasks] = useState<TasksStateType>({
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
    // get the required array by todolistId
    const todolistTasks = tasks[todolistId];
    // overwrite the array in this object for the desired todolist filtered array
    tasks[todolistId] = todolistTasks.filter(t => t.id !== id);
    // set the state copy of the object to react by redraw
    setTasks({ ...tasks });
  }

  function addTask(title: string, todolistId: string) {
    const task = { id: v1(), title: title, isDone: false };
    const todolistTasks = tasks[todolistId];
    tasks[todolistId] = [task, ...todolistTasks];
    setTasks({ ...tasks });
  }

  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    // get the required array by todolistId
    const todolistTasks = tasks[todolistId];
    // find the necessary task
    const task = todolistTasks.find(t => t.id === id);
    // change the task if it is found
    if (task) {
      task.isDone = isDone;
      // set in the state copy of the object to react by redraw
      setTasks({ ...tasks });
    }
  }

  function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    // get the required array by todolistId
    const todolistTasks = tasks[todolistId];
    // find the necessary task
    const task = todolistTasks.find(t => t.id === id);
    // change the task if it is found
    if (task) {
      task.title = newTitle;
      // set in the state copy of the object to react by redraw
      setTasks({ ...tasks });
    }
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    const todolist = todolists.find(tl => tl.id === todolistId);

    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists]);
    }
  }

  function removeTodolist(id: string) {
    // put in the state todolists list, the id of which are not equal to the one to throw
    setTodolists(todolists.filter(tl => tl.id !== id));
    // remove the tasks for this todolist from the second state where we store separately the tasks
    delete tasks[id]; // remove property from object, whose value is an array of tasks
    // set in the state copy of the object to react by redraw
    setTasks({ ...tasks });
  }

  function changeTodolistTitle(id: string, newTitle: string) {
    const todolist = todolists.find(tl => tl.id === id);

    if (todolist) {
      todolist.title = newTitle;
      setTodolists([...todolists]);
    }
  }

  function Todolists(tlProps: TodolistsType) {
    let tasksForTodoList = tasks[tlProps.id];

    if (tlProps.filter === "completed") tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true);

    if (tlProps.filter === "active") tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false);

    return (
      <Grid item>
        <Paper style={{ padding: "10px" }}>
          <Todolist
            id={tlProps.id}
            title={tlProps.title}
            tasks={tasksForTodoList}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            changeTaskTitle={changeTaskTitle}
            filter={tlProps.filter}
            removeTodolist={removeTodolist}
            changeTodolistTitle={changeTodolistTitle}
          />
        </Paper>
      </Grid>
    )
  }

  function addTodolist(title: string) {
    const todolist: TodolistsType = { id: v1(), filter: "all", title: title };
    setTodolists([todolist, ...todolists]);
    setTasks({ ...tasks, [todolist.id]: [] });
  }

  return <>
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <Menu />
        </IconButton>
        <Typography variant="h6">
          News
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
    <Container fixed>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map(tl => <Todolists key={tl.id} id={tl.id} title={tl.title} filter={tl.filter} />)}
      </Grid>
    </Container>
  </>;
}

export default App;
