import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  private loginUrl = 'http://yourapi.com/login'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  onLogin(): void {
    // this.http.post(this.loginUrl, { username: this.username, password: this.password })
    //   .subscribe({
    //     next: (result) => {
    //       console.log('Login successful', result);
    //       // Handle successful login here (e.g., navigation, storing user data)
    //     },
    //     error: (error) => {
    //       console.error('Login failed', error);
    //       // Handle login errors here
    //       // Example: Showing a snackbar/message to the user
    //       // this.snackbar.open('Login failed. Please try again.', '', { duration: 3000 });
    //     },
    //     complete: () => console.log('Login request completed')
    //   });
  }
  

  onCreateAccount(): void {
    // Handle account creation logic
  }
}
