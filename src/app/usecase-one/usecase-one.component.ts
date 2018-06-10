import {  Component } from '@angular/core';
import { Router } from '@angular/router';
declare var jQuery: any;


@Component({
    templateUrl: 'usecase-one.component.html',
    styleUrls: ['./usecase-one.component.css'],
})

export class UsecaseOneComponent  {
    loading = false;
    model: any = {};

    constructor(private router: Router){}

    placeOrder(keystrokeBoxIsValid) {
        // this.loading = true;
        // alert('Thanks for your time! \n Click OK to be redirected to Use Case 2.');
        if (!this.checkUserInfo()) {
            return;
        }
        console.log(keystrokeBoxIsValid);
        if (keystrokeBoxIsValid === true) {
            jQuery('#myModal1').modal('toggle');
            const that = this;
            setTimeout(function(){
                jQuery('#myModal1').modal('hide');
                that.router.navigate(['ucase2']);
            }, 1000 );
        }
    }

    checkUserInfo() {
        if (this.model.address === undefined) {return false; }else {if (this.model.address === '') { return false; }}
        if (this.model.cardcode === undefined) {return false; }else {if (this.model.cardcode === '') { return false; }}
        if (this.model.cardnumber === undefined) {return false; }else {if (this.model.cardnumber === '') { return false; }}
        if (this.model.city === undefined) {return false; }else {if (this.model.city === '') { return false; }}
        if (this.model.country === undefined) {return false; }else {if (this.model.country === '') { return false; }}
        if (this.model.emailaddress === undefined) {return false; }else {if (this.model.emailaddress === '') { return false; }}
        if (this.model.first_name === undefined) {return false; }else {if (this.model.first_name === '') { return false; }}
        if (this.model.last_name === undefined) {return false; }else {if (this.model.last_name === '') { return false; }}
        if (this.model.phonenumber === undefined) {return false; }else {if (this.model.phonenumber === '') { return false; }}
        if (this.model.state === undefined) {return false; }else {if (this.model.state === '') { return false; }}
        if (this.model.zipcode === undefined) {return false; }else {if (this.model.zipcode === '') { return false; }}
        return true;

    }
}

