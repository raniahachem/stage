import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/Core/Services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onRegister() {
    if (this.signupForm.valid) {
      const user = this.signupForm.value;
      this.authService.register(user).subscribe(response => {
        console.log('User registered successfully');
        this.router.navigate(['/login']);
      }, error => {
        console.error('Registration failed', error);
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
