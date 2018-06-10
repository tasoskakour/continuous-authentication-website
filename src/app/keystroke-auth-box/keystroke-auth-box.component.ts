import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../_services/user.service';
import { RandomParagraphs } from '../_models/random-paragraphs';
declare var levenshtein: any;

@Component({
  selector: 'app-keystroke-auth-box',
  templateUrl: './keystroke-auth-box.component.html',
  styleUrls: ['./keystroke-auth-box.component.css']
})
export class KeystrokeAuthBoxComponent implements OnInit {


  /**
   * @param type: 'text' or 'question' or 'random'
   * if type='text'
   * @param mSize: number -> specifies the maximum number of characters of text (if a word is cut in half the it is included all)
   * if mSize is not defined, then it's taken as random number between 25-35 characters
   * if type='question'
   * @param mSize: number -> specifies how many questions
   * if mSize is not defined, then it's taken as a random number between 1-3 questions
   *
   */
  @Input() type: string;
  @Input() mSize: any; // I parse it as number later (NOT MANDATORY INPUT)

  /* Statics If the user disregard mSize */
  MSIZE_MIN_TEXT = 30;
  MSIZE_MAX_TEXT = 35;
  MSIZE_MIN_QUESTION = 1;
  MSIZE_MAX_QUESTION = 2;
  TEXT_MAX_ERR_THRESH = 5; //  5; TESTING PURPOSES
  ERR_MSG_TEXT = 'Text differs a lot. Check again!';
  ERR_MSG_TEXT_EMPTY = 'Missing text input!';
  ERR_MSG_QUESTION = 'Missing Input. Check Again!';
  ERR_MSG_QUESTION_INSUFFICIENT = 'Please type more!';


  /* ngmodels from component to template*/
  instructions_msg: string;
  err_msg = '';
  myRandomQuote: string;
  myRandomQuoteLoading = false;
  questionArr = [];



  /* ngmodels from template to component (userInput) */
  textInput = '';
  answerInputArr = [];



  /* Static Questions */
  questions =
    [
      'What\'s your name?',
      'What\'s your favorite color?',
      'What\'s the name of your best friend?',
      'What\'s the name of your mother?',
      'What\'s your favorite soccer team?',
      'What\'s your occupation?',
      'What\'s your pet name?',
      'What\'s your city?',
      'What\'s your country?',
      'What\'s the name of your university/school?',
      'What\'s your favorite movie?',
      'What\'s your favorite actor?'
    ];

  /************************************************************************************************************************ */

  constructor(private userService: UserService) { }

  ngOnInit() {
    // console.log('Starting Component with type=' + this.type + ' and mSize = ' + String(this.mSize));
    /* Determine Type */
    if (this.type === 'text') {
      this.buildText();
    } else if (this.type === 'question') {
      this.buildQuestion();
    } else if (this.type === 'random') {
      if (this.getRandomInt(0, 1) === 0) { this.type = 'text'; this.buildText(); } else { this.type = 'question'; this.buildQuestion(); }
    }

  }

  /**
   * Builts text
   */
  buildText() {
    this.myRandomQuoteLoading = true;
    if (this.mSize !== undefined) {
      this.mSize = Number(this.mSize);
    } else {
      this.mSize = this.getRandomInt(this.MSIZE_MIN_TEXT, this.MSIZE_MAX_TEXT);
    }
    this.instructions_msg = 'Please type the text below.';
    this.getRandomQuoteWrapper(this.mSize);
  }

  /**
   * Builts quiestion(s)
   */
  buildQuestion() {
    if (this.mSize !== undefined) {
      this.mSize = Number(this.mSize);
    } else {
      this.mSize = this.getRandomInt(this.MSIZE_MIN_QUESTION, this.MSIZE_MAX_QUESTION);
    }
    this.instructions_msg = 'Please answer the question(s) below';
    this.fillQuestions(this.mSize);
  }

