// src/components/TodoForm.tsx
import React from 'react';

interface TodoFormProps {
  newTitle: string;
  setNewTitle: (title: string) => void;
  newDescription: string;
  setNewDescription: (description: string) => void;
  addTodo: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({
  newTitle,
  setNewTitle,
  newDescription,
  setNewDescription,
  addTodo,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Empêche l'action par défaut du formulaire (soumission)
      action();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page
    addTodo();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
      <input
        className='p-2 hover:outline-0 rounded-md border border-black'
        type="text"
        placeholder="Titre de la tâche..."
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && newDescription === "" && addTodo()}
      />
      <textarea
        className='p-2 hover:outline-0 rounded-md border border-black'
        placeholder="Description (optionnelle)..."
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
        onKeyDown={(e) => handleKeyPress(e, addTodo)}
      />
      <button type='submit' disabled={!newTitle.trim()} className="w-full cursor-pointer rounded-md font-semibold disabled:bg-gray-300 bg-blue-500 text-white p-2">
        Ajouter la tâche
      </button>
    </form>
  );
};

export default TodoForm;