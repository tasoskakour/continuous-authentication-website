import { Component } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';


@Component({
    templateUrl: 'learnmore.component.html',
    styleUrls: ['learnmore.component.css'],
})

export class LearnmoreComponent  {
    constructor (public authService: AuthenticationService){

    }
}

