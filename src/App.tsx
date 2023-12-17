import { TaskType, Todolist } from './Todolist';
import './App.css';
import { useState } from 'react';

export type FilterValuesType = "all" | "completed" | "active";

function App() {
  const [tasks, setTasks] = useState<Array<TaskType>>([
    { id: 1, title: "CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "React", isDone: false },
  ]);
  const [filter, setFilter] = useState<FilterValuesType>("all");

  const removeTask = (id: number) => setTasks(tasks.filter(t => t.id !== id));

  const changeFilter = (value: FilterValuesType) => setFilter(value);

  let tasksForTodoList = tasks;

  if (filter === "completed") {
    tasksForTodoList = tasks.filter(t => t.isDone === true)
  }
  
  if (filter === "active") {
    tasksForTodoList = tasks.filter(t => t.isDone === false)
  }

  return (
    <div className="App">
      <Todolist
        title="What to learn"
        tasks={tasksForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
