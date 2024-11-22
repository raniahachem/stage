import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'app/Core/Services/project.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

  projectForm: FormGroup;
  isEditMode: boolean = false;
  projectId: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      id: ['00000000-0000-0000-0000-000000000000'],
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required]
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.projectId = params['id'];
        this.loadProject();
      } else {
        this.isEditMode = false;
        this.projectId = null;
        this.projectForm.reset({
          id: '00000000-0000-0000-0000-000000000000',
          name: '',
          description: '',
          startDate: new Date(),
          endDate: new Date()
        });
      }
    });
  }

  loadProject() {
    this.projectService.getProject(this.projectId).subscribe(
      data => this.projectForm.patchValue(data),
      error => console.error('Error loading project:', error)
    );
  }

  onSubmit() {
    if (this.isEditMode) {
      // Logic for updating an existing project
      this.projectService.updateProject(this.projectId, this.projectForm.value).subscribe(
        () => {
          console.log('Project updated successfully.');
          Swal.fire({
            icon: 'success',
            title: 'Projet mis à jour avec succès',
          }).then(() => {
            this.router.navigate(['/projects']);
          });
        },
        error => {
          console.error('Error updating project:', error);     
        }
      );
    } else {
      // Logic for adding a new project
      this.projectService.addProject(this.projectForm.value).subscribe(
        () => {
          console.log('Project added successfully.');
          Swal.fire({
            icon: 'success',
            title: 'Projet ajouté avec succès',
          }).then(() => {
            this.router.navigate(['/projects']);
          });
        },
        error => {
          console.error('Error adding project:', error);
        }
      );
    }
  }
}  