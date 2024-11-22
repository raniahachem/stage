import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Project } from '../Models/Project';
import { BehaviorSubject, Observable, catchError, forkJoin, map, of, switchMap, throwError } from 'rxjs';
import { ProjectUser } from '../Models/ProjectUser';
import { User } from '../Models/User';
import { ProjectTask } from '../Models/ProjectTask';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  
  private apiUrl = `${environment.ProjectTrackerMicroservice}/projects`;
  private projectUpdatedSubject = new BehaviorSubject<void>(null);

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching projects:', error);
          return throwError(error);
        })
      );
  }

  getProject(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching project:', error);
          return throwError(error);
        })
      );
  }

  getProjectsWithUsers(): Observable<Project[]> {
    return this.getProjects().pipe(
      switchMap((projects: Project[]) => {
        const projectObservables: Observable<Project>[] = projects.map(project => {
          return this.getProjectUsers(project.id).pipe(
            switchMap((projectUsers: User[]) => {
              project.users = projectUsers;
              return of(project);
            }),
            catchError((error) => {
              console.error('Error fetching project users:', error);
              return throwError(error);
            })
          );
        });
        return forkJoin(projectObservables);
      })
    );
  }

  getProjectUsers(projectId: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.ProjectTrackerMicroservice}/projectusers/${projectId}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching project users:', error);
          return throwError(error);
        })
      );
  }

  getProjectDetailsWithUsersAndTasks(projectId: string): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${projectId}`).pipe(
      switchMap((project: Project) => {
        const projectUsers$ = this.getProjectUsers(projectId).pipe(
          catchError((error) => {
            console.error('Error fetching project users:', error);
            return of([]); // Return an empty array in case of error
          })
        );
        const projectTasks$ = this.getProjectTasks(projectId).pipe(
          catchError((error) => {
            console.error('Error fetching project tasks:', error);
            return of([]); // Return an empty array in case of error
          })
        );
        return forkJoin([projectUsers$, projectTasks$]).pipe(
          map(([users, tasks]) => {
            project.users = users;
            project.projectTasks = tasks;
            return project;
          })
        );
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching project details:', error);
        return throwError(error);
      })
    );
  }

  private getProjectTasks(projectId: string): Observable<ProjectTask[]> {
    return this.http.get<ProjectTask[]>(`${environment.ProjectTrackerMicroservice}/projecttasks/byprojectid/${projectId}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching project tasks:', error);
          return throwError(error);
        })
      );
  }

  private getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${environment.UserMicroservice}/users/${userId}`);
  }

  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}`, project)
      .pipe(
        catchError((error: any) => {
          console.error('Error adding project:', error);
          return throwError(error);
        })
      );
  }

  getTotalProjects(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching total projects:', error);
          return throwError(error);
        })
      );
  }

  getTotalNotCompletedTasks(): Observable<number> {
    return this.http.get<number>(`${environment.ProjectTrackerMicroservice}/projecttasks/incomplete/count`)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching incomplete tasks count:', error);
          return throwError(error);
        })
      );
  }

  getTasksChartData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/tasks/chart-data`)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching tasks chart data:', error);
          return throwError(error);
        })
      );
  }

  updateProject(id: string, project: Project): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, project)
      .pipe(
        catchError((error: any) => {
          console.error('Error updating project:', error);
          return throwError(error);
        })
      );
  }

  getProjectUpdatedObservable(): Observable<void> {
    return this.projectUpdatedSubject.asObservable();
  }

  notifyProjectUpdated(): void {
    this.projectUpdatedSubject.next();
  }

  deleteProject(id: string): Observable<Project> {
    return this.http.delete<Project>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error deleting project:', error);
          return throwError(error);
        })
      );
  }
}
