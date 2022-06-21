export type quizImgUrl = {
    maleUrl: string,
    femaleUrl: string,
};

export type cleared = {
    correctCount: string[];
    quizCleared: boolean;
};

export type randomQuestion = {
    selectPokeIndex: number;
    quizImgUrl: quizImgUrl;
    prevQuizPokeArray: number[];
};