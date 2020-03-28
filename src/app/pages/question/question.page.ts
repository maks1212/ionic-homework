import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../bo/data.service';
import {Question} from '../../bo/interfaces';

@Component({
    selector: 'app-question',
    templateUrl: './question.page.html',
    styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {

    public question: Question;

    constructor(private data: DataService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id !== '0') {
            this.question = this.data.getQuestion(id);
        } else {
            this.question = this.data.newQuestion();
        }
    }

    setCorrect(theRightOne: number) {
        this.question.correct = theRightOne;
    }

    ionViewWillLeave() {
        if (this.question.id === '') {
            this.data.addQuestion(this.question);
        } else {
            this.data.save();
        }
    }

}
