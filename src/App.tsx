import { useEffect, useState } from 'react'
import { IoAlertCircleOutline } from 'react-icons/io5'

import TaskList from './components/TaskList'
import TodoForm from './components/TodoForm'
// import TodoDetailPanel from './components/TodoDetailPanel'
import DeleteConfirmationDialog from './components/DeleteConfirmationDialog'
import TodoStats from './components/TaskStats'
import { useTaskStore } from './store/taskStore'
import type { TodoFormData } from './schemas/taskSchema'
import { useQuery } from '@tanstack/react-query'
import TodoDetailModal from './components/TodoDetailModal'
import { FaPenNib } from 'react-icons/fa'


function App() {
  const {tasks,fetchTasks,getTask,updateTask,updateTaskStatus, addTask, deleteTask, isLoading, error} = useTaskStore();

  const [editingId, setEditingId] = useState<number | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [todoToDelete, setTodoToDelete] = useState<number | null>(null)
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);


const addTodo = async (data: TodoFormData) => { 

  try {
      await addTask({
        title: data.title.trim(),
        description: data.description?.trim() || '',
        status: 'PENDING'
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout de la tâche:", error);
    }
};

  // Utilisation de TanStack Query pour récupérer les détails d'une tâche
const { data: selectedTodo, isLoading: isLoadingTodo, isError } = useQuery({
    queryKey: ['task', selectedTodoId],
    queryFn:async () =>{
      try{
         const data =await getTask(selectedTodoId as number )
        return data
      }catch(err){
        console.log(err)
      }
    },
    enabled: !!selectedTodoId,
    retry: false,
});
// const { data: selectedTodo, isLoading: isLoadingTodo, isError } = useQuery({
//     queryKey: ['task', selectedTodoId],
//     queryFn: async () => {
//       if (!selectedTodoId) {
//         throw new Error('No task ID provided');
//       }
      
//       try {
//         const data = await getTask(selectedTodoId);
//         if (!data) {
//           throw new Error('Task not found');
//         }
//         return data; 
//       } catch (error) {
//         console.error('Error fetching task:', error);
//         throw error; // Re-throw the error for proper error handling
//       }
//     },
//     enabled: !!selectedTodoId,
//     retry: false,
// }
// )
// ;
console.log("Selected Todo:", selectedTodo);
console.log("Selected Todo ID:", selectedTodoId);



  const handleTodoClick = (id: number) => {
    setSelectedTodoId(id);
    setIsDetailModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsDetailModalOpen(false);
    setSelectedTodoId(null);
  };

  useEffect(()=>{
    fetchTasks()
  },[fetchTasks]);

// fonction de tri par status et par date
const sortedTasks = [...tasks].sort((a, b) => {
  // D'abord, trier par statut (PENDING en haut, DONE en bas)
  if (a.status === 'DONE' && b.status !== 'DONE') return 1;
  if (a.status !== 'DONE' && b.status === 'DONE') return -1;

  // Ensuite, trier par date (plus récent en haut)
  const dateA = new Date(a.createdAt).getTime();
  const dateB = new Date(b.createdAt).getTime();
  return dateB - dateA;
});


  const openDeleteDialog = (id: number) => {
    setTodoToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (todoToDelete !== null) {
      console.log("todo delete",todoToDelete)
      deleteTask(todoToDelete)
      setDeleteDialogOpen(false)
      setTodoToDelete(null)
    }
  }

  const cancelDelete = () => {
    setDeleteDialogOpen(false)
    setTodoToDelete(null)
  }

const toggleComplete = async (id: number) => {
    const todo = tasks.find(t => t.id === id);
    if (!todo) return;
    const newStatus = todo.status === 'DONE' ? 'PENDING' : 'DONE';
    await updateTaskStatus(id, newStatus);
};

  const startEditing = (id: number, title: string, description: string) => {
    setEditingId(id)
    setEditTitle(title)
    setEditDescription(description)
  }

  const saveEdit = async() => {
    if (editTitle.trim() !== "" && editingId !== null) {
     await updateTask(editingId,{
      id: editingId,
      title: editTitle.trim(), 
      description: editDescription.trim(), 
      status: "PENDING"
     })
      setEditingId(null)
      setEditTitle("")
      setEditDescription("")
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditTitle("")
    setEditDescription("")
  }

  const selectTodo = (id: number) => {
    setSelectedTodoId(selectedTodoId === id ? null : id)
  }




// Replace the existing formatDate function with this one:
const formatDate = (dateString: string | Date) => {
  try {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'Date invalide';
    }

    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Date invalide';
  }
};
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
            todos={sortedTasks}
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
            formatDate={formatDate}
            />


          {/* Panneau de détails de la todo sélectionnée */}
<TodoDetailModal
  isOpen={isDetailModalOpen}
  onClose={handleCloseModal}
  selectedTodo={selectedTodo}
  formatDate={formatDate}
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
