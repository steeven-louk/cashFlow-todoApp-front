import { useState } from 'react';
import { useTasks } from './useTasks';

export const useTaskDetail = () => {
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Fonction pour gérer le clic sur une tâche
  const handleTodoClick = (id: number) => {
    setSelectedTodoId(id);
    setIsDetailModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDetailModalOpen(false);
    setSelectedTodoId(null);
  };

  const selectTodo = (id: number) => {
    setSelectedTodoId(selectedTodoId === id ? null : id)
  }
  // Récupération des détails de la tâche sélectionnée
  const { data: selectedTodo, isLoading: isLoadingTodo, isError } = useTasks().useTask(selectedTodoId);

  return {
    selectedTodoId,
    isDetailModalOpen,
    handleTodoClick,
    handleCloseModal,
    selectTodo,
    selectedTodo,
    isLoadingTodo,
    isError
  };
};