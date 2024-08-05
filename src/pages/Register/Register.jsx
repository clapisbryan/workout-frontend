import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';
import { register } from '../../services/apiService';
export default function Register() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isActive, setIsActive] = useState(true);

	useEffect(() => {
		if (email !== '' && password !== '') {
			setIsActive(true);
		} else {
			setIsActive(false);
		}

	}, [email, password]);

	const authenticate = async (e) => {
		e.preventDefault();

		try {
			const response = await register(email, password);

			if (response) {
				Swal.fire({
					icon: 'success',
					title: 'Register',
					text: 'Register Successfully',
					confirmButtonText: 'ok',
				}).then((result) => {
					if (result.isConfirmed) {
						navigate('/login');
					}
				})
			}

		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: 'Registration failed',
				text: 'There was an error registering your account. Please try again.'
			});
		}

	}

	return (
		<>
			<Container>
				<Row className='justify-content-center'>
					<Col sm={12} md={6}>
						<Form onSubmit={(e) => authenticate(e)}>
							<h1 className="my-5 text-center">Register</h1>
							<Form.Group>
								<Form.Label>Email address</Form.Label>
								<Form.Control
									type="email"
									placeholder="Enter email"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Password</Form.Label>
								<Form.Control
									type="password"
									placeholder="Password"
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</Form.Group>

							{isActive ?
								<Button variant="primary" type="submit">
									Submit
								</Button>
								:
								<Button variant="danger" type="submit" disabled>
									Submit
								</Button>
							}
						</Form>
					</Col>
				</Row>
			</Container>
		</>
	)
}