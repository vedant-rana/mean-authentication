import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule, MatCardTitle } from '@angular/material/card';
import { UserService } from '../../services/user.service';
import { loginUserType } from '../../types/userTypes';
import { Router, RouterLink } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatCardTitle,
    RouterLink,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  //passwordHide variable to handle visibility of password field of form
  passwordHide: boolean = true;

  // injecting required module and services in constructor
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private commonService: CommonService,
    private toaster: NgToastService
  ) {}

  // userLogin form Group for HTML form handle
  userLogin = this.fb.group({
    // email : required, should be a valid email address
    email: ['', [Validators.required, Validators.email]],

    // password : required, should be atleast 6 characters long
    password: ['', Validators.required],
  });

  // function to handle visibility of password field of form
  changePasswordVisibility(event: MouseEvent) {
    this.passwordHide = !this.passwordHide;
    event.stopPropagation();
  }

  /**
   * @purpose to submit login form data to API through User Service
   * @param none
   * @returns void
   */
  submitLoginData() {
    if (this.userLogin.valid) {
      //creating object of type loginUserType to send data to API server
      const loginUserData: loginUserType = {
        email: this.userLogin.value.email!,
        password: this.userLogin.value.password!,
      };

      //registering user by sending data to user Service
      this.userService.loginUser(loginUserData).subscribe({
        next: (data) => {
          this.router.navigate(['/']); // naviagting to home page
          this.commonService.userLoggedIn.emit(true);

          //toaster to give success message to user
          this.toaster.success({
            detail: 'SUCCESS',
            summary: 'User logged in successfully',
            duration: 3000,
          });
        },
        error: (err) => {
          // toaster to give error message to user if any error occurs
          this.toaster.error({
            detail: 'ERROR',
            summary: err.error.message,
            duration: 3000,
          });
        },
      });
    } else {
      console.log('User Validation Failed');
    }
  }
}
