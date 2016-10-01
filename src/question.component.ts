import { Component, EventEmitter, Output, Input } from '@angular/core';
import { QuizService } from './quiz.service'

@Component({
    selector: 'quiz-questions',    
    template: `
    <form #formRef="ngForm">
        <div *ngFor="let question of quizService.questions">
            {{ question.id }}. {{ question.text }}
            <br><br>
            <div *ngFor="let option of question.options">             
             
             <input 
                [disabled] = "showAnswer"                
                [name]="question.id" 
                [value]="option.id" 
                type="radio"
                [ngModel]
                (ngModelChange) = "emitChanges(question.id, formRef, $event)"                 
             />
             {{ showAnswer }}
             <label>{{ option.text }}</label>
            </div>
            <br>        
        </div>
    </form>            
    `,
    styles: [`
        .answer {
            color: #00cc00;
        }

        .green {
            color: #00cc00;
        }

        .red {
            color: red;
        }
    `]
})
export class QuestionComponent {    
    @Input() showAnswer: string; // This is turned into a string when interpolated in the parent component            
    @Output() sendAnswer: any = new EventEmitter();
            
    // showAnswer: boolean;    
    quizService;
    formRef;
    form;
    constructor(quizService: QuizService){                
        this.quizService = quizService;
        // this.showAnswer = (this.showAnswer == true);
        
    }
    
    emitChanges(q, formRef, event){
        // if (this.showAnswer === 'true') {
            this.formRef = formRef;
            this.formRef.value[q] = event;
            this.sendAnswer.emit(this.formRef.value);           
            // console.log(q, formRef.value, ' emitted ', event);
        // }    
    }
    // get checked() {
    //     return this.quizService.correct !== null;
    // }
    // toggleShowAnswer() {
    //     showAnswer
    //     this.showAnswer = !this.showAnswer;        
    // }

} 


// <!--<strong>{{ id }}. {{ question }}</strong>-->
//     <br>
    
//     <!--<form #formRef="ngForm">
//         <label [ngClass]="{'green': correctAnswer === 'a' && showAnswer === 'true', 'red': correctAnswer !== 'a' && selectedAnswer === 'a' && showAnswer === 'true'}">
//             <input type="radio" [(ngModel)]="selectedAnswer" name="{{ id }}" value="a"/> 
//             A) {{ answerA }}
//         </label>&nbsp;
//                 <span *ngIf="correctAnswer === 'a' && selectedAnswer === 'a' && showAnswer === 'true'">Correct!</span>
//                 <span *ngIf="correctAnswer !== 'a' && selectedAnswer === 'a' && showAnswer === 'true'">Incorrect.</span> <br>
        
//         <label [ngClass]="{'green': correctAnswer === 'b'  && showAnswer === 'true', 'red': correctAnswer !== 'b' && selectedAnswer === 'b' && showAnswer === 'true'}">
//             <input type="radio" [(ngModel)]="selectedAnswer" name="{{ id }}" value="b"/> 
//             B) {{ answerB }}
//         </label>&nbsp;
//                 <span *ngIf="correctAnswer === 'b' && selectedAnswer === 'b' && showAnswer === 'true'">Correct!</span>
//                 <span *ngIf="correctAnswer !== 'b' && selectedAnswer === 'b' && showAnswer === 'true'">Incorrect.</span> <br>
        
//         <label [ngClass]="{'green': correctAnswer === 'c'  && showAnswer === 'true', 'red': correctAnswer !== 'c' && selectedAnswer === 'c' && showAnswer === 'true'}">
//             <input type="radio" [(ngModel)]="selectedAnswer" name="{{ id }}" value="c"/> 
//             C) {{ answerC }}
//         </label>&nbsp;
//                 <span *ngIf="correctAnswer === 'c' && selectedAnswer === 'c' && showAnswer === 'true'">Correct!</span>
//                 <span *ngIf="correctAnswer !== 'c' && selectedAnswer === 'c' && showAnswer === 'true'">Incorrect.</span> <br>
//     </form>
//     <span *ngIf="selectedAnswer !== 'null'">You Selected: {{ selectedAnswer | uppercase}}<br></span>
//     <span *ngIf="showAnswer === 'true'">The Correct Answer is: {{ correctAnswer | uppercase }}<br></span>-->