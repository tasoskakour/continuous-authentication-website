import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService, AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
    model: any = {};
    loading = false;



    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private authService: AuthenticationService) { }

    ngOnInit() {

        // Acquire my lorem ipsum paragraph
        // this.getMyLoremIpsumParagraphWrapper();
    }

    register() {

        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });

    }


}
