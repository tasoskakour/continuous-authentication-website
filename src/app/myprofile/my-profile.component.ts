import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { AlertService } from '../_services/alert.service';




@Component({
    selector: "myprofile",
    templateUrl: "my-profile.component.html",
    styleUrls: ['./my-profile.component.css'],
})

export class MyProfileComponent implements OnInit {

    // User class
    currentUser = new User;
    userEditedFlag = false;

    // Keystroke Profile Class
    keystrokeProfileStatistics: any
    loadingProfile = true;
    dataAvailable = false;


    constructor(private router: Router, private userService: UserService, private alertService: AlertService) { }

    // This will be executed on init.
    ngOnInit() {

        // Get the current user from local storage
        const localStor = JSON.parse(sessionStorage.getItem('currentUser'));

        this.currentUser.username = localStor.username;
        this.currentUser.id = localStor._id;
        this.currentUser.firstname = localStor.firstname;
        this.currentUser.lastname = localStor.lastname;
        this.currentUser.date = this.formatMyDate(localStor.date);
        // console.log(this.currentUser.date);
        // console.log(localStor);

        // Load Keystroke Profile
        this.getKeystrokeProfileWrapper();


        //FAKE STOIXEIA
        // this.currentUser.username = "deagle";
        // this.currentUser.id = 1234123;
        // this.currentUser.firstname = 'Tasos';
        // this.currentUser.lastname  = 'Kakouris';
        // this.currentUser.date = '2342342';




    }

    //
    editProfileSubmit() {
        console.log('kalw tin update');
        this.userService.update(this.currentUser).subscribe(
            data => {
                console.log('data=');
                console.log(JSON.stringify(data));
                if (data.success) {
                    this.alertService.success('User Updated!');
                    this.userEditedFlag = false;
                } else {
                    // peta ton eksw
                    if (data.val === 'notok' || data.val === 'failtok') { this.router.navigate(['/login']); };
                    alert('You are not Logged in!');
                }
            });
    }

    //
    onChange() {
        this.userEditedFlag = true;
    }

    // Keystroke Profile Wrapper
    getKeystrokeProfileWrapper() {
        // Get the Keystroke Profile Data of the User
        this.userService.getKeystrokeProfile(this.currentUser.username)
            .subscribe(
            data => {
                this.loadingProfile = false;
                // console.log(data);
                if (data.success) {
                    console.log('mpika sto data success');
                    this.keystrokeProfileStatistics = data.keyprofile.statistics;
                    console.log('Client: Keystroke Profile Loaded');
                    console.log(this.keystrokeProfileStatistics);
                    this.dataAvailable = true;
                } else {
                    this.dataAvailable = false;
                }
            },
            error => {
                console.log('ERORRRR _> ' + error);
            });
    }

    // Formats date to DAYS-MONTHS-YEAR
    // dateStr is in : "2017-07-17T18:19:31.527Z"
    formatMyDate(dateStr: string) {
        return dateStr.substring(0, dateStr.indexOf('T'));
    }


    // deleteUser(id: number) {
    //     this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    // }

    // private loadAllUsers() {
    //     this.userService.getAll().subscribe(users => { this.users = users; });
    // }

}

