import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { ProjectTask, TaskComplexity } from '../Models/ProjectTask';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectTaskService {

  private apiUrl = `${environment.ProjectTrackerMicroservice}/projecttasks`;

  constructor(private http: HttpClient) { }

  getProjectTasks(): Observable<ProjectTask[]> {
    return this.http.get<ProjectTask[]>(this.apiUrl);
  }

  getProjectTaskById(id: string): Observable<ProjectTask> {
    return this.http.get<ProjectTask>(`${this.apiUrl}/${id}`);
  }

  addProjectTask(task: ProjectTask): Observable<ProjectTask> {
    return this.http.post<ProjectTask>(this.apiUrl, task);
  }  

  updateProjectTask(task: ProjectTask): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${task.id}`, task);
  }  

  deleteProjectTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
