import { useState } from 'react';
import type { Task } from '../types/taskType';
import { useTasks } from './useTasks';

export const useEditTodo = (updateTask: (params: { id: number; task: Task }) => void) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
const { tasks } = useTasks();

  // Fonction pour démarrer l'édition d'une tâche
  const startEditing = (id: number, title: string, description: string) => {
    setEditingId(id);
    setEditTitle(title);
    setEditDescription(description);
  };

  // Fonction pour annuler l'édition
  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  };

  // Fonction pour sauvegarder les modifications
  const saveEdit = async () => {
    if (editTitle.trim() !== "" && editingId !== null) {
      const existingTask = tasks.find(t => t.id === editingId);
      if (!existingTask) return;
      // Appel de la fonction updateTask avec les nouvelles valeurs
      await updateTask({
        id: editingId,
         task: {
          id: editingId,
          title: editTitle.trim(),
          description: editDescription.trim(),
          status: 'PENDING',
          createdAt: existingTask.createdAt,
        },
      });
      cancelEdit();
    }
  };

  return {
    editingId,
    editTitle,
    editDescription,
    setEditTitle,
    setEditDescription,
    startEditing,
    cancelEdit,
    saveEdit
  };
};