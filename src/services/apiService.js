import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const register = async (email, password) => {
	try {
		const { data } = await axios.post(`${API_URL}/users/register`, {
			email,
			password
		});
		return data;
	} catch (error) {
		console.error(error);
	}
}


export const login = async (email, password) => {
	try {
		const { data } = await axios.post(`${API_URL}/users/login`, {
			email,
			password
		})

		return data;
	} catch (error) {
		console.log(error);

	}
}

export const addWorkoutService = async (name, duration) => {
	try {
		const { data } = await axios.post(`${API_URL}/workouts/addWorkout`, {
			name,
			duration
		}, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		});

		return data;
	} catch (error) {
		console.log(error);

	}
}
export const getMyWorkoutsService = async () => {
	try {
		const { data } = await axios.get(`${API_URL}/workouts/getMyWorkouts`, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		});

		return data;
	} catch (error) {
		console.log(error);

	}
}

export const updateWorkoutService = async (payload) => {
	try {
		const { data } = await axios.patch(`${API_URL}/workouts/updateWorkout/${payload.id}`, {
			name: payload.name,
			duration: payload.duration,
			status: payload.status
		}, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		})
		return data;
	} catch (error) {
		console.log(error);
	}
}

export const deleteWorkoutService = async (id) => {
	try {
		const { data } = await axios.delete(`${API_URL}/workouts/deleteWorkout/${id}`, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		});
		return data;
	} catch (error) {
		console.log(error);

	}
}