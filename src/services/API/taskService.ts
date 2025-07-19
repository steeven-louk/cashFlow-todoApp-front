import axios from 'axios';
import type { Task } from '../../types/taskType';
import { toast } from 'react-toastify';
import { handleApiError } from '../utils/errrorHandler';

const API_URL = process.env.SERVER_URL || 'http://localhost:3000/api/tasks';

// Fonction pour récupérer toutes les tâches
export const fetchTasks = async () => {
    try {
        const response = await axios.get(API_URL);
        if(response.status === 200){
            toast.success(response.data.message);
            const {data} = response.data;
            const todos: Task[] = Array.isArray(data) ? data : [];
            return todos;
        }

    } catch (error) {
        handleApiError(error, 'Erreur lors de la récupération des tâches');
        return[];
    }
};

// Fonction pour récupérer une tâche spécifique
export const getTask = async (id: number)=> {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        if(response.status === 200){
            toast.success(response.data.message);
            const {data} = response.data;
            return data;
        }
    } catch (error) {
       throw handleApiError(error, 'Erreur lors de la récupération de la tâche');
    }
};

// Fonction pour ajouter une tâche
export const addTask = async (task:Omit<Task,'id'|'createdAt'>) => {
    try {
    const response = await axios.post(API_URL, {
        title: task.title,
        description: task.description,
        status: task.status,
    });
    if(response.status ===201){
        toast.success(response.data.message)
        const {data} = response.data;
        return data
    }
    } catch (error) {
       throw handleApiError(error, 'Erreur lors de l\'ajout de la tâche');
    }
};

export const deleteTask = async (id:number) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
        toast.success(response.data.message)
    } catch (error) {
       throw handleApiError(error, 'Erreur lors de la suppression de la tâche');
    }
};

export const updateTask = async (id:number, task:Task) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, task);
        if(response.status === 200){
            toast.success(response.data.message);
            const {data} = response.data;
            return data;
        }
    } catch (error) {
       throw handleApiError(error, 'Erreur lors de la mise à jour de la tâche');
    }
};

export const updateTaskStatus = async (id:number, status:string) => {
    try {
        const response = await axios.patch(`${API_URL}/${id}/complete`, { status });
        if(response.status === 200){
            toast.success(response.data.message);
            const {data} = response.data;
            return data;
        }
    } catch (error) {
       throw handleApiError(error, 'Erreur lors de la mise à jour du statut de la tâche');
    }
};