  /** This is called when the type is 'text' to get some random quote
  * @param {maxStrSize}: Number indicating the maximum of characters to be delivered to html.
  */
  getRandomQuoteWrapper(maxStrSize) {
    /* Get a random paragraph. */
    const randomParagraphs = new RandomParagraphs();
    const tmpArr = randomParagraphs.paragraphs_noBreak[this.getRandomInt(0, randomParagraphs.paragraphs.length - 1)];
    /* Get a random sentence within this paragraph */
    let rSplit = tmpArr.split(' ');
    rSplit = rSplit.slice(this.getRandomInt(0, rSplit.length - 5), rSplit.length - 1); // max 5 words from the end
    this.myRandomQuote = '';
    for (let i = 0; i < rSplit.length; i++) {
      this.myRandomQuote += rSplit[i] + ' ';
    }

    this.myRandomQuote = this.myRandomQuote.trim();
    /* Restrict size without cutting the last word*/
    if (this.myRandomQuote.length > maxStrSize) {
      const myRandomQuote = this.myRandomQuote;
      if (myRandomQuote[maxStrSize] !== ' ') {
        const offset = myRandomQuote.substring(maxStrSize).indexOf(' ');
        if (offset > -1) {
          maxStrSize += offset;
        } else {
          maxStrSize = this.myRandomQuote.length;
        }
      }
      this.myRandomQuote = this.myRandomQuote.substr(0, maxStrSize).trim();

    }
    this.myRandomQuoteLoading = false;
  }

  /** Fills Questions
   *@param {len}: Number of questions to be delivered to html.
   */
  fillQuestions(len) {
    let maximum = this.questions.length - 1;
    const minimum = 0;
    const tempQuestions = this.questions;
    /* Start picking random questions, excluding those that already have been picked */
    for (let i = 0; i < len; i++) {
      const randomIndex = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
      this.questionArr.push(this.questions[randomIndex]);
      this.answerInputArr.push('');
      tempQuestions.splice(randomIndex, 1);
      maximum -= 1;
    }
  }

  /** Returns true, if the user has not left any inputs blank and has typed correct (to some extend) text
   *
  */
  isValidUserInput(): any {
    if (this.type === 'text') {
      if (this.textInput.trim() === '') {
        // console.log('User text input is null')
        this.showErrMsgForTime(this.ERR_MSG_TEXT_EMPTY, 1000);
        return false;
      } else {
        // console.log('true');
        if (this.minimumEditDistance(this.textInput.trim(), this.myRandomQuote) > this.TEXT_MAX_ERR_THRESH) {
          this.showErrMsgForTime(this.ERR_MSG_TEXT, 1000);
          return false;
        } else {
          return true;
        }
      }
    } else if (this.type === 'question') {
      let totalLength = 0;
      for (let i = 0; i < this.answerInputArr.length; i++) {
        if (this.answerInputArr[i].trim() === '') {
          this.showErrMsgForTime(this.ERR_MSG_QUESTION, 1000);
          return false;
        } else {
          totalLength += this.answerInputArr[i].length;
        }
      }
      if (totalLength <= 6) {
        this.showErrMsgForTime(this.ERR_MSG_QUESTION_INSUFFICIENT, 1500);
        return false;
      } else {
        return true;
      }

    }
  }


  /**
   * Returns a random integer between the specified range
   */
  getRandomInt(minimum, maximum) {
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  }

  /**
   * Strips all non-letters and non-numbers from string
   * @param {str}
   */
  stripNonLettersAndNonNumbersFromString(str) {
    let ret = '';
    for (let i = 0; i < str.length; i++) {
      if ((str[i].toLowerCase() >= 'a' && str[i].toLowerCase() <= 'z') || (str[i] >= '0' && str[i] <= '9') || str[i] === ' ') {
        ret += str[i];
      }
    }
    return ret;
  }

  /**
   * Computes how different two strings are
   */
  minimumEditDistance(str1, str2) {
    return levenshtein(str1, str2);
  }

  /**
   * Shows the err msg for the specific time
   * @param time Number in ms
   */
  showErrMsgForTime(errmsg, time) {
    this.err_msg = errmsg;
    const that = this;
    setTimeout(function () {
      that.err_msg = '';
    }, time);
  }

}
