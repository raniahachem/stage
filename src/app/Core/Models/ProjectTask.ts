export class ProjectTask {
  id: string; // Utilisation de GUID
  name: string;
  description: string;
  dueDate: Date;
  isCompleted: boolean;
  projectId: string; // Utilisation de GUID
  userId: string; // Utilisation de GUID
  complexity: number; // Converti en nombre pour correspondre au backend
}

export enum TaskComplexity {
  Low = 0,
  Medium = 1,
  High = 2
}
