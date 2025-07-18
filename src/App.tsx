import TaskList from './components/TaskList'
import TodoForm from './components/TodoForm'
import DeleteConfirmationDialog from './components/DeleteConfirmationDialog'
import TodoStats from './components/TaskStats'
import type { TodoFormData } from './schemas/taskSchema'
import TodoDetailModal from './components/TodoDetailModal'
import { FaPenNib } from 'react-icons/fa'
import { useTasks } from './hooks/useTasks'
import { useState } from 'react'
import { sortedTask } from './services/utils/sortedTask'


function App() {

  const [editingId, setEditingId] = useState<number | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [todoToDelete, setTodoToDelete] = useState<number | null>(null)
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);

    const {
    tasks,
    isLoading,
    error,
    addTask,
    updateStatus,
    updateTask,
    deleteTask,
  } = useTasks();

  // Utilisation de TanStack Query pour récupérer les détails d'une tâche
const { data: selectedTodo, isLoading: isLoadingTodo, isError } = useTasks().useTask(selectedTodoId);

  // Fonction pour ajouter une tâche
  // Utilisation de TanStack Query pour ajouter une tâche
const addTodo = async (data: TodoFormData) => { 

  try {
      await addTask(data);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la tâche:", error);
    }
};

  // Fonction pour basculer le statut d'une tâche
const toggleComplete = async (id: number) => {
    const todo = tasks.find(t => t.id === id);
    if (!todo) return;
    const newStatus = todo.status === 'DONE' ? 'PENDING' : 'DONE';
    await updateStatus({id, status:newStatus});
};

  // Fonction pour sauvegarder les modifications d'une tâche en cours d'édition
  const saveEdit = async() => {
    if (editTitle.trim() !== "" && editingId !== null) {
      const existingTask = tasks.find(t => t.id === editingId);
      if (!existingTask) return;
      await updateTask({
        id: editingId,
        task: {
          id: editingId,
          title: editTitle.trim(),
          description: editDescription.trim(),
          status: "PENDING",
          createdAt: existingTask.createdAt
        }
      });
      setEditingId(null)
      setEditTitle("")
      setEditDescription("")
    }
  }

  // Fonction pour confirmer la suppression d'une tâche
    const confirmDelete =async () => {
    if (todoToDelete !== null) {
      await deleteTask(todoToDelete)
      setDeleteDialogOpen(false)
      setTodoToDelete(null)
    }
  }


  const handleTodoClick = (id: number) => {
    setSelectedTodoId(id);
    setIsDetailModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsDetailModalOpen(false);
    setSelectedTodoId(null);
  };


  const openDeleteDialog = (id: number) => {
    setTodoToDelete(id)
    setDeleteDialogOpen(true)
  }



  const cancelDelete = () => {
    setDeleteDialogOpen(false)
    setTodoToDelete(null)
  }



  const startEditing = (id: number, title: string, description: string) => {
    setEditingId(id)
    setEditTitle(title)
    setEditDescription(description)
  }



  const cancelEdit = () => {
    setEditingId(null)
    setEditTitle("")
    setEditDescription("")
  }

  const selectTodo = (id: number) => {
    setSelectedTodoId(selectedTodoId === id ? null : id)
  }

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

          <TodoForm 
              addTodo={addTodo}
          />
        </div>
          {/* Liste des todos */}
         { isLoading && <h2 className='text-xl animate-pulse'>Loading...</h2>}
         {error && <h2>Error: {error}</h2>}
          <TaskList
            todos={sortedTask(tasks)}
            onTodoClick={handleTodoClick}
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
