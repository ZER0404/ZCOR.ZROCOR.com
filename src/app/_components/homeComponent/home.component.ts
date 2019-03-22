// import { Component, OnInit , OnDestroy  } from '@angular/core';
// // import { User } from '../../_models';
// // import { Subscription } from 'rxjs';
// // // import { first } from 'rxjs/operators';
// // import { AuthenticationService, UserService } from '../../_services';


// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent  {
//   // currentUser: User;
//   // currentUserSubscription: Subscription;
//   // // users: User[] = [];


//   constructor( ) {


//     }




// }
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/_models';
import { AuthenticationService } from './../../_services/authentication.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
// import { flattenStyles } from '@angular/platform-browser/src/dom/dom_renderer';
import { AlertService } from './../../_services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {


  currentUser: User;
  currentUserSubscription: Subscription;


  constructor(private authenticationService: AuthenticationService,
    private router: Router, private alertService: AlertService) {

    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
      user => {
        this.currentUser = user;
      });
  }



  onLogout() {
    this.authenticationService.logout();
    this.alertService.success(`successfully logout`);

    this.alertService.clear();


  }

  ngOnInit() {




  }
  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();

  }

}






