import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/Core/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string;
  password: string;

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    const credentials = { username: this.username, password: this.password };
    this.authService.login(credentials).subscribe(response => {
      // Sauvegardez le token JWT si nécessaire et redirigez vers la page principale
      localStorage.setItem('token', response.token);
      this.router.navigate(['/dashboard']);
    }, error => {
      console.error('Login failed', error);
    });
  }
}
