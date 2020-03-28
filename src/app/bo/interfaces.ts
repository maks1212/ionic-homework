export interface Question {
    id: string,
    title: string,
    a1: string,
    a2: string,
    a3: string,
    a4: string,
    correct: number
}

export interface Quiz {
    id: string,
    quizName: string,
    questions: Question[]
}
