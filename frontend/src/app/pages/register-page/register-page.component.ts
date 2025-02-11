import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { UserService } from '../../services/user.service';
import { regiterUserType } from '../../types/userTypes';
import { CommonService } from '../../services/common.service';
import { Router, RouterLink } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatCardTitle,
    MatSelectModule,
    MatRadioModule,
    RouterLink,
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  // injecting required module and services in constructor
  constructor(
    private userService: UserService,
    private commonService: CommonService,
    private router: Router,
    private toaster: NgToastService
  ) {}
  // injecting the FormBuilder to create form group
  formBuilder = inject(FormBuilder);

  //passwordHide and confirmPasswordHide variables to handle visibility of password fields of form
  passwordHide: boolean = true;
  confirmPasswordHide: boolean = true;

  // userRegistrion form Group for HTML form handle
  userRegistration: FormGroup = this.formBuilder.group(
    {
      // name : required, should only contain alphabets and spaces, characters required 2 to 30
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z\s]+$/),
          Validators.minLength(2),
          Validators.maxLength(30),
        ],
      ],

      // email : required, should be a valid email address
      email: ['', [Validators.email, Validators.required]],

      // name : required, should only contain 10 digits
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],

      //gender : required, should contain enum('male', 'female', 'other')
      gender: ['', Validators.required],

      // name : required
      city: ['', Validators.required],

      //password : required, minimum 6 letters required
      password: ['', [Validators.required, Validators.minLength(6)]],

      //confirm password : required, should match with password field
      confirmPassword: ['', Validators.required],
    },
    {
      // custom validator checking both passwords are same or not
      validators: this.passwordMatchValidator,
    }
  );

  /**
   * @purpose to validate password and confirm password is same or not
   * @param formGroup
   * @return void
   */
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }

  // function to handle the visibility of password field on click on eye icon button
  changePasswordVisibility(event: MouseEvent) {
    this.passwordHide = !this.passwordHide;
    event.stopPropagation();
  }

  // function to handle the visibility of confirm password field on click on eye icon button
  changeConfirmPasswordVisibility(event: MouseEvent) {
    this.confirmPasswordHide = !this.confirmPasswordHide;
    event.stopPropagation();
  }

  /**
   * @purpose to submit regitration form data to API through User Service
   * @param none
   * @returns void
   */
  submitUserData() {
    if (this.userRegistration.valid) {
      //creating object of type regiterUserType to send data to API server
      const newUser: regiterUserType = {
        name: this.userRegistration.value.name!,
        email: this.userRegistration.value.email!,
        password: this.userRegistration.value.password!,
        mobile: Number(this.userRegistration.value.mobile!),
        gender: this.userRegistration.value.gender!,
        city: this.userRegistration.value.city!,
      };

      //registering user by sending data to user Service
      this.userService.registerUser(newUser).subscribe({
        next: (data) => {
          this.router.navigate(['/']); // naviagting to home page
          this.commonService.userLoggedIn.emit(true); // emitting userLoggedIn value true to modify header links

          //toaster to give success message to user
          this.toaster.success({
            detail: 'SUCCESS',
            summary: 'User Registered successfully',
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
      console.log('Form validation failed');
    }
  }
}
