import {Component, OnInit} from '@angular/core';
import {DataService} from '../../bo/data.service';
import {Router} from '@angular/router';
import {Question} from '../../bo/interfaces';
import {AlertController, ToastController} from '@ionic/angular';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.page.html',
    styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {

    public currenQuestion: number;
    private question: Array<Question>;
    public copiedQuestion: Array<Question>;
    public score: number;

    constructor(private  dataService: DataService,
                private route: Router,
                public toastController: ToastController,
                public alertController: AlertController) {
    }

    ngOnInit() {
        this.question = this.dataService.currentQuiz.questions;
        const copy = [...this.question].filter(q => q.a1 !== '');
        this.currenQuestion = 0;
        this.score = 0;
        this.copiedQuestion = this.shuffle(copy);
        if (this.copiedQuestion.length === 0) {
            this.route.navigateByUrl('/');
        }
    }

    // not real random
    shuffle(array): Array<Question> {
        return array.sort(() => Math.random() - 0.5);
    }

    checkAnswer(answer: number) {
        if (answer === this.copiedQuestion[this.currenQuestion].correct) {
            this.score++;
            this.currenQuestion++;
            this.answerShow('Richtig');
            if (this.quizEnd()) {
                this.currenQuestion = 0;
                this.quizFinished();
            }
        } else {
            this.score--;
            this.currenQuestion++;
            this.answerShow('Falsch');
            if (this.quizEnd()) {
                this.currenQuestion = 0;
                this.quizFinished();
            }
        }
    }

    quizEnd(): boolean {
        return this.currenQuestion === this.copiedQuestion.length;
    }

    async answerShow(answer) {
        const toast = await this.toastController.create({
            message: answer,
            duration: 2000
        });
        toast.present();
    }


    async quizFinished() {
        const alert = await this.alertController.create({
            header: 'Das funny Quiz ist zu Ende!!',
            message: 'Nur ' + this.score + ' Punkte',
            buttons: [
                {
                    text: 'Home',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        this.route.navigate(['home']);
                    }
                }
            ]
        });

        await alert.present();
    }
}
