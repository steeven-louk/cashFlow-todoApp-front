export type TaskStatus = 'PENDING' | 'DONE';

export interface Task {
  id: number
  title: string
  description: string
  status: TaskStatus
  // createdAt: Date
}

// Définition de l'interface TaskState qui décrit la structure du store
export interface TaskState {
  tasks: Task[]; // Tableau contenant toutes les tâches
  isLoading: boolean;   // Indicateur de chargement
  error: string | null; // Message d'erreur éventuel
  fetchTasks: () => Promise<void>; // Fonction pour récupérer les tâches
  getTask: (id: number) => Promise<void>; // Fonction pour récupérer une tâche spécifique
  addTask: (task: Omit<Task, 'id'>) => Promise<void>;  // Fonction pour ajouter une tâche
  deleteTask: (id: number) => Promise<void>; // Fonction pour supprimer une tâche
  updateTask: (id: number, task: Task) => Promise<void>; // Fonction pour mettre à jour une tâche
  updateTaskStatus: (id: number, status: string) => Promise<void>; // Fonction pour mettre à jour le statut
}