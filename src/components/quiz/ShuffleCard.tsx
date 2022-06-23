import { QuizCard } from "./QuizCard";
import React, { ReactNode } from 'react';
import { nextQuestionImgUrls } from "../types/quizPageTypes";


type Props = {
  addCorrect: () => void;
  addInCorrect: () => void;
  nextQuestionImgUrls: nextQuestionImgUrls;
  children: ReactNode;
};

export const ShuffleCard: React.FC<Props> = ({
  addCorrect,
  addInCorrect,
  nextQuestionImgUrls,
  children,
}) => {
  const right = Math.random();
  const left = Math.random();
  const { maleImgUrl, femaleImgUrl } = nextQuestionImgUrls;
  const isMaleLeft = right >= left;
  return (
    <div className="flex justify-center items-center">
      <QuizCard
        imgUrl={isMaleLeft ? maleImgUrl : femaleImgUrl}
        onClick={isMaleLeft ? addInCorrect : addCorrect}
      />
      {children}
      <QuizCard
        imgUrl={isMaleLeft ? femaleImgUrl : maleImgUrl}
        onClick={isMaleLeft ? addCorrect : addInCorrect}
      />
    </div>
  );
};
