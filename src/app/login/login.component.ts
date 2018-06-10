﻿import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../_services/index';



@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) { }

    ngOnInit() {


        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    }

    login(validKeystrokeAuthBox) {
        if (validKeystrokeAuthBox === true) {
            this.loading = true;
            this.authenticationService.login(this.model.username, this.model.password)
                .subscribe(
                data => {
                    if (data.success) {
                        // this._router.navigate(['Welcome']);
                        this.router.navigate([this.returnUrl]);
                    } else {
                        this.alertService.error(data.message);
                        this.loading = false;
                    }

                });
        }
    }





}




// GIA NA KANW EXPERIMENT MONO FRONT END:
// GRAMMES 27-30-33

