import { Button } from "@mantine/core";
import { useState } from "react";
import { ShuffleCard } from "../components/quiz/ShuffleCard";
import { usePokeSWR } from "../hooks/usePokeSwr";
import React from 'react';
import { NextPage } from "next/types";
import { QuizResult, nextQuestion } from "../components/types/quizPageTypes";
import { FinishedQuiz } from "../components/quiz/FinishedQuiz";




export const Quiz: NextPage = () => {
  const { pokemonList, error } = usePokeSWR();
  const [quizResult, setQuizResult] = useState<QuizResult>({
    answeredResultsArray: [],
    isAllQuizAnswered: false,
  });

  const [nextQuestion, setNextQuestion] = useState<nextQuestion>({
    prevAskedPokeIndex: -1,
    nextQuestionImgUrls: {
      maleImgUrl: "",
      femaleImgUrl: "",
    },
    nextQuestionPokeArray: [0],
  });

  const { prevAskedPokeIndex, nextQuestionImgUrls, nextQuestionPokeArray } = nextQuestion;

  const hasFemalePokemonList = pokemonList ? pokemonList.filter((p: any) => p.sprites.back_female !== null) : [0];
  const allQuestionNum = hasFemalePokemonList?.length;
  const correctQuestionNum = quizResult.answeredResultsArray.length + 1;
  const correctAnswersCount = quizResult.answeredResultsArray.filter((s) => s === "correct").length;

  const randomizer = () => {
    const deletedAskedPokeArray =
      prevAskedPokeIndex >= 0
        ? nextQuestionPokeArray?.filter((q, i) => i !== prevAskedPokeIndex)
        : hasFemalePokemonList;

    const selectPokeNum = Math.floor(Math.random() * deletedAskedPokeArray?.length);
    const nextQuestionImgUrls = deletedAskedPokeArray[selectPokeNum].sprites;
    setNextQuestion({
      prevAskedPokeIndex: selectPokeNum,
      nextQuestionImgUrls: {
        maleImgUrl: nextQuestionImgUrls.back_default,
        femaleImgUrl: nextQuestionImgUrls.back_female,
      },
      nextQuestionPokeArray: deletedAskedPokeArray,
    });
  };

  const addCorrect = () => {
    setQuizResult({ ...quizResult, answeredResultsArray: [...quizResult.answeredResultsArray, "correct"] });
    nextQuestionPokeArray.length !== 1
      ? randomizer()
      : setQuizResult({ ...quizResult, isAllQuizAnswered: true });
  };

  const addInCorrect = () => {
    setQuizResult({ ...quizResult, answeredResultsArray: [...quizResult.answeredResultsArray, "inCorrect"] });
    nextQuestionPokeArray.length !== 1
      ? randomizer()
      : setQuizResult({ ...quizResult, isAllQuizAnswered: true });
  };



  return quizResult.isAllQuizAnswered ? (
    <FinishedQuiz correctAnswersCount={correctAnswersCount} allQuestionNum={allQuestionNum} />
  ) : nextQuestionImgUrls.maleImgUrl !== "" ? (
    <ShuffleCard
      addCorrect={addCorrect}
      addInCorrect={addInCorrect}
      nextQuestionImgUrls={nextQuestionImgUrls}
    >
      <h1 className="text-red-600">
        {correctQuestionNum}/{allQuestionNum}問目
      </h1>
    </ShuffleCard>
  ) : (
    <div className="text-center mt-48">
      <Button
        className="h-28 text-5xl rounded-full px-11"
        onClick={randomizer}
        variant="gradient"
        gradient={{ from: "yellow", to: "red" }}
      >
        クイズスタート
      </Button>
    </div>
  );
};

export default Quiz;
