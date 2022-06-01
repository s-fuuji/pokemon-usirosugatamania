import { QuizCard } from "./QuizCard";

export const ShuffleCard = ({
  CorrectAnswer,
  InCorrectAnswer,
  right,
  left,
  maleUrl,
  femaleUrl,
}) => {
  return right >= left ? (
    <div className="flex justify-center items-center">
      <QuizCard imgurl={femaleUrl} onClick={CorrectAnswer} />
      <h1>test1</h1>
      <QuizCard imgurl={maleUrl} onClick={InCorrectAnswer} />
    </div>
  ) : (
    <div className="flex justify-center items-center">
      <QuizCard imgurl={maleUrl} onClick={InCorrectAnswer} />
      <h1>test2</h1>
      <QuizCard imgurl={femaleUrl} onClick={CorrectAnswer} />
    </div>
  );
};
