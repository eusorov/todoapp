import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const TodoItem = ({task, onCheckboxClick}) => {
	return (
		<li className="list-group-item d-flex justify-content-between">
			<input
				type="checkbox"
				checked={task.completed}
				onChange={() => onCheckboxClick(task)}
				className="form-check-input"
			/>
			<label className={`form-check-label ${task.completed ? "completed" : ""}`}>
				{task.task}
			</label>
		</li>
	);
};

const TodoList = ({tasks, onCheckboxClick, filter}) => {
	return (
		<ul className="list-group">
			{tasks
				.filter((task) => {
					if (filter === "all") return true;
					if (filter === "active") return !task.completed;
					if (filter === "completed") return task.completed;
				})
				.map((task) => (
					<TodoItem key={task.id} task={task} onCheckboxClick={onCheckboxClick}/>
				))}
		</ul>
	);
};

const App = () => {
	const [todoList, setTodoList] = useState([]);
	const [inputValue, setInputValue] = useState("");
	const [filter, setFilter] = useState("all");

	useEffect(() => {
		const fetchTodos = async () => {
			const response = await fetch("http://localhost:3001/todos");
			const todos = await response.json();
			setTodoList(todos);
		};

		fetchTodos();
	}, []);

	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!inputValue) return;
		const newTodo = { id: Date.now(), task: inputValue, completed: false };
		const response = await fetch("http://localhost:3001/todos", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newTodo),
		});
		const savedTodo = await response.json();
		setTodoList([...todoList, savedTodo]);
		setInputValue("");
	};

	const handleTodoClick = async (todo) => {
		const updatedTodo = { ...todo, completed: !todo.completed };
		const response = await fetch(
			`http://localhost:3001/todos/${todo.id}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedTodo),
			}
		);
		const savedTodo = await response.json();
		setTodoList(
			todoList.map((t) => (t.id === todo.id ? savedTodo : t))
		);
	};

	const filteredTodos = todoList.filter((todo) => {
		if (filter === "all") return true;
		if (filter === "active" && !todo.completed) return true;
		if (filter === "completed" && todo.completed) return true;
		return false;
	});

	const handleFilterClick = (selectedFilter) => {
		setFilter(selectedFilter);
	};

	return (
		<div className="container my-5">
			<h1 className="text-center">To-Do App</h1>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					className="form-control my-3"
					placeholder="Add a task"
					value={inputValue}
					onChange={handleInputChange}
				/>
				<button className="btn btn-primary">Add</button>

			<div className="d-flex justify-content-center mt-5 mb-5">
				<button
					className={`btn btn-outline-secondary mr-2 ${filter === 'all' ? 'btn-primary' : ''}`}
					onClick={() => handleFilterClick("all")}
				>
					All
				</button>
				<button
					className={`btn btn-outline-secondary mr-2 ${filter === 'active' ? 'btn-primary' : ''}`}
					onClick={() => handleFilterClick("active")}
				>
					Active
				</button>
				<button
					className={`btn btn-outline-secondary ${filter === 'completed' ? 'btn-primary' : ''}`}
					onClick={() => handleFilterClick("completed")}
				>
					Completed
				</button>
			</div>
			</form>
			<TodoList tasks={todoList} onCheckboxClick={handleTodoClick} filter={filter}/>
		</div>
	)
}

export default App;
