import { Component, OnInit } from '@angular/core';
import { RandomQuestions } from '../_models/random-questions';
import { Router } from '@angular/router';
declare var jQuery:any;

@Component({
  selector: 'app-usecase-three',
  templateUrl: './usecase-three.component.html',
  styleUrls: ['./usecase-three.component.css']
})
export class UsecaseThreeComponent implements OnInit {

  questions = new RandomQuestions().questions;
  answers = new Array<string>(this.questions.length);
  doneClicked = false;

  constructor(private router: Router) { }

  ngOnInit() {

  }


  done() {
    for (let i = 0; i < this.answers.length; i++) {
      if (this.answers[i] === undefined || this.answers[i] === '') {
        return;
      }
    }

    // Done it.
    jQuery('#modal3-success').modal('show');

    const that = this;
    setTimeout(function(){
        jQuery('#modal3-success').modal('hide');
        that.router.navigate(['ucase4']);
    }, 1000 );

  }
}
