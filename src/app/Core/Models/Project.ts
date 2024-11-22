import { ProjectTask } from "./ProjectTask";
import { ProjectUser } from "./ProjectUser";
import { User } from "./User";

export class Project {
    id: string; // Utilisation de GUID
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    projectTasks: ProjectTask[];
    projectUsers: ProjectUser[];
    users?: User[];
  }