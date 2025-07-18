// src/components/TodoItem.tsx
import React from 'react';
import { FaCheckSquare, FaEdit, FaTrash } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import type { Task } from '../types/taskType';

interface TodoItemProps {
  todo: Task;
  editingId: number | null;
  editTitle: string;
  setEditTitle: (title: string) => void;
  editDescription: string;
  setEditDescription: (description: string) => void;
  selectedTodoId: number | null;
  toggleComplete: (id: number) => void;
  startEditing: (id: number, title: string, description: string) => void;
  saveEdit: () => void;
  cancelEdit: () => void;
  openDeleteDialog: (id: number) => void;
  selectTodo: (id: number) => void;
  formatDate: (date: Date) => string;
  onClick: () => void;
}

const TodoCard: React.FC<TodoItemProps> = ({
  todo,
  editingId,
  editTitle,
  setEditTitle,
  editDescription,
  setEditDescription,
  selectedTodoId,
  toggleComplete,
  startEditing,
  saveEdit,
  cancelEdit,
  openDeleteDialog,
  // selectTodo,
  formatDate,
  onClick
}) => {
const cardClass = `
  flex items-center gap-3 p-3 rounded-lg border hover:shadow-md transition-colors cursor-pointer
  ${selectedTodoId === todo.id 
    ? "shadow-sm"
    : todo.status === "DONE"
    ? "bg-slate-300 border"
    : "bg-blue-100 hover:border-slate-300"
  }
`;

const checkBoxClass =`w-5 h-5 rounded border-2 cursor-pointer flex items-center justify-center transition-colors ${
          todo.status === "DONE"
            ? "bg-blue-500 border-blue-500 text-white"
            : "border-muted hover:border-blue-500"
        }`


        return (
    <div onClick={()=> onClick()} className={cardClass}>
      {/* Checkbox */}
      {!editingId &&
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleComplete(todo.id);
        }}
        aria-label="Marquer comme terminée" 
        aria-pressed={todo.status === "DONE"} 
        className={checkBoxClass}
      >
        {todo.status === "DONE" && <FaCheckSquare className="w-4 h-4" />}
      </button>
    }
      {/* Texte de la todo / Formulaire d'édition */}
      <div className="flex-1">
        {editingId === todo.id ? (
  <div className="flex-1 space-y-2" onClick={(e) => e.stopPropagation()}>
    <input
      type="text"
      value={editTitle}
      onChange={(e) => setEditTitle(e.target.value)}
      className="font-medium p-1 border rounded w-full"
      placeholder="Titre..."
      autoFocus
      onClick={(e) => e.stopPropagation()}
    />
    <textarea
      value={editDescription}
      onChange={(e) => setEditDescription(e.target.value)}
      className="text-sm p-1 border rounded w-full"
      rows={3}
      placeholder="Description..."
      onClick={(e) => e.stopPropagation()}
    />
  </div>
        ) : (
          <div className="flex-1">
            <div
              className={`font-medium transition-color ${todo.status === "DONE" ? "line-through text-muted-foreground" : "text-foreground"}`}
            >
              {todo.title}
            </div>
            {todo.description && (
              <div
                className={`text-sm mt-1 ${todo.status === "DONE" ? "line-through text-muted-foreground" : "text-muted-foreground"}`}
              >
                {todo.description}
              </div>
            )}
            <div className="text-xs text-muted-foreground mt-1">Créé le {formatDate(todo?.createdAt)}</div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 z-40">
        {editingId === todo.id ? (
          <>
            <button className='cursor-pointer' type="button" onClick={saveEdit} disabled={!editTitle.trim()}>
              <FaCheckSquare className='w-6 h-6 transition-colors text-green-600 hover:text-green-500 cursor-pointer disabled:text-gray-400'/>
            </button>
            <button className='cursor-pointer' type="button" onClick={cancelEdit}>
              <RxCross2 className='w-6 h-6 transition-colors text-red-600 hover:text-red-500 cursor-pointer'/>
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                startEditing(todo.id, todo.title, todo.description);
              }}
              disabled={todo.status === "DONE"}
            >
              <FaEdit className=' w-6 h-6 transition-colors text-blue-600 hover:text-blue-500 cursor-pointer'/>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                openDeleteDialog(todo.id);
              }}
              className="transition-colors text-red-400 hover:text-red-500 cursor-pointer"
            >
              <FaTrash className='w-6 h-6'/>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(TodoCard);