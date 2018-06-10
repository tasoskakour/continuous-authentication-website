import {Component, OnInit} from "@angular/core";
import { User } from '../_models/index';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';
@Component({
    selector: "topnavbar",
    templateUrl: "top-nav-bar.component.html",
    styleUrls: ['./top-nav-bar.component.css'],

})

export class TopNavBarComponent  {

    currentUser: User;

    constructor(public authService: AuthenticationService, public router: Router) {

    }


}

