import { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { updateWorkoutService } from '../../../services/apiService';


export default function UpdateWorkout({ fetchData, data }) {
    console.log("data", data);

    const [show, setShow] = useState(false);
    const [isActive, setIsActive] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();
    const [name, setName] = useState(data.name);
    const [duration, setDuration] = useState(data.duration);
    const [status, setStatus] = useState(data.status || "pending");

    useEffect(() => {
        if (name !== '' && duration !== '') {
            setIsActive(true);
        } else {
            setIsActive(false);
        }

    }, [name, duration]);

    const handleUpdateWorkout = async (e) => {
        e.preventDefault();
        console.log("name", name);
        console.log("duration", duration);

        const payload = {
            id: data._id,
            name,
            duration,
            status
        }


        const response = await updateWorkoutService(payload);
        if (response) {
            setShow(false);
            Swal.fire({
                icon: 'success',
                title: 'Update Workout',
                text: 'Update Workout Successfully',
                confirmButtonText: 'ok',
            }).then((result) => {
                if (result.isConfirmed) {
                    fetchData();
                    setName(data.name);
                    setDuration(data.duration);
                    setStatus(data.status);
                }
            })
        } else {
            setName(data.name);
            setDuration(data.duration);
            setStatus(data.status);
            Swal.fire({
                icon: 'error',
                title: 'Update workout failed',
                text: `Please try Again`
            });
        }

    }

    return (
        <>

            <Button variant="primary" className='mx-1' onClick={handleShow}>
                Update
            </Button>

            <Modal show={show} onHide={handleClose} animation={true} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Update Workout</Modal.Title>
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
                        <Form.Group className='mb-3'>
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                                aria-label="Select workout status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    {isActive ?
                        <Button variant="primary" type="submit" onClick={(e) => handleUpdateWorkout(e)}>
                            Update
                        </Button>
                        :
                        <Button variant="danger" type="submit" disabled>
                            Update
                        </Button>
                    }
                </Modal.Footer>
            </Modal>
        </>
    )
}