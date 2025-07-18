import React from "react";
import TodoDetailPanel from "./TodoDetailPanel";
import type { Task } from "../types/taskType";

interface TodoDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTodo?: Task | null;
  isLoading?: boolean;
  isError?: boolean;
}

const TodoDetailModal: React.FC<TodoDetailModalProps> = ({
  isOpen,
  onClose,
  selectedTodo,
  isLoading,
  isError,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-50 w-full max-w-lg bg-white rounded-lg shadow-xl">
        <div className="p-6">
          {isLoading ? (
            <div className="flex items-center justify-center p-4">
              <span>Chargement...</span>
            </div>
          ) : isError ? (
            <div className="text-center p-4">
              <p>Une erreur est survenue en récupérant la tâche.</p>
            </div>
          ) : !selectedTodo ? (
            <div className="text-center p-4">
              <p>Tâche non trouvée.</p>
            </div>
          ) : (
            <TodoDetailPanel
              selectedTodo={selectedTodo}
              setSelectedTodoId={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoDetailModal;
