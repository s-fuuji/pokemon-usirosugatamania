import { QuizCard } from "./QuizCard";

export const ShuffleCard = ({
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
        imgurl={rCorrect ? maleUrl : femaleUrl}
        onClick={rCorrect ? InCorrectAnswer : CorrectAnswer}
      />
      {children}
      <QuizCard
        imgurl={rCorrect ? femaleUrl : maleUrl}
        onClick={rCorrect ? CorrectAnswer : InCorrectAnswer}
      />
    </div>
  );
};
