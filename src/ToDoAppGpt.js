import React, { useState } from "react";
import TodoList from "./TodoList";

function App() {
	const [todos, setTodos] = useState([
		{ id: 1, text: "Learn React", completed: false },
		{ id: 2, text: "Build a to-do app", completed: false }
	]);
	const [newTodo, setNewTodo] = useState("");
	const [filter, setFilter] = useState("all");

	const handleSubmit = event => {
		event.preventDefault();
		setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
		setNewTodo("");
	};

	const handleCheckboxClick = todoId => {
		console.log(todoId)
		setTodos(
			todos.map(todo => {
				if (todo.id === todoId) {
					return { ...todo, completed: !todo.completed };
				}
				return todo;
			})
		);
	};

	const handleFilterClick = filter => {
		setFilter(filter);
	};

	let filteredTodos = [];
	if (filter === "all") {
		filteredTodos = todos;
	} else if (filter === "active") {
		filteredTodos = todos.filter(todo => !todo.completed);
	} else if (filter === "completed") {
		filteredTodos = todos.filter(todo => todo.completed);
	}

	return (
		<div style={{ textAlign: "center", marginTop: "100px" }}>
			<h1 style={{ marginBottom: "50px" }}>To Do App made by ChatGpt3</h1>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Enter a new task"
					value={newTodo}
					onChange={event => setNewTodo(event.target.value)}
					style={{ width: "300px", height: "30px", fontSize: "20px", marginRight: "10px" }}
				/>
				<button type="submit" style={{ height: "40px", fontSize: "20px", backgroundColor: "#4CAF50", color: "white" }}>
					Add
				</button>
			</form>
			<div style={{ marginTop: "50px" }}>
				<button
					onClick={() => handleFilterClick("all")}
					style={{ marginRight: "10px", backgroundColor: filter === "all" ? "#4CAF50" : "#f2f2f2", color: "white" }}
				>
					All
				</button>
				<button
					onClick={() => handleFilterClick("active")}
					style={{ marginRight: "10px", backgroundColor: filter === "active" ? "#4CAF50" : "#f2f2f2", color: "white" }}
				>
					Active
				</button>
				<button
					onClick={() => handleFilterClick("completed")}
					style={{ backgroundColor: filter === "completed" ? "#4CAF50" : "#f2f2f2", color: "white" }}
				>
					Completed
				</button>
			</div>
			<TodoList todos={filteredTodos} onCheckboxClick={handleCheckboxClick} />
		</div>
	);
}

export default App;
