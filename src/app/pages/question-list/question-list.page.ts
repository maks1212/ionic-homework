import {Component, OnInit} from '@angular/core';
import {DataService} from '../../bo/data.service';
import {Router} from '@angular/router';
import {Question} from '../../bo/interfaces';

@Component({
    selector: 'app-question-list',
    templateUrl: './question-list.page.html',
    styleUrls: ['./question-list.page.scss'],
})
export class QuestionListPage implements OnInit {

    constructor(public data: DataService, public router: Router) {
    }

    ngOnInit() {
    }

    public show(id: string) {
        this.router.navigateByUrl('/question/' + id);
    }

    public deleteQuestion(q: Question) {
        this.data.deleteQuestion(q);
    }

}
