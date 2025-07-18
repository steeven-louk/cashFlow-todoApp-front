// src/components/TodoStats.tsx
import React from 'react';
import type { Task, TaskStatus } from '../types/taskType';

interface TodoStatsProps {
  todos: Task[];
}

const TodoStats: React.FC<TodoStatsProps> = ({ todos }) => {
  // Nombre de tâches terminées et restantes
  const completedCount = todos.filter((t) => t.status === "DONE" as TaskStatus).length;
  // Nombre de tâches restantes
  // Ici, on considère les tâches restantes comme celles qui ne sont pas terminées
  const remainingCount = todos.filter((t) => t.status !== "DONE" as TaskStatus).length;

  return (
    <div className="flex justify-between text-sm text-muted-foreground pt-4 border-t mt-5">
      <span>Total: {todos.length}</span>
      <span>Terminées: {completedCount}</span>
      <span>Restantes: {remainingCount}</span>
    </div>
  );
};

export default TodoStats;