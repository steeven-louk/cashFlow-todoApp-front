import React from 'react';
import { useForm } from 'react-hook-form';
import { todoSchema, type TodoFormData } from '../schemas/taskSchema';
import { zodResolver } from '@hookform/resolvers/zod';

interface TodoFormProps {
  addTodo: (data: TodoFormData) => void;

}

const TodoForm: React.FC<TodoFormProps> = ({
  addTodo,
}) => {

    const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: '',
      description: ''
    }
  });


  const onSubmit = async(data: TodoFormData) => {
    addTodo(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-3">
      <div className="space-y-1">
        <input
          {...register('title')}
          className='w-full p-2 rounded-md border border-black focus:outline-none focus:ring-2 focus:ring-blue-500'
          type="text"
          placeholder="Titre de la tâche..."
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>
      <div className="space-y-1">
        <textarea
          {...register('description')}
          className='w-full p-2 rounded-md border border-black focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder="Description..."
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>
      <button
        type='submit'
        disabled={isSubmitting}
        className="w-full cursor-pointer rounded-md font-semibold disabled:bg-gray-300 bg-blue-500 text-white p-2 hover:bg-blue-600 transition-colors"
      >
        {isSubmitting ? 'Ajout en cours...' : 'Ajouter la tâche'}
      </button>
    </form>
  );
};

export default TodoForm;