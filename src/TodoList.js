import React from "react";
import TodoItem from "./TodoItem";

function TodoList(props) {
  return (
    <div>
      {props.todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onCheckboxClick={props.onCheckboxClick} />
      ))}
    </div>
  );
}

export default TodoList;
