import { toast } from 'react-toastify';
import axios from 'axios';

interface ErrorResponse {
  message: string;
  statusCode?: number;
}

// Function pour recuperer les erreurs API
export const handleApiError = (
  error: unknown, 
  defaultMessage: string = 'Une erreur est survenue'
): ErrorResponse => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || defaultMessage;
    toast.error(message);
    console.error('API Error:', message);
    return {
      message,
      statusCode: error.response?.status
    };
  }

  
  if (error instanceof Error) {
    toast.error(error.message);
    console.error('Application Error:', error.message);
    return { message: error.message };
  }

  toast.error(defaultMessage);
  console.error('Unknown Error:', error);
  return { message: defaultMessage };
};