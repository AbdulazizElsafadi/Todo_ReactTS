import "./App.css";
import { FC, useState } from "react";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { Todo } from "./model";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

// TYPESCRIPT:
// type X = {
//   a: string;
//   b: number;
// };

// // When you create y object you must include x properties in it.
// type Y = X & {
//   c: boolean;
//   d: null;
// };

// let y: Y = {
//   c: true,
//   d: null,
//   a: "abdulaziz",
//   b: 22,
// };
// console.log(y);

const App: FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Todo[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
    setTodo("");
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    let add,
      active = todos,
      complete = completedTasks;

    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setTodos(active);
    setCompletedTasks(complete);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading"> TODO </span>
        <InputField todo={todo} setTodo={setTodo} handleSubmit={handleSubmit} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTasks={completedTasks}
          setCompletedTasks={setCompletedTasks}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
