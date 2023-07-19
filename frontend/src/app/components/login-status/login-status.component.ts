import { Component, Inject } from '@angular/core';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css'],
})
export class LoginStatusComponent {
  isAuthenticated: boolean = false;
  userFullName: string = '';

  storage: Storage = sessionStorage

  constructor(
    private oktaAuthService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth
  ) {}

  ngOnInit(): void {
    // subscribe to authentication state change
    this.oktaAuthService.authState$.subscribe((result) => {
      this.isAuthenticated = result.isAuthenticated!;
      console.log(this.isAuthenticated);
      this.getUserDetails();
    });
  }

  getUserDetails() {
    if (this.isAuthenticated) {
      // fetch the logged in user details(user's claims)
      // user full name is exposed as a property name
      this.oktaAuth.getUser().then((res) => {
        this.userFullName = res.name as string;

        // retrieve the user's email from authentication response
        const theEmail = res.email

        // now store the email in browser
        this.storage.setItem('userEmail', JSON.stringify(theEmail))
      });
    }
  }

  logout() {
    // terminates the session with Okta & also remove current tokens
    this.oktaAuth.signOut();
  }
}
