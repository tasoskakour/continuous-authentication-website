import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/index';
import { Router } from '@angular/router';
import { RandomParagraphs } from '../_models/random-paragraphs';
declare var jQuery: any;


@Component({
    templateUrl: 'usecase-four.component.html',
    styleUrls: ['./usecase-four.component.css'],
})

export class UsecaseFourComponent implements OnInit  {

    // Lorem Ipsum Stuff
    randomParagraphs = new RandomParagraphs();
    myRandomParagraph: string;
    textAreaRandomParagraph: string; // binded to the dom text area

    constructor (private authService: AuthenticationService, private router: Router) {}

    ngOnInit() {
        // Acquire my lorem ipsum paragraph
        this.getMyRandomParagraph();
    }

    getMyRandomParagraph() {
        this.myRandomParagraph
            = this.randomParagraphs.paragraphs[this.getRandomNumber(0, this.randomParagraphs.paragraphs.length - 1)];
    }

    getRandomNumber(minimum, maximum) {
        return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    }


    textAreaDone() {
        if (this.textAreaRandomParagraph !== ' ' && this.textAreaRandomParagraph !== undefined) {
            jQuery('#myModal4').modal('toggle');
            const that = this;
            setTimeout(function(){
                jQuery('#myModal4').modal('hide');
                that.router.navigate(['home']);
            }, 1000 );
        }else {
            alert('Text Area Empty');
        }
    }

    /** NOT USED YET
     * Restrict string length without cutting last word
     * @param {string} str
     * @param {number} maxStrSize
     */
   restrictStringLength(str, maxStrSize) {
        if (str.length > maxStrSize) {
            const temp = str;
            if (temp[maxStrSize] !== ' ') {
                const offset = temp.substring(maxStrSize).indexOf(' ');
                if (offset > -1) {
                    maxStrSize += offset;
                } else {
                    maxStrSize = str.length;
                }
            }
        }
        return str.substr(0, maxStrSize);
    }

}

