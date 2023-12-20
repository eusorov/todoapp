import React from "react";

function TodoItem(props) {
	const handleCheckboxClick = () => {
		props.onCheckboxClick(props.todo.id);
	};

	return (
		<div style={props.todo.completed ? { textDecoration: "line-through" } : {}}>
			<input type="checkbox" checked={props.todo.completed} onChange={handleCheckboxClick} />
			<p style={{ display: "inline-block", marginLeft: "10px" }}>{props.todo.text}</p>
		</div>
	);
}

export default TodoItem;
