import { z } from "zod";

export const todoSchema = z.object({
  title: z.string()
    .min(1, "Le titre est requis")
    .max(100, "Le titre ne doit pas dépasser 100 caractères"),
  description: z.string()
    .min(1, "La description est requise")
    .max(500, "La description ne doit pas dépasser 500 caractères")
    .optional()
});

export type TodoFormData = z.infer<typeof todoSchema>;