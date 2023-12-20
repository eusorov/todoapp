import React, { Component } from 'react';

class ToDoAppDavinci extends Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: [],
			inputValue: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.completeTodo = this.completeTodo.bind(this);
	}

	handleChange(event) {
		this.setState({
			inputValue: event.target.value
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		this.setState({
			todos: [...this.state.todos, {
				todo: this.state.inputValue,
				completed: false
			}],
			inputValue: ''
		});
	}

	completeTodo(index) {
		let newTodos = [...this.state.todos];
		newTodos[index].completed = true;
		this.setState({
			todos: newTodos
		});
	}

	render() {
		return (
			<div>
				<h1>Todo App OpenAI Davinci model</h1>
				<form onSubmit={this.handleSubmit}>
					<input type="text" value={this.state.inputValue} onChange={this.handleChange} />
					<button type="submit">Add Todo</button>
				</form>
				<ul>
					{this.state.todos.map((todo, index) => {
						return (
							<li key={index}>
								<input
									type="checkbox"
									checked={todo.completed}
									onChange={() => this.completeTodo(index)}
								/>
								{todo.todo}
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}

export default ToDoAppDavinci;
