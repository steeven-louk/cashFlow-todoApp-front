// Import des dépendances nécessaires
import { create } from "zustand";
import type { Task, TaskState } from "../types/taskType";

// Import des services API pour la gestion des tâches
import { 
  fetchTasks, 
  addTask as addTaskService, 
  getTask as getTaskService,
  deleteTask as deleteTaskService,
  updateTask as updateTaskService,
  updateTaskStatus as updateTaskStatusService 
} from "../services/API/taskService";



// Création du store
export const useTaskStore = create<TaskState>((set) => ({
  // État initial du store
  tasks: [],
  isLoading: false,
  error: null,

  // Fonction pour récupérer toutes les tâches
  fetchTasks: async () => {
    try {
      set({ isLoading: true, error: null }); // Début du chargement
      const tasks = await fetchTasks();
      set({ tasks, isLoading: false }); // Mise à jour du store avec les tâches récupérées
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false }); // Gestion des erreurs
    }
  },

  // Fonction pour récupérer une tâche spécifique
  getTask: async (id: number) => {
  try {
    set({error: null });
    const task = await getTaskService(id); 
    if (!task) {
      throw new Error('Task not found');
    }
    return task; 
  } catch (error) {
    set({ error: (error as Error).message });
    throw error; 
  } 
},

  // Fonction pour ajouter une nouvelle tâche
  addTask: async (task: Omit<Task, 'id' | 'createdAt'>) => {
    try {
      set({ error: null });
      const newTask = await addTaskService(task);
      // Ajout de la nouvelle tâche au tableau existant
      set((state) => ({
        tasks: [...state.tasks, newTask],
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  // Fonction pour supprimer une tâche
  deleteTask: async (id: number) => {
    try {
      set({ isLoading: true, error: null });
      await deleteTaskService(id);
      // Filtrage des tâches pour retirer celle supprimée
      set((state) => ({
        tasks: state.tasks.filter(task => task.id !== id),
        isLoading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  // Fonction pour mettre à jour une tâche
  updateTask: async (id: number, task: Omit<Task,'createdAt'>) => {
    try {
      set({ isLoading: true, error: null });
      const updatedTask = await updateTaskService(id, task);
      // Mise à jour de la tâche dans le tableau
      set((state) => ({
        tasks: state.tasks.map(t => t.id === id ? updatedTask : t),
        isLoading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  // Fonction pour mettre à jour le statut d'une tâche
  updateTaskStatus: async (id: number, status: string) => {
    try {
      set({ error: null });
      const updatedTask = await updateTaskStatusService(id, status);
      // Mise à jour du statut de la tâche dans le tableau
      set((state) => ({
        tasks: state.tasks.map(t => t.id === id ? updatedTask : t),
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    }
  }
}));