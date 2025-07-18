import { useState } from 'react';

export const useDeleteTodo = (deleteTask: (id: number) => void) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<number | null>(null);

  const openDeleteDialog = (id: number) => {
    setTodoToDelete(id);
    setDeleteDialogOpen(true);
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setTodoToDelete(null);
  };

  const confirmDelete = async () => {
    if (todoToDelete !== null) {
      await deleteTask(todoToDelete);
      cancelDelete();
    }
  };

  return {
    deleteDialogOpen,
    setDeleteDialogOpen,
    openDeleteDialog,
    cancelDelete,
    confirmDelete
  };
};