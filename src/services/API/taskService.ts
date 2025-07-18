import axios from 'axios';
import type { Task } from '../../types/taskType';

const API_URL = 'http://localhost:3000/api/tasks';

export const fetchTasks = async () => {
    try {
        const response = await axios.get(API_URL);
        console.log("Fetched tasks 1:", response.data);
        if(response.status === 200){
            const {data} = response.data;
            const todos: Task[] = Array.isArray(data) ? data : [];
            return todos;
        }

    } catch (error) {
        console.error(error?.response?.data.message || 'Erreur lors de la récupération des tâches');
        // throw error;
    }
};

export const getTask = async (id: number)=> {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        console.log("Fetched task 15:", response);
        if(response.status === 200){
            const {data} = response.data;
            console.log("Fetched task10:", data);
            return data;
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.response?.data.message || 'Erreur lors de la récupération de la tâche');
        } else {
            console.error('Erreur lors de la récupération de la tâche');
        }
        throw error;
    }
};


export const addTask = async (task:Omit<Task,'id'>) => {
    try {
    const response = await axios.post(API_URL, {
        title: task.title,
        description: task.description,
        status: task.status,
    });
    if(response.status ===201){
        const {data} = response.data;
        return data
    }
    } catch (error) {
        console.log(error)
    }
};

export const deleteTask = async (id:number) => {
    try {
       await axios.delete(`${API_URL}/${id}`);

    } catch (error) {
        console.error(error?.response?.data.message || 'Erreur lors de la suppression de la task');
    }
};

export const updateTask = async (id:number, task:Task) => {
    const response = await axios.put(`${API_URL}/${id}`, task);
    return response.data;
};

export const updateTaskStatus = async (id:number, status:string) => {
    try {
        const response = await axios.patch(`${API_URL}/${id}/complete`, { status });
        console.log("Updated task status:", response);
        if(response.status === 200){
            const {data} = response.data;
            return data;
        }
        // return response.data;
    } catch (error) {
        console.error(error?.response?.data.message || 'Erreur lors de la mise à jour du statut de la tâche');
        throw error;
    }
};