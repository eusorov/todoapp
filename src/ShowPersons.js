import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';

const persons = [
	{
		id: 1,
		forename: "John",
		lastname: "Doe",
		age: 30,
		address: {
			city: "New York",
			street: "5th Ave",
			zipcode: "10001"
		}
	},
	{
		id: 2,
		forename: "Jane",
		lastname: "Doe",
		age: 25,
		address: {
			city: "Los Angeles",
			street: "Sunset Blvd",
			zipcode: "90001"
		}
	},
	{
		id: 3,
		forename: "Jim",
		lastname: "Smith",
		age: 35,
		address: {
			city: "Chicago",
			street: "Michigan Ave",
			zipcode: "60601"
		}
	}
];

function App() {
	const [selectedPerson, setSelectedPerson] = useState(null);

	const handleClick = (person) => {
		setSelectedPerson(person);
	};

	return (
		<div className="container">
			<h1>Persons Data</h1>
			<Table striped bordered hover>
				<thead>
				<tr>
					<th>ID</th>
					<th>Forename</th>
					<th>Lastname</th>
					<th>Age</th>
					<th>Action</th>
				</tr>
				</thead>
				<tbody>
				{persons.map(person => (
					<tr key={person.id}>
						<td>{person.id}</td>
						<td>{person.forename}</td>
						<td>{person.lastname}</td>
						<td>{person.age}</td>
						<td>
							<Button variant="primary" onClick={() => handleClick(person)}>
								View
							</Button>
						</td>
					</tr>
				))}
				</tbody>
			</Table>
			{selectedPerson && (
				<div>
					<h2>Selected Person</h2>
					<p>
						<strong>ID: </strong>
						{selectedPerson.id}
					</p>
					<p>
						<strong>Forename: </strong>
						{selectedPerson.forename}
					</p>
					<p>
						<strong>Lastname: </strong>
						{selectedPerson.lastname}
					</p>
					<p>
						<strong>Age: </strong>
						{selectedPerson.age}
					</p>
					<p>
						<strong>Address: </strong>
						{selectedPerson.address.city}, {selectedPerson.address.street}, {selectedPerson.address.zipcode}
					</p>
				</div>
			)}
		</div>
	);
}

export default App;
