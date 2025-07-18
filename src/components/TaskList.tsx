import React from 'react';
import type { Task } from '../types/taskType';
import TodoCard from './TodoCard';


interface TaskListProps {
  todos:Task[];
  onTodoClick: (id: number) => void;
  selectedTodoId: number | null;
  toggleComplete: (id: number) => void;
  openDeleteDialog: (id: number) => void;
  selectTodo: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  todos,
  onTodoClick,
  selectedTodoId,
  toggleComplete,
  openDeleteDialog,
  selectTodo,
}) => {


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
            selectedTodoId={selectedTodoId}
            toggleComplete={toggleComplete}
            openDeleteDialog={openDeleteDialog}
            selectTodo={selectTodo}
            onClick={() => onTodoClick(todo.id)}
          />
        ))
      )}
    </div>
  );
};

export default React.memo(TaskList);