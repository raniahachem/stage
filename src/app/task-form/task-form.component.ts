import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectTaskService } from 'app/Core/Services/project-task.service';
import { ProjectService } from 'app/Core/Services/project.service';
import { ProjectTask, TaskComplexity } from 'app/Core/Models/ProjectTask';
import { Project } from 'app/Core/Models/Project';
import { User } from 'app/Core/Models/User';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  taskForm: FormGroup;
  isEditMode: boolean = false;
  taskId: string;
  projects: Project[] = [];
  users: User[] = [];
  complexities = Object.keys(TaskComplexity);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private projectTaskService: ProjectTaskService,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      id: ['00000000-0000-0000-0000-000000000000'],
      name: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: [new Date(), Validators.required],
      isCompleted: [{ value: false, disabled: !this.isEditMode }, Validators.required],
      projectId: ['00000000-0000-0000-0000-000000000000', Validators.required],
      userId: ['00000000-0000-0000-0000-000000000000', Validators.required],
      complexity: [TaskComplexity.Medium, Validators.required]
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.taskId = params['id'];
        this.loadTask();
      }
    });

    this.loadProjects();

    this.taskForm.get('projectId').valueChanges.subscribe(projectId => {
      if (projectId) {
        this.loadUsersByProject(projectId);
      } else {
        this.users = [];
      }
    });
  }

  loadTask() {
    this.projectTaskService.getProjectTaskById(this.taskId).subscribe(
      data => {
        this.taskForm.patchValue(data);
        this.taskForm.controls['isCompleted'].enable();
        this.loadUsersByProject(data.projectId);
      },
      error => console.error('Error loading task:', error)
    );
  }

  loadProjects() {
    this.projectService.getProjects().subscribe(
      projects => this.projects = projects,
      error => console.error('Error loading projects:', error)
    );
  }

  loadUsersByProject(projectId: string) {
    this.projectService.getProjectUsers(projectId).subscribe(
      users => this.users = users,
      error => console.error('Error loading users:', error)
    );
  }

  onSubmit() {
    if (this.taskForm.invalid) {
      console.error('Task form is invalid');
      return;
    }

    const taskData: ProjectTask = this.taskForm.value;
    console.log('Submitting task data:', taskData);

    if (!this.isEditMode) {
      taskData.isCompleted = false;
    }

    if (this.isEditMode) {
      this.projectTaskService.updateProjectTask(taskData).subscribe(
        () => this.router.navigate(['/project-tasks']),
        error => console.error('Error updating task:', error)
      );
    } else {
      this.projectTaskService.addProjectTask(taskData).subscribe(
        () => this.router.navigate(['/project-tasks']),
        error => console.error('Error adding task:', error)
      );
    }
  }
}
