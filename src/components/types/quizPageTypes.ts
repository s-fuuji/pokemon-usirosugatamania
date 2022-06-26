export type nextQuestionImgUrls = {
  maleImgUrl: string
  femaleImgUrl: string
}

export type QuizResult = {
  answeredResultsArray: string[]
  isAllQuizAnswered: boolean
}

export type nextQuestion = {
  prevAskedPokeIndex: number
  nextQuestionImgUrls: nextQuestionImgUrls
  nextQuestionPokeArray: number[]
}
