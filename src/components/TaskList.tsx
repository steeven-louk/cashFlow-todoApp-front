// src/components/TodoList.tsx
import React from 'react';
import type { Task } from '../types/taskType';
import TodoCard from './TodoCard';

interface TaskListProps {
  todos:[];
  onTodoClick: (id: number) => void;
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
}

const TaskList: React.FC<TaskListProps> = ({
  todos,
  onTodoClick,
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
  selectTodo,
  formatDate,
}) => {
  console.log("TaskList rendered with todos:", todos);
  return (
    <div className="space-y-2 my-5">
      {todos?.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">
         Aucune tâche pour le moment. Ajoutez-en une !
        </p>
      ) : (
        (todos || []).map((todo:Task) => (
          <TodoCard
            key={todo?.id}
            todo={todo}
            editingId={editingId}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            editDescription={editDescription}
            setEditDescription={setEditDescription}
            selectedTodoId={selectedTodoId}
            toggleComplete={toggleComplete}
            startEditing={startEditing}
            saveEdit={saveEdit}
            cancelEdit={cancelEdit}
            openDeleteDialog={openDeleteDialog}
            selectTodo={selectTodo}
            formatDate={formatDate}
            onClick={() => onTodoClick(todo.id)}
          />
        ))
      )}
    </div>
  );
};

export default React.memo(TaskList);
// This component renders a list of tasks (todos) and handles their display and interactions.
// It uses React.memo to optimize rendering by preventing unnecessary re-renders when props haven't changed.