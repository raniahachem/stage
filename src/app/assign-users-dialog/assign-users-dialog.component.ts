import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectUserService } from 'app/Core/Services/project-user.service';
import { ProjectService } from 'app/Core/Services/project.service';
import { User } from 'app/Core/Models/User';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assign-users-dialog',
  templateUrl: './assign-users-dialog.component.html',
  styleUrls: ['./assign-users-dialog.component.css']
})
export class AssignUsersDialogComponent {
  unassignedUsers: User[] = [];
  selectedUser: User | null = null;

  constructor(
    public dialogRef: MatDialogRef<AssignUsersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { projectId: string },
    private projectUserService: ProjectUserService,
    private projectService: ProjectService
  ) {
    this.loadUnassignedUsers();
  }

  loadUnassignedUsers(): void {
    this.projectUserService.getUsersNotAssignedToProject(this.data.projectId).subscribe(
      (users: User[]) => {
        this.unassignedUsers = users;
      },
      (error) => {
        console.error('Error fetching unassigned users:', error);
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectUser(user: User): void {
    this.selectedUser = user;
  }

  isSelected(user: User): boolean {
    return this.selectedUser === user;
  }

  assignUser(): void {
    if (!this.selectedUser) {
      console.error('No user selected.');
      return;
    }

    const projectUser = {
      projectId: this.data.projectId,
      userId: this.selectedUser.id
    };

    this.projectUserService.assignUserToProject(this.data.projectId, projectUser).subscribe(
      () => {
        console.log('User assigned successfully.');
        Swal.fire({
          icon: 'success',
          title: 'User assigned successfully',
        });
        this.projectService.notifyProjectUpdated(); // Notify that the project was updated
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error assigning user:', error);
        Swal.fire('Erreur', 'Une erreur est survenue lors de l\'assignation de l\'utilisateur.', 'error');
      }
    );
  }
}
