import { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { deleteWorkoutService, updateWorkoutService } from '../../../services/apiService';


export default function DeleteWorkout({ fetchData, id }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    console.log("fetchData, id", id);


    const handleDeleteWorkout = async (e) => {
        e.preventDefault();

        try {
            const response = await deleteWorkoutService(id);
            if (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Delete Workout',
                    text: 'Delete Workout Successfully',
                    confirmButtonText: 'ok',
                }).then((result) => {
                    if (result.isConfirmed) {
                        fetchData();
                    }
                })
            }

        } catch (error) {
            console.log(e);
            Swal.fire({
                icon: 'error',
                title: 'Delete workout failed',
                text: 'Please try again.'
            });
        }
    }

    return (
        <>

            <Button variant="danger" className='mx-1' onClick={handleShow}>
                Delete
            </Button>

            <Modal show={show} onHide={handleClose} animation={true} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Workout</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <p>Are you sure you want to delete this workout?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="danger" type="submit" onClick={(e) => handleDeleteWorkout(e)}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}