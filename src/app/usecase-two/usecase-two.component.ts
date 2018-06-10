import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/index';
import { Router } from '@angular/router';
declare var jQuery: any;

@Component({
    templateUrl: 'usecase-two.component.html',
    styleUrls: ['./usecase-two.component.css'],
})

export class UsecaseTwoComponent implements OnInit{


    // Images stuff
    imgsrc = '';

    imgsrcArr = []; // 1.jpeg, 2.jpeg ..... IMAGES_LENGTH.jpeg
    IMAGES_LENGTH = 70;

    // The written description of the user to the textarea
    textAreaImgDescr = '' ;

    constructor(private authService: AuthenticationService, private router: Router) { }

    ngOnInit() {
        this.fillImgSrcArr();
        this.getImage();
    }


    fillImgSrcArr() {
        for (let i = 1; i <= this.IMAGES_LENGTH; i++) {
            this.imgsrcArr.push( '../assets/img/ucasetwo/' + String(i) + '.jpeg');
        }
    }

    getImage() {

        if (this.imgsrc === '') {
            this.imgsrc = this.imgsrcArr[this.getRandomNumber( 0, this.IMAGES_LENGTH - 1) ];
        }else {
            const excludeSrcIndex = this.imgsrcArr.indexOf(this.imgsrc);
            const temp = this.imgsrcArr;
            temp.splice(excludeSrcIndex, 1);
            this.imgsrc = temp[this.getRandomNumber(0, temp.length - 1)];
        }


    }

    getRandomNumber(minimum, maximum) {
        return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    }


    // Is called when user checks button done of description image
    imgDescrDone() {
        //console.log('in');
        if (this.textAreaImgDescr.length < 10) {
            alert('Please type more characters!');
        }else {
            jQuery('#myModal2').modal('toggle');
            const that = this;
            setTimeout(function(){
                jQuery('#myModal2').modal('hide');
                that.router.navigate(['ucase3']);
            }, 1000 );
        }
    }



}

