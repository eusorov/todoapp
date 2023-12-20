import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { BrowserRouter as Router, Link, useHref } from 'react-router-dom';

function Header() {
	const href = useHref('/');
	const todoHref = useHref('/todo');

	return (
		<Router>
			<nav>
				<Link to={href}>Person Data</Link>
				<Link to={todoHref}>Todo Items</Link>
			</nav>
		</Router>
	);
}

//
// const Header = () => (
// 	<Navbar bg="light" expand="lg">
// 		<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
// 		<Navbar.Toggle aria-controls="basic-navbar-nav" />
// 		<Navbar.Collapse id="basic-navbar-nav">
// 			<Nav className="mr-auto">
// 				<Nav.Link as={Link} to="/">Home</Nav.Link>
// 				<Nav.Link as={Link} to="/todo-items">Todo Items</Nav.Link>
// 			</Nav>
// 		</Navbar.Collapse>
// 	</Navbar>
// );

export default Header;
