import { useEffect, useState } from 'react'
import { IoAlertCircleOutline } from 'react-icons/io5'

import TaskList from './components/TaskList'
import TodoForm from './components/TodoForm'
import TodoDetailPanel from './components/TodoDetailPanel'
import DeleteConfirmationDialog from './components/DeleteConfirmationDialog'
import TodoStats from './components/TaskStats'
import type { Task } from './types/taskType'
import { useTaskStore } from './store/taskStore'

function App() {
  const {tasks,fetchTasks,updateTask,updateTaskStatus, addTask, deleteTask, isLoading, error} = useTaskStore();
  // const [todos, setTodos] = useState<Task | []>([])
  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [todoToDelete, setTodoToDelete] = useState<number | null>(null)
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null)
console.log("tasttt", tasks)

const addTodo = async () => {
    if (!newTitle.trim() || !newDescription.trim()) return;
    
    const task: Omit<Task, 'id'> = {
        // id: Date.now(), // temporaire si pas de backend
        title: newTitle.trim(),
        description: newDescription.trim(),
        status: "PENDING",
        // createdAt: new Date(),
    };
    await addTask(task);
    setNewTitle("");
    setNewDescription("");
};

  useEffect(()=>{
    fetchTasks()
  },[fetchTasks]);

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
      // setTodos(
      //   todos.map((todo) =>
      //     todo.id === editingId ? { ...todo, title: editTitle.trim(), description: editDescription.trim() } : todo,
      //   ),
      // )
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

  // const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
  //   if (e.key === "Enter") {
  //     action()
  //   }
  // }
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }
  return (
    <>
    <div className="max-w-2xl border border-gray-400 w-full mx-auto p-6 flex-col my-auto justify-center border-md rounded-md">
      <div className="mb-6">
        <div className="flex items-center justify-center mx-auto gap-2 mb-4">
          <IoAlertCircleOutline className="w-6 h-6 md:block hidden"/>
          <h1 className="text-2xl font-bold text-center">Gestion des Tâches - Équipe Interne</h1>
        </div>
        
        <div className="border-dashed border  border-gray-500 rounded-md p-3 space-y-6">
          {/* Formulaire d'ajout */}
          <h2 className='font-semibold text-xl'>Nouvelle tâche</h2>

          <TodoForm 
              newTitle={newTitle}
              setNewTitle={setNewTitle}
              newDescription={newDescription}
              setNewDescription={setNewDescription}
              addTodo={addTodo}
          />
        </div>
          {/* Liste des todos */}
          <TaskList
            todos={tasks}
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
          {selectedTodoId && (
            <TodoDetailPanel
              selectedTodo={tasks?.find((t) => t.id === selectedTodoId)}
              setSelectedTodoId={setSelectedTodoId}
              formatDate={formatDate}
            />
          )}

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
