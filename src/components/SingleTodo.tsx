import React, { FC, useEffect, useRef, useState } from "react";
import { Todo } from "../model";
import { MdOutlineDoneOutline } from "react-icons/md";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo: FC<Props> = ({ index, todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) => {
        return todo.id === id ? { ...todo, isDone: !todo.isDone } : todo;
      })
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    event.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );

    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todo ${snapshot.isDragging ? "drag" : ""}`}
          onSubmit={(event) => handleSubmit(event, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              ref={inputRef}
              value={editTodo}
              type="text"
              className="todo_text"
              onChange={(event) => setEditTodo(event.target.value)}
            />
          ) : todo.isDone ? (
            <s className="todo_text">{todo.todo}</s>
          ) : (
            <span className="todo_text">{todo.todo}</span>
          )}

          <span
            className="icon"
            onClick={() => {
              if (!edit && !todo.isDone) setEdit(!edit);
            }}
          >
            <AiFillEdit />
          </span>
          <span className="icon" onClick={() => handleDone(todo.id)}>
            <MdOutlineDoneOutline />
          </span>
          <span className="icon" onClick={() => handleDelete(todo.id)}>
            <AiOutlineDelete />
          </span>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
