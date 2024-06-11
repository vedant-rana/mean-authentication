import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(
    private userService: UserService,
    private router: Router,
    private commonService: CommonService,
    private toaster: NgToastService
  ) {}
  // variable to store the users login status
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    //setting the value as user login staus
    this.isLoggedIn = this.commonService.isThereCookie();
    this.commonService.userLoggedIn.subscribe((result) => {
      this.isLoggedIn = result;
    });
  }

  /**
   * @purpose to logout user through service
   * @params none
   * @return void
   */
  logOutUser() {
    this.userService.logoutUser().subscribe({
      next: () => {
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
        // emitting the user login status as false
        this.commonService.userLoggedIn.emit(false);

        //toaster to give success message to user
        this.toaster.success({
          detail: 'SUCCESS',
          summary: 'User logged out successfully',
          duration: 3000,
        });
      },
      error: (err) => {
        // toaster to give error message to user if any error occurs
        this.toaster.error({
          detail: 'ERROR',
          summary: 'Failed to log out',
          duration: 3000,
        });
      },
    });
  }
}
