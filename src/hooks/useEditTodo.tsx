import { useState } from 'react';
import type { Task } from '../types/taskType';

export const useEditTodo = (updateTask: (params: { id: number; task: Task }) => void) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const startEditing = (id: number, title: string, description: string) => {
    setEditingId(id);
    setEditTitle(title);
    setEditDescription(description);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const saveEdit = async (tasks: Task[]) => {
    if (editTitle.trim() !== "" && editingId !== null) {
      const existingTask = tasks.find(t => t.id === editingId);
      if (!existingTask) return;
      
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