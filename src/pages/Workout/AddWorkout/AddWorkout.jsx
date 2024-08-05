import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { addWorkoutService } from '../../../services/apiService';


export default function AddWorkout({ fetchData }) {

    const [show, setShow] = useState(false);
    const [isActive, setIsActive] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [duration, setDuration] = useState("");

    useEffect(() => {
        if (name !== '' && duration !== '') {
            setIsActive(true);
        } else {
            setIsActive(false);
        }

    }, [name, duration]);

    const handleAddWorkout = async (e) => {
        e.preventDefault();

        try {
            const response = await addWorkoutService(name, duration);

            if (response) {
                setName("");
                setDuration("");
                Swal.fire({
                    icon: 'success',
                    title: 'Add Workout',
                    text: 'Added Workout Successfully',
                    confirmButtonText: 'ok',
                }).then((result) => {
                    if (result.isConfirmed) {
                        fetchData();
                        setShow(false);
                    }
                })
            } else {
                setName("");
                setDuration("");
                Swal.fire({
                    icon: 'error',
                    title: 'add workout failed',
                    text: `Please try Again`
                });
            }

        } catch (error) {
            console.log(e);
            Swal.fire({
                icon: 'error',
                title: 'login failed',
                text: 'Please try again.'
            });
        }
    }

    return (
        <>

            <Button variant="primary" className='mx-1' onClick={handleShow}>
                Add Workout
            </Button>

            <Modal show={show} onHide={handleClose} animation={true} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Workout</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>
                        <Form.Group className='mb-3'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter workout name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Duration</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter workout duration"
                                required
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    {isActive ?
                        <Button variant="primary" type="submit" onClick={(e) => handleAddWorkout(e)}>
                            Add
                        </Button>
                        :
                        <Button variant="danger" type="submit" disabled>
                            Add
                        </Button>
                    }
                </Modal.Footer>
            </Modal>
        </>
    )
}