import { Button } from "@mantine/core";
import { useState } from "react";
import { QuizFinish } from "../components/quiz/QuizFinish";
import { ShuffleCard } from "../components/quiz/ShuffleCard";
import { usePokeSWR } from "../hooks/usePokeSwr";
import React from 'react';
import { NextPage } from "next/types";
import { cleared, randomQuestion } from "../components/types/quizPageTypes";




export const Quiz: NextPage = () => {
  const { pokemonList, error } = usePokeSWR();
  const [cleared, setCleared] = useState<cleared>({
    correctCount: [],
    quizCleared: false,
  });

  const [randomQuestion, setRandomQuestion] = useState<randomQuestion>({
    selectPokeIndex: -1,
    quizImgUrl: {
      maleUrl: "",
      femaleUrl: "",
    },
    prevQuizPokeArray: [0],
  });

  const { selectPokeIndex, quizImgUrl, prevQuizPokeArray } = randomQuestion;

  const quizPokeArray = pokemonList ? pokemonList.filter((p: any) => p.sprites.back_female !== null) : [0];
  const numAllQuestion = quizPokeArray?.length;
  const numNowQuestion = cleared.correctCount.length + 1;
  const numCorrect = cleared.correctCount.filter((s) => s === "correct").length;

  const Randomizer = () => {
    const newQuizPokeArray =
      selectPokeIndex >= 0
        ? prevQuizPokeArray?.filter((q, i) => i !== selectPokeIndex)
        : quizPokeArray;

    const selectPokeNum = Math.floor(Math.random() * newQuizPokeArray?.length);
    const quizImgUrl = newQuizPokeArray[selectPokeNum].sprites;
    setRandomQuestion({
      selectPokeIndex: selectPokeNum,
      quizImgUrl: {
        maleUrl: quizImgUrl.back_default,
        femaleUrl: quizImgUrl.back_female,
      },
      prevQuizPokeArray: newQuizPokeArray,
    });
  };

  const CorrectAnswer = () => {
    setCleared({ ...cleared, correctCount: [...cleared.correctCount, "correct"] });
    prevQuizPokeArray.length !== 1
      ? Randomizer()
      : setCleared({ ...cleared, quizCleared: true });
  };

  const InCorrectAnswer = () => {
    setCleared({ ...cleared, correctCount: [...cleared.correctCount, "inCorrect"] });
    prevQuizPokeArray.length !== 1
      ? Randomizer()
      : setCleared({ ...cleared, quizCleared: true });
  };



  return cleared.quizCleared ? (
    <QuizFinish numCorrect={numCorrect} numQuestion={numAllQuestion} />
  ) : quizImgUrl.maleUrl !== "" ? (
    <ShuffleCard
      CorrectAnswer={CorrectAnswer}
      InCorrectAnswer={InCorrectAnswer}
      quizImgUrl={quizImgUrl}
    >
      <h1 className="text-red-600">
        {numNowQuestion}/{numAllQuestion}問目
      </h1>
    </ShuffleCard>
  ) : (
    <div className="text-center mt-48">
      <Button
        className="h-28 text-5xl rounded-full px-11"
        onClick={Randomizer}
        variant="gradient"
        gradient={{ from: "yellow", to: "red" }}
      >
        クイズスタート
      </Button>
    </div>
  );
};

export default Quiz;
