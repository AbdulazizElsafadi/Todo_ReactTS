import React, { FC, useRef } from "react";
import "./styles.css";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const InputField: FC<Props> = ({ todo, setTodo, handleSubmit }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAdded = (event: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(event);
    inputRef.current?.blur();
  };

  return (
    <form className="Form" onSubmit={handleAdded}>
      <input
        ref={inputRef}
        type="input"
        placeholder="Enter a todo"
        className="input"
        value={todo}
        onChange={(event) => setTodo(event.target.value)}
      />
      <button className="form_btn">GO</button>
    </form>
  );
};

export default InputField;
