import { useState } from 'react';
import { v1 } from 'uuid';
import { TaskType, Todolist } from './Todolist';
import './App.css';

export type FilterValuesType = "all" | "completed" | "active";

function App() {
  const [filter, setFilter] = useState<FilterValuesType>("all");
  const [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "React", isDone: false },
  ]);

  function removeTask(id: string) { 
    setTasks(tasks.filter(t => t.id !== id));
  }

  function addTask(title: string) { 
    setTasks([{ id: v1(), title: title, isDone: false }, ...tasks]);
  }

  function changeStatus(taskId: string, isDone: boolean) {
    const task = tasks.find(t => t.id === taskId);

    if (task) {
      task.isDone = isDone;
      setTasks([...tasks]);
    }
  }

  function changeFilter(value: FilterValuesType) { 
    setFilter(value);
  }

  let tasksForTodoList = tasks;

  if (filter === "completed") tasksForTodoList = tasks.filter(t => t.isDone === true);

  if (filter === "active") tasksForTodoList = tasks.filter(t => t.isDone === false);

  return (
    <div className="App">
      <Todolist
        title="What to learn"
        tasks={tasksForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeTaskStatus={changeStatus}
        filter={filter}
      />
    </div>
  );
}

export default App;
