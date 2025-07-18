import React from 'react';
import { RxCross2 } from 'react-icons/rx';
import type { Task } from '../types/taskType';

interface TodoDetailPanelProps {
  selectedTodo: Task | undefined; // Peut être undefined si non trouvé
  setSelectedTodoId: (id: number | null) => void;
  formatDate: (date: Date) => string;
}

const TodoDetailPanel: React.FC<TodoDetailPanelProps> = ({
  selectedTodo,
  setSelectedTodoId,
  formatDate,
}) => {
  if (!selectedTodo) return null; // Ne rien afficher si aucune tâche n'est sélectionnée ou trouvée

  return (
    <div className="border border-gray-300 rounded-md p-4 mt-5">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">Détails de la tâche</h3>
          <button type="button" onClick={() => setSelectedTodoId(null)}>
            <RxCross2 className='w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer'/>
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Titre</label>
            <p className={`${selectedTodo.status ==="DONE" ? "line-through text-muted-foreground" : ""}`}>
              {selectedTodo.title}
            </p>
          </div>
          {selectedTodo.description && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">Description</label>
              <p
                className={`text-sm ${
                  selectedTodo.status ==="DONE" ? "line-through text-muted-foreground" : "text-muted-foreground"
                }`}
              >
                {selectedTodo.description}
              </p>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <label className="font-medium text-muted-foreground">Statut</label>
              <p className={selectedTodo.status ==="DONE" ? "text-green-600" : "text-orange-600"}>
                {selectedTodo.status ==="DONE" ? "✓ Terminée" : "⏳ En cours"}
              </p>
            </div>
            <div>
              <label className="font-medium text-muted-foreground">Créée le</label>
              <p>{formatDate(selectedTodo?.createdAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoDetailPanel;