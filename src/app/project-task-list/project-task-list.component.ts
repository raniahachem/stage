import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectTaskService } from 'app/Core/Services/project-task.service';
import { ProjectTask, TaskComplexity } from 'app/Core/Models/ProjectTask';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-project-task-list',
  templateUrl: './project-task-list.component.html',
  styleUrls: ['./project-task-list.component.css']
})
export class ProjectTaskListComponent implements OnInit {
  projectTasks: ProjectTask[] = [];
  todayTasks: ProjectTask[] = [];
  showTodayTasks: boolean = false;

  constructor(
    private projectTaskService: ProjectTaskService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getProjectTasks();
  }

  getProjectTasks(): void {
    this.projectTaskService.getProjectTasks().subscribe(
      (tasks: ProjectTask[]) => {
        this.projectTasks = tasks;
        this.todayTasks = this.filterTodayTasks(tasks);
      },
      (error) => {
        console.error('Error fetching project tasks:', error);
      }
    );
  }

  filterTodayTasks(tasks: ProjectTask[]): ProjectTask[] {
    const today = new Date().setHours(0, 0, 0, 0);
    return tasks.filter(task => new Date(task.dueDate).setHours(0, 0, 0, 0) === today);
  }

  toggleShowTodayTasks(): void {
    this.showTodayTasks = !this.showTodayTasks;
  }

  updateTaskCompletion(task: ProjectTask, event: any): void {
    const isCompleted = event.target.checked;
  
    // Convertir la complexité en entier
    const complexityAsEnum = task.complexity === TaskComplexity.Low
      ? 0
      : task.complexity === TaskComplexity.Medium
      ? 1
      : 2;
  
    // Créer un objet avec les modifications nécessaires
    const updatedTask: ProjectTask = {
      ...task,
      isCompleted: isCompleted,
      complexity: complexityAsEnum // Converti en entier
    };
  
    console.log('Données envoyées au backend pour mise à jour :', updatedTask);
  
    // Appeler le service pour mettre à jour la tâche
    this.projectTaskService.updateProjectTask(updatedTask).subscribe(
      () => {
        task.isCompleted = isCompleted; // Mise à jour locale après succès
        console.log('Task updated successfully.');
      },
      (error) => {
        console.error('Error updating task:', error);
      }
    );
  }
  
  deleteTask(taskId: string): void {
    this.projectTaskService.deleteProjectTask(taskId).subscribe(
      () => {
        this.projectTasks = this.projectTasks.filter(task => task.id !== taskId);
        this.todayTasks = this.todayTasks.filter(task => task.id !== taskId);
        console.log('Task deleted successfully.');
        Swal.fire({
          icon: 'success',
          title: 'Tâche supprimée avec succès',
        });
      },
      (error) => {
        console.error('Error deleting task:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur lors de la suppression de la tâche',
          text: error.message,
        });
      }
    );
  }

  navigateToAddTask(): void {
    this.router.navigate(['/project-tasks/add']);
  }

  getTaskComplexityText(complexity: TaskComplexity): string {
    return TaskComplexity[complexity];
  }
  
}
