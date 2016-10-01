import { Component } from '@angular/core';
import { QuizService } from './quiz.service';

// [value] = "baseAmount" is one-way binding of data from component to view
    // This syntax gets data from the component and puts it into the view
// (input) = "update()" is one-way binging from view to component 
    // This syntax sends changes in the view to component 
// [(ngModel)]="baseAmount" is a two way binding method for Forms only and you must include the FormsModule

@Component({
  selector: 'quiz',
  template: `    
    These are the questions:
    <br><br>
      
    <quiz-questions          
      [showAnswer]="showAnswer"
      (sendAnswer)="this.formRef = $event"          
    ></quiz-questions>

    <button *ngIf="!showAnswer" (click)="toggleShowAnswer()">Show Answers</button>
    <!--<button *ngIf="showAnswer" (click)="toggleShowAnswer()">Hide Answers</button>-->
    
    <div *ngIf = "scorePercent >= 50 ">You got {{ (results.correct === undefined) ? '0' : results.correct }} out of {{ results.total }} ({{ results.correct/results.total * 100 }}%) correct, you passed!</div>
    
    <div *ngIf = "scorePercent < 50 ">You got {{ (results.correct === undefined) ? '0' : results.correct }} out of {{ results.total }} ({{ results.correct/results.total * 100 }}%) correct, try again.</div>
    
  `,
  styles: [``]
})
export class AppComponent {    
  showAnswer: boolean;  
  quizService; 
  formRef;   
  results;
  scorePercent;
  constructor(quizService: QuizService) {
    this.quizService = quizService;    
    this.hideMe = false;
  }  


  toggleShowAnswer() {                
        this.showAnswer = !this.showAnswer;
        this.results = this.quizService.marker(this.formRef);
        this.scorePercent = this.results.correct/this.results.total * 100;
                  
  }

}


    // <!--<question 
    //   id="1"
    //   question="{{ quizService.questions[0].text }}"
    //   answerA="{{ quizService.questions[0].options[0].text }}."
    //   answerB="{{ quizService.questions[0].options[1].text }}."
    //   answerC="{{ quizService.questions[0].options[2].text }}."
    //   correctAnswer="c"
    //   showAnswer="{{ showAnswer }}"
    //   [hideMe]="hideMe"
    // ></question>
    // <br>
    // <question 
    //   id="2"
    //   question="{{ quizService.questions[1].text }}"
    //   answerB="{{ quizService.questions[1].options[1].text }}."
    //   answerA="{{ quizService.questions[1].options[0].text }}."
    //   answerC="{{ quizService.questions[1].options[2].text }}."
    //   correctAnswer="b"
    //   showAnswer="{{ showAnswer }}"
    //   [hideMe]="hideMe"
    // ></question>
    // <br>
    // <question 
    //   id="3"
    //   question="{{ quizService.questions[2].text }}"
    //   answerA="{{ quizService.questions[2].options[0].text }}."
    //   answerB="{{ quizService.questions[2].options[1].text }}."
    //   answerC="{{ quizService.questions[2].options[2].text }}."
    //   correctAnswer="a"
    //   showAnswer="{{ showAnswer }}"
    //   hideMe="{{ hideMe }}"
    // ></question>-->
