import React, { FC } from "react";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTasks: Todo[];
  setCompletedTasks: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: FC<Props> = ({
  todos,
  setTodos,
  completedTasks,
  setCompletedTasks,
}) => {
  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "drag_active" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todo_heading">Active Tasks</span>
            {todos.map((todo, index) => {
              return (
                <SingleTodo
                  index={index}
                  key={todo.id}
                  todo={todo}
                  todos={todos}
                  setTodos={setTodos}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            className={`todos remove ${
              snapshot.isDraggingOver ? "drag_complete" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todo_heading">Completed Tasks</span>
            {completedTasks.map((todo, index) => {
              return (
                <SingleTodo
                  index={index}
                  key={todo.id}
                  todo={todo}
                  todos={completedTasks}
                  setTodos={setCompletedTasks}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
