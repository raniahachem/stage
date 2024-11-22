import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectTaskListComponent } from './project-task-list/project-task-list.component';
import { ProjectUserListComponent } from './project-user-list/project-user-list.component';
import { ProjectService } from './Core/Services/project.service';
import { TaskFormComponent } from './task-form/task-form.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { AssignUsersDialogComponent } from './assign-users-dialog/assign-users-dialog.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatDialogModule,
    MatTooltipModule,
    NgxPaginationModule,
    MatFormFieldModule,
    MatDialogModule

  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    SignupComponent,
    ProjectTaskListComponent,
    ProjectUserListComponent,
    ProjectDetailComponent,
    ProjectListComponent,
    TaskFormComponent,
    ProjectFormComponent,
    AssignUsersDialogComponent,
  ],
  providers: [ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
