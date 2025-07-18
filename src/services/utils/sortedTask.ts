import type { Task } from "../../types/taskType";

/**
 * Fonction pour trier les tâches
 * @param tasks - Liste des tâches à trier
 * @returns Liste triée des tâches
 */
export function sortedTask(tasks: Task[]) {
    return tasks.sort((a, b) => {
        // D'abord, trier par statut (PENDING en haut, DONE en bas)
        if (a.status === 'DONE' && b.status !== 'DONE') return 1;
        if (a.status !== 'DONE' && b.status === 'DONE') return -1;
    
        // Ensuite, trier par date (plus récent en haut)
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
    });
}