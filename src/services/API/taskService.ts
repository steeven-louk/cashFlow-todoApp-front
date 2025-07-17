import axios from 'axios';
import type { Task } from '../../types/taskType';

const API_URL = 'http://localhost:3000/api/tasks';

export const fetchTasks = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addTask = async (task:Task) => {
    console.log('Adding task:', task);
    const response = await axios.post(API_URL, task);
    return response.data;
};

export const deleteTask = async (id:string) => {
    await axios.delete(`${API_URL}/${id}`);
};

export const updateTask = async (id:string, task:Task) => {
    const response = await axios.put(`${API_URL}/${id}`, task);
    return response.data;
};

export const updateTaskStatus = async (id:string, status:string) => {
    const response = await axios.patch(`${API_URL}/${id}/complete`, { status });
    return response.data;
};