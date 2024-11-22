import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { ProjectUser } from '../Models/ProjectUser';
import { Observable } from 'rxjs';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class ProjectUserService {
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.UserMicroservice}/users`);
  }

  getUsersNotAssignedToProject(projectId: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.ProjectTrackerMicroservice}/projectusers/notassigned/${projectId}`);
  }

  assignUserToProject(projectId: string, projectUser: ProjectUser): Observable<void> {
    const payload = projectUser;
    return this.http.post<void>(`${environment.ProjectTrackerMicroservice}/projectusers`, payload);
  }
}
