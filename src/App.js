import React, { Component } from 'react';
import ToDoAppGptBootstrap from "./ToDoAppGptBootstrap";
import ShowPersons from "./ShowPersons";
import { Nav, Navbar } from 'react-bootstrap';

import { Routes, Route, Outlet, Link } from "react-router-dom";
import ShowPersonsCrud from "./ShowPersonsCrud";
import TicTacToeMain from "./tictactoe/TicTacToeMain";

export default function App() {
		return (

			<div>
				{/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<ShowPersons />} />
						<Route path="todos" element={<ToDoAppGptBootstrap />} />
						<Route path="personscrud" element={<ShowPersonsCrud />} />
						<Route path="tictactoe" element={<TicTacToeMain />} />

						{/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
						<Route path="*" element={<NoMatch />} />
					</Route>
				</Routes>
			</div>
		);
}
const Header = () => (
	<Navbar bg="light" expand="lg">
		<Navbar.Toggle aria-controls="basic-navbar-nav" />
		<Navbar.Collapse id="basic-navbar-nav">
			<Nav className="mr-auto">
				<Nav.Link as={Link} to="/">Show Persons</Nav.Link>
				<Nav.Link as={Link} to="/personscrud">Persons Crud</Nav.Link>
				<Nav.Link as={Link} to="/todos">Todo Items</Nav.Link>
				<Nav.Link as={Link} to="/tictactoe">TicTacToe</Nav.Link>
			</Nav>
		</Navbar.Collapse>
	</Navbar>
);

function Layout() {
	return (
		<div>
			<Header/>

			{/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
			<Outlet />
		</div>
	);
}
function NoMatch() {
	return (
		<div>
			<h2>Nothing to see here!</h2>
			<p>
				<Link to="/">Go to the home page</Link>
			</p>
		</div>
	);
}
