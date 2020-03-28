import {Injectable} from '@angular/core';
import {Question, Quiz} from './interfaces';
import {v4 as uuidv4} from 'uuid';
import {Plugins} from '@capacitor/core';

const {Storage} = Plugins;


@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor() {
        this.load();
        // this.currentQuiz.questions.push({
        //     id: uuidv4(),
        //     title: 'How much equals 1+2?',
        //     a1: '1',
        //     a2: '2',
        //     a3: '3',
        //     a4: '4',
        //     correct: 3
        // });
        // this.currentQuiz.questions.push({
        //     id: uuidv4(),
        //     title: 'How much equals 2+2?',
        //     a1: '1',
        //     a2: '2',
        //     a3: '3',
        //     a4: '4',
        //     correct: 4
        // });
        this.currentQuiz.questions.push({
            id: uuidv4(),
            title: 'Initial Question Fallback if Storage empty',
            a1: '',
            a2: '',
            a3: '',
            a4: '',
            correct: 1
        });
    }

    public currentQuiz: Quiz = {
        id: '',
        quizName: 'Quiz Number 1',
        questions: []
    };

    public getText(): string {
        return 'This is our super awesome text from data.service.ts';
    }

    public getQuestion(id: string): Question {
        return this.currentQuiz.questions.find(q => q.id === id);
    }

    public deleteQuestion(q: Question) {
        const index = this.currentQuiz.questions.indexOf(q);
        if (index > -1) {
            this.currentQuiz.questions.splice(index);
        }
        this.save();
    }

    public newQuestion(): Question {
        return {
            id: '',
            title: '',
            a1: '',
            a2: '',
            a3: '',
            a4: '',
            correct: 1
        };
    }

    public addQuestion(q: Question) {
        q.id = uuidv4();
        this.currentQuiz.questions.push(q);
        this.save();
    }

    public async load() { // Grischa mag keine Promises mit .then
        try {
            const res = await Storage.get({key: 'myQuestions'});
            if (res.value) {
                this.currentQuiz = JSON.parse(res.value);
            } else {
                console.log('res.value does not exist');
            }
        } catch (error) {
            console.log(error);
        }
    }

    public save() {
        Storage.set({
            key: 'myQuestions',
            value: JSON.stringify(this.currentQuiz),
        });
    }
}
