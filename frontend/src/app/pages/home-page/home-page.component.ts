import { Component } from '@angular/core';
import { regiterUserType } from '../../types/userTypes';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  //userData variable to display data to ui
  userData: regiterUserType | undefined;

  // injecting required module and services in constructor
  constructor(private _userService: UserService) {}

  ngOnInit() {
    // calling getUserData() method to load user data
    this.getUserData();
  }

  /**
   * @purpose to load user Data from API server and setting it to userData
   * @param none
   * @returns void
   */
  getUserData() {
    this._userService.getUserData().subscribe({
      next: (user: any) => {
        this.userData = user.data.user;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
