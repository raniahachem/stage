import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'app/Core/Services/project.service';
import { Project } from 'app/Core/Models/Project';
import { MatDialog } from '@angular/material/dialog';
import { AssignUsersDialogComponent } from '../assign-users-dialog/assign-users-dialog.component'; // Assurez-vous d'importer correctement
import Swal from 'sweetalert2';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectService: ProjectService, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.getProjectsWithUsers();
  }

  getProjectsWithUsers(): void {
    this.projectService.getProjectsWithUsers().subscribe(
      (projects: Project[]) => {
        this.projects = projects;
        console.log('Projects with users:', this.projects);
      },
      (error) => {
        console.error('Error fetching projects with users:', error);
      }
    );
  }

  viewProjectDetails(id: string): void {
    this.router.navigate(['/projects', id]);
  }

  addProject(): void {
    this.router.navigate(['/add']);
  }

  editProject(id: string): void {
    this.router.navigate(['/projects/edit', id]);
  }

  deleteProject(id: string): void {
    Swal.fire({
      title: 'Are you sure you want to delete this project ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete'
    }).then((result) => {
      if (result.isConfirmed) {
        this.projectService.deleteProject(id).subscribe(
          () => {
            console.log('Project deleted successfully.');
            Swal.fire('Deleted !', 'Project deleted successfully', 'success');
            this.getProjectsWithUsers(); // This refreshes the project list
          },
          (error) => {
            console.error('Error deleting project:', error);
            Swal.fire('Erreur', 'Une erreur est survenue lors de la suppression du projet.', 'error');
          }
        );
      }
    });
  }  

  openAssignUsersModal(project: Project): void {
    const dialogRef = this.dialog.open(AssignUsersDialogComponent, {
      width: '250px',
      data: { projectId: project.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getProjectsWithUsers();
    });
  }
}
