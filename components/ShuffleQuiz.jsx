import { QuizCard } from "./QuizCard";

export const ShuffleCard = ({
  CorrectAnswer,
  InCorrectAnswer,
  maleUrl,
  femaleUrl,
  numQuestion,
  numNowQuestion,
}) => {
  const right = Math.random();
  const left = Math.random();
  return right >= left ? (
    <div className="flex justify-center items-center">
      <QuizCard imgurl={femaleUrl} onClick={CorrectAnswer} />
      <h1 className="text-red-600">
        {numNowQuestion}/{numQuestion}問目
      </h1>
      <QuizCard imgurl={maleUrl} onClick={InCorrectAnswer} />
    </div>
  ) : (
    <div className="flex justify-center items-center">
      <QuizCard imgurl={maleUrl} onClick={InCorrectAnswer} />
      <h1 className="text-red-600">
        {numNowQuestion}/{numQuestion}問目
      </h1>
      <QuizCard imgurl={femaleUrl} onClick={CorrectAnswer} />
    </div>
  );
};
