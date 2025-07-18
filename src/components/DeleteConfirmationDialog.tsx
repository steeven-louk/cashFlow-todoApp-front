import React from 'react';

interface DeleteConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void; // Pour la gestion de l'état d'ouverture externe
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-[#3d2a2a80] flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
        <h3 className="text-lg font-semibold mb-2">Confirmer la suppression</h3>
        <p className="text-sm text-gray-600 mb-4">
          Êtes-vous sûr de vouloir supprimer cette tâche ? Cette action est irréversible.
        </p>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => { onCancel(); onOpenChange(false); }}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={() => { onConfirm(); onOpenChange(false); }}
            className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 cursor-pointer"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationDialog;