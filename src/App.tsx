import TaskList from './components/TaskList'
import TodoForm from './components/TodoForm'
import DeleteConfirmationDialog from './components/DeleteConfirmationDialog'
import TodoStats from './components/TaskStats'
import TodoDetailModal from './components/TodoDetailModal'

import { FaPenNib } from 'react-icons/fa'
import { sortedTask } from './services/utils/sortedTask'

import { useTasks } from './hooks/useTasks'
import { useDeleteTodo } from './hooks/useDeleteTodo'
import { useTaskDetail } from './hooks/useTaskDetail'
import { useTodoActions } from './hooks/useTodoActions'

function App() {

    const {
    tasks,
    isLoading,
    error,
    deleteTask,
  } = useTasks();

  // Hook pour gérer la suppression d'une tâche
  const {   
    deleteDialogOpen,
    setDeleteDialogOpen,
    openDeleteDialog,
    cancelDelete,
    confirmDelete} = useDeleteTodo(deleteTask);

  // Récupération des détails de la tâche sélectionnée
  const { 
    selectedTodoId,
    isDetailModalOpen,
    handleTodoClick,
    handleCloseModal,
    selectTodo,
    selectedTodo,
    isLoadingTodo,
    isError
  } = useTaskDetail();

  const { toggleComplete } = useTodoActions();

  return (
    <>
    <div className="max-w-2xl border border-gray-400 w-full mx-auto p-6 flex-col my-auto justify-center border-md rounded-md">
      <div className="mb-6">
        <div className="flex items-center justify-center mx-auto gap-2 mb-4">
          <FaPenNib className="w-6 h-6 md:block hidden"/>
          <h1 className="md:text-3xl text-2xl font-bold text-center">Gestion des Tâches - Équipe Interne</h1>
        </div>
        
        <div className="border-dashed border  border-gray-500 rounded-md p-3 space-y-6">
          {/* Formulaire d'ajout */}
          <h2 className='font-semibold text-xl'>Nouvelle tâche</h2>

          <TodoForm/>
        </div>

          {/* Liste des todos */}
          { isLoading && <h2 className='text-xl animate-pulse'>Loading...</h2>}
          {error && <h2>Error: {error.message}</h2>}
          <TaskList
            todos={sortedTask(tasks)}
            onTodoClick={handleTodoClick}
            selectedTodoId={selectedTodoId}
            toggleComplete={toggleComplete}
            openDeleteDialog={openDeleteDialog}
            selectTodo={selectTodo}
            />


            {/* Panneau de détails de la todo sélectionnée */}
          <TodoDetailModal
            isOpen={isDetailModalOpen}
            onClose={handleCloseModal}
            selectedTodo={selectedTodo}
            isLoading={isLoadingTodo}
            isError={isError}
          />
          {/* Statistiques */}
        {tasks?.length > 0 && <TodoStats todos={tasks} />}
      </div>


      {/* Dialog de confirmation de suppression */}
        <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen} 
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

    </div>
    </>
  )
}

export default App
