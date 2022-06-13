import { QuizCard } from "./QuizCard";
import React, { ReactNode } from 'react'
import { quizImgUrl } from "../types/type";

type Props = {
  CorrectAnswer: VoidFunction,
  InCorrectAnswer: VoidFunction,
  quizImgUrl: quizImgUrl
  children: ReactNode
}

export const ShuffleCard: React.FC<Props> = ({
  CorrectAnswer,
  InCorrectAnswer,
  quizImgUrl,
  children,
}) => {
  const right = Math.random();
  const left = Math.random();
  const { maleUrl, femaleUrl } = quizImgUrl;
  const rCorrect = right >= left;
  return (
    <div className="flex justify-center items-center">
      <QuizCard
        imgUrl={rCorrect ? maleUrl : femaleUrl}
        onClick={rCorrect ? InCorrectAnswer : CorrectAnswer}
      />
      {children}
      <QuizCard
        imgUrl={rCorrect ? femaleUrl : maleUrl}
        onClick={rCorrect ? CorrectAnswer : InCorrectAnswer}
      />
    </div>
  );
};
