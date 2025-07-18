import { useState } from 'react';

export const useDeleteTodo = (deleteTask: (id: number) => void) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<number | null>(null);

  // Fonction pour ouvrir la boîte de dialogue de suppression
  const openDeleteDialog = (id: number) => {
    setTodoToDelete(id);
    setDeleteDialogOpen(true);
  };

  // Fonctions pour gérer la confirmation et l'annulation de la suppression
  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setTodoToDelete(null);
  };

  // Fonction pour confirmer la suppression
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