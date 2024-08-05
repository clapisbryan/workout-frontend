import React, { useEffect, useState } from 'react'
import { getMyWorkoutsService } from '../../services/apiService';
import { Button, Col, Container, Row } from 'react-bootstrap';
import AddWorkout from './AddWorkout/AddWorkout';
import UpdateWorkout from './UpdateWorkout/UpdateWorkout';
import DeleteWorkout from './DeleteWorkout/DeleteWorkout';

const Workout = () => {
    const [result, setResult] = useState([]);

    useEffect(() => {
        retrieveWorkouts();
    }, []);

    const retrieveWorkouts = async () => {

        try {

            const response = await getMyWorkoutsService();
            setResult(response.workouts || []);

        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div>
            <Container>
                <div className="text-end mb-3">
                    <AddWorkout fetchData={retrieveWorkouts} />
                </div>
                <Row>
                    {result.length > 0 ? (
                        result.map(workout => (
                            <Col sm={12} md={6} lg={4} className='mb-3' key={workout._id}>
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h1>{workout.name}</h1>
                                        <p className='text-capitalize'>{workout.duration}</p>
                                        <p className='text-capitalize'>{workout.status}</p>
                                        <p>{workout.dateAdded}</p>
                                        <UpdateWorkout data={workout} fetchData={retrieveWorkouts} />
                                        <DeleteWorkout id={workout._id} fetchData={retrieveWorkouts} />
                                    </div>
                                </div>
                            </Col>
                        ))
                    ) : (
                        <p>No workouts found.</p>
                    )}
                </Row>
            </Container>
        </div>
    )
}

export default Workout
