import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Task } from '../types/taskType';
import type { TodoFormData } from '../schemas/taskSchema';
import * as taskService from '../services/API/taskService';

export const useTasks = () => {
  const queryClient = useQueryClient();

  // Query pour récupérer toutes les tâches
  const { data: tasks = [], isLoading, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: taskService.fetchTasks
  });

  // Query pour récupérer une tâche spécifique
  const useTask = (id: number | null) => useQuery({
    queryKey: ['task', id],
    queryFn: () => taskService.getTask(id as number),
    enabled: !!id
  });

  // Mutation pour ajouter une tâche
  const addTaskMutation = useMutation({
    mutationFn: (data: TodoFormData) => 
      taskService.addTask({
        title: data.title.trim(),
        description: data.description.trim(),
        status: 'PENDING'
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  // Mutation pour mettre à jour le statut
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) => 
      taskService.updateTaskStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  // Mutation pour mettre à jour une tâche
  const updateTaskMutation = useMutation({
    mutationFn: ({ id, task }: { id: number; task: Task }) => 
      taskService.updateTask(id, task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  // Mutation pour supprimer une tâche
  const deleteTaskMutation = useMutation({
    mutationFn: taskService.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  return {
    tasks,
    isLoading,
    error,
    useTask,
    addTask: addTaskMutation.mutate,
    updateStatus: updateStatusMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
  };
};