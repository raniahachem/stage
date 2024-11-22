import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'app/Core/Services/project.service';
import { Project } from 'app/Core/Models/Project';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  project: Project;
  private projectUpdateSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const projectId = params['id'];
      this.loadProjectDetails(projectId);
    });

    this.projectUpdateSubscription = this.projectService.getProjectUpdatedObservable().subscribe(() => {
      if (this.project) {
        this.loadProjectDetails(this.project.id);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.projectUpdateSubscription) {
      this.projectUpdateSubscription.unsubscribe();
    }
  }

  loadProjectDetails(id: string): void {
    this.projectService.getProjectDetailsWithUsersAndTasks(id).subscribe(
      (data: Project) => {
        this.project = data;
        console.log('Project loaded:', this.project);
      },
      error => console.error('Error loading project details:', error)
    );
  }

  editProject(): void {
    if (this.project) {
      this.router.navigate(['/projects/edit', this.project.id]);
    }
  }
}
