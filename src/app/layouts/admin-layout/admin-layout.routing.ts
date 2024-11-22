import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { ProjectListComponent } from 'app/project-list/project-list.component';
import { ProjectDetailComponent } from 'app/project-detail/project-detail.component';
import { ProjectUserListComponent } from 'app/project-user-list/project-user-list.component';
import { ProjectTaskListComponent } from 'app/project-task-list/project-task-list.component';
import { ProjectFormComponent } from 'app/project-form/project-form.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'upgrade', component: UpgradeComponent },
    { path: 'projects', component: ProjectListComponent },
    { path: 'projects/add', component: ProjectFormComponent },
    { path: 'projects/edit/:id', component: ProjectFormComponent },
    { path: 'projects/:id', component: ProjectDetailComponent },
    { path: 'project-users', component: ProjectUserListComponent },
    { path: 'project-tasks', component: ProjectTaskListComponent },

];
