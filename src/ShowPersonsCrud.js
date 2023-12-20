import React, { useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';

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
	const [editingPerson, setEditingPerson] = useState(null);
	const [personsList, setPersonsList] = useState(persons);

	const [selectedPerson, setSelectedPerson] = useState(persons[0]);

	const [formMode, setFormMode] = useState('view');

	const handleClick = (person) => {
		setSelectedPerson(person);
		setFormMode('view');
	};

	const handleEdit = (person) => {

	};

	const handleCancel = () => {
		setSelectedPerson({
			id: null,
			forename: '',
			lastname: '',
			age: null,
			address: {
				city: '',
				street: '',
				zipcode: ''
			}
		});
		setFormMode('view');
	};

	const handleSave = (event) => {
		event.preventDefault();
		setSelectedPerson({
			id: selectedPerson.id,
			forename: event.target.forename.value,
			lastname: event.target.lastname.value,
			age: event.target.age.value,
			address: {
				city: event.target.city.value,
				street: event.target.street.value,
				zipcode: event.target.zipcode.value
			}
		});
		setFormMode('view');
	};

	function handleInputChange(e, value) {
		return undefined;
	}

	function handleDelete(personToDelete) {
		console.log(personToDelete)
		const updatedPersons = personsList.filter(person => person.id !== personToDelete.id);
		console.log(updatedPersons)
		setPersonsList(updatedPersons);
	}

	let editMode;
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
				{personsList.map(person => (
					<tr key={person.id}>
						<td>{person.id}</td>
						<td>{person.forename}</td>
						<td>{person.lastname}</td>
						<td>{person.age}</td>
						<td>
							<Button variant="primary" onClick={() => handleClick(person)}>
								View
							</Button>
							<Button variant="secondary" onClick={() => handleEdit(person)}>
								Edit
							</Button>
							<Button variant="danger" onClick={() => handleDelete(person)}>
								Delete
							</Button>
						</td>
					</tr>
				))}
				</tbody>
			</Table>
			{selectedPerson && (
				<div>
					<h2>{editMode ? "Edit Person" : "Selected Person"}</h2>
					<Form>
						<Form.Group>
							<Form.Label>ID</Form.Label>
							<Form.Control type="text" disabled value={selectedPerson.id}/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Forename</Form.Label>
							<Form.Control type="text" value={selectedPerson.forename}
										  onChange={e => handleInputChange(e, "forename")}/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Lastname</Form.Label>
							<Form.Control type="text" value={selectedPerson.lastname}
										  onChange={e => handleInputChange(e, "lastname")}/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Age</Form.Label>
							<Form.Control type="text" value={selectedPerson.age}
										  onChange={e => handleInputChange(e, "age")}/>
						</Form.Group>
						<Form.Group>
							<Form.Label>City</Form.Label>
							<Form.Control type="text" value={selectedPerson.address.city}
										  onChange={e => handleInputChange(e, "city")}/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Street</Form.Label>
							<Form.Control type="text" value={selectedPerson.address.street}
										  onChange={e => handleInputChange(e, "street")}/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Zipcode</Form.Label>
							<Form.Control type="text" value={selectedPerson.address.zipcode}
										  onChange={e => handleInputChange(e, "zipcode")}/>
						</Form.Group>
					</Form>
				</div>
			)}
		</div>
	)
}

export default App;
