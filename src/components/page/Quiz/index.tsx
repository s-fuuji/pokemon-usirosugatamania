import { Button, Paper } from '@mantine/core'
import { useState } from 'react'
import { ShuffleCard } from '../../model/Quiz/components/ShuffleCard'
import { usePokeSWR } from '../../../api/usePokeSwr'
import React from 'react'
import { NextPage } from 'next/types'
import { QuizResult, nextQuestion } from '../../types/quizPageTypes'
import { AfterClearQuiz } from '../../model/Quiz/components/AfterClearQuiz'

export const Quiz: NextPage = () => {
  const { pokemonList, error } = usePokeSWR()
  const [quizResult, setQuizResult] = useState<QuizResult>({
    answeredResultsArray: [],
    isAllQuizAnswered: false,
  })

  const [nextQuestion, setNextQuestion] = useState<nextQuestion>({
    prevAskedPokeIndex: -1,
    nextQuestionImgUrls: {
      maleImgUrl: '',
      femaleImgUrl: '',
    },
    nextQuestionPokeArray: [0],
  })

  const { prevAskedPokeIndex, nextQuestionImgUrls, nextQuestionPokeArray } =
    nextQuestion

  const hasFemalePokemonList = pokemonList
    ? pokemonList.filter((p: any) => p.sprites.back_female !== null)
    : [0]
  const allQuestionNum = hasFemalePokemonList?.length
  const correctQuestionNum = quizResult.answeredResultsArray.length + 1
  const correctAnswersCount = quizResult.answeredResultsArray.filter(
    (s) => s === 'correct'
  ).length

  const randomizer = () => {
    const deletedAskedPokeArray =
      prevAskedPokeIndex >= 0
        ? nextQuestionPokeArray?.filter((q, i) => i !== prevAskedPokeIndex)
        : hasFemalePokemonList

    const selectPokeNum = Math.floor(
      Math.random() * deletedAskedPokeArray?.length
    )
    const nextQuestionImgUrls = deletedAskedPokeArray[selectPokeNum].sprites
    setNextQuestion({
      prevAskedPokeIndex: selectPokeNum,
      nextQuestionImgUrls: {
        maleImgUrl: nextQuestionImgUrls.back_default,
        femaleImgUrl: nextQuestionImgUrls.back_female,
      },
      nextQuestionPokeArray: deletedAskedPokeArray,
    })
  }

  const addCorrect = () => {
    setQuizResult({
      ...quizResult,
      answeredResultsArray: [...quizResult.answeredResultsArray, 'correct'],
    })
    nextQuestionPokeArray.length !== 1
      ? randomizer()
      : setQuizResult({ ...quizResult, isAllQuizAnswered: true })
  }

  const addInCorrect = () => {
    setQuizResult({
      ...quizResult,
      answeredResultsArray: [...quizResult.answeredResultsArray, 'inCorrect'],
    })
    nextQuestionPokeArray.length !== 1
      ? randomizer()
      : setQuizResult({ ...quizResult, isAllQuizAnswered: true })
  }

  return quizResult.isAllQuizAnswered ? (
    <AfterClearQuiz
      correctAnswersCount={correctAnswersCount}
      allQuestionNum={allQuestionNum}
    />
  ) : nextQuestionImgUrls.maleImgUrl !== '' ? (
    <div className="text-center">
      <ShuffleCard
        addCorrect={addCorrect}
        addInCorrect={addInCorrect}
        nextQuestionImgUrls={nextQuestionImgUrls}
      >
        <Paper className="bg-red-600 text-white text-3xl p-2 rounded-">
          {correctQuestionNum}/{allQuestionNum}問目
        </Paper>
      </ShuffleCard>
      <Paper className="inline-block bg-red-600 text-5xl text-white mt-20 p-5 rounded-2xl ">
        メスだと思うポケモンをクリックしよう
      </Paper>
    </div>
  ) : (
    <div className="text-center mt-48">
      <Button
        className="h-28 text-5xl rounded-full px-11"
        onClick={randomizer}
        variant="gradient"
        gradient={{ from: 'yellow', to: 'red' }}
      >
        クイズスタート
      </Button>
    </div>
  )
}
