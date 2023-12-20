const express = require('express');
const app = express();
const cors = require('cors');

const port = process.env.PORT || 3001;

const todos = [
	{
		id: 1,
		task: "Take out the trash",
		completed: false
	},
	{
		id: 2,
		task: "Buy groceries",
		completed: false
	},
	{
		id: 3,
		task: "Do laundry",
		completed: false
	},
	{
		id: 4,
		task: "Mow the lawn",
		completed: false
	},
	{
		id: 5,
		task: "Study for exams",
		completed: false
	}
];

app.use(cors());
app.use(express.json());

app.get('/todos', (req, res) => {
	res.json(todos);
});

app.post('/todos', (req, res) => {
	const newTodo = req.body;
	todos.push(newTodo);
	res.json(newTodo);
});

app.put("/todos/:id", (req, res) => {
	const todoId = Number(req.params.id);
	const todoIndex = todos.findIndex(todo => todo.id === todoId);

	if (todoIndex === -1) {
		res.status(404).send({ message: "Todo not found" });
		return;
	}

	const updatedTodo = { ...todos[todoIndex], ...req.body };
	delete updatedTodo.id;

	todos[todoIndex] = { ...todos[todoIndex], ...updatedTodo };

	res.status(200).json(todos[todoIndex]);
});


app.listen(port, () => {
	console.log(`Todo API Server running at http://localhost:${port}`);
});
