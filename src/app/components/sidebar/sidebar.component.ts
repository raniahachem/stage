import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare const $: any;

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  { path: '/projects', title: 'Projects', icon: 'content_paste', class: '' },
  { path: '/project-tasks', title: 'Project Tasks', icon: 'library_books', class: '' },
  { path: '/notifications', title: 'Notifications', icon: 'notifications', class: '' },
  { path: '/logout', title: 'Log out', icon: 'exit_to_app', class: 'logout' }, // Spécifique pour Log out
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private router: Router) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }

  isMobileMenu() {
    return $(window).width() <= 991;
  }

  logout(): void {
    Swal.fire({
      title: 'Are you sure you want to log out?',
      text: "You will be redirected to the login page.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // Effacez les données utilisateur locales
        localStorage.clear();
        console.log('User logged out');

        // Redirection vers la page de connexion
        this.router.navigate(['/login']);
        Swal.fire('Logged out!', 'You have been successfully logged out.', 'success');
      }
    });
  }
}
