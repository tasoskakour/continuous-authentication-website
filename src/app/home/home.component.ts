import { AuthenticationService } from '../_services/authentication.service';
import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';


@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css'],
})

export class HomeComponent implements OnInit {
    username: string;
    constructor(public authService: AuthenticationService) {}
    ngOnInit() {
        if (this.authService.isUserLoggedIn()){
            this.username = JSON.parse(sessionStorage.getItem('currentUser')).username;
        }
    }
}