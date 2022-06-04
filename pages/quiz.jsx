import { Button } from "@mantine/core";
import { useState } from "react";
import { QuizFinish } from "../components/quiz/QuizFinish";
import { ShuffleCard } from "../components/quiz/ShuffleCard";
import { usePokeSWR } from "../hooks/usePokeSwr";

export const Quiz = () => {
  const { poke, pokeError } = usePokeSWR();
  const [cleared, setCleared] = useState({
    correctCount: [],
    quizCleared: false,
  });

  const [randomQuestion, setRandomQuestion] = useState({
    selectPokeIndex: -1,
    quizImgUrl: "",
    prevQuizPokeArray: [],
  });

  const { selectPokeIndex, quizImgUrl, prevQuizPokeArray } = randomQuestion;

  const quizPokeArray = poke?.filter((p) => p.sprites.back_female !== null);
  const numAllQuestion = quizPokeArray?.length;
  const numNowQuestion = cleared.correctCount.length;
  const numCorrect = cleared.correctCount.filter((s) => s === 1).length;

  const Randomizer = () => {
    const newQuizPokeArray =
      selectPokeIndex >= 0
        ? prevQuizPokeArray.filter((q, i) => i !== selectPokeIndex)
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
    setCleared({ ...cleared, quizCleared: false });
    console.log(cleared);
    prevQuizPokeArray.length !== 1
      ? Randomizer()
      : setCleared({ ...cleared, quizCleared: false });
  };

  const InCorrectAnswer = () => {
    setCleared({ correctCount: [...cleared.correctCount, 0], ...cleared });
    prevQuizPokeArray.length !== 1
      ? Randomizer()
      : setCleared({ ...cleared, quizCleared: false });
  };

  return cleared.quizCleared ? (
    <QuizFinish numCorrect={numCorrect} numQuestion={numAllQuestion} />
  ) : quizImgUrl !== "" ? (
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
