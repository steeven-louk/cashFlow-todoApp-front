import { useTasks } from './useTasks';
import type { TodoFormData } from '../schemas/taskSchema';

export const useTodoActions = () => {

  const {
    tasks,
    addTask,
    updateStatus,
  } = useTasks();

  const addTodo = async (data: TodoFormData) => {
    try {
       addTask(data);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la tâche:', error);
    }
  };

  const toggleComplete = async (id: number) => {
    const todo = tasks.find(t => t.id === id);
    if (!todo) return;
    const newStatus = todo.status === 'DONE' ? 'PENDING' : 'DONE';
     updateStatus({ id, status: newStatus });
  };

  return {
    addTodo,
    toggleComplete,
  };
};
