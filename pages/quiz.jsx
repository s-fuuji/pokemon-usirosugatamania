import { Button } from "@mantine/core";
import { useState, useContext } from "react";
import { QuizCard } from "../components/QuizCard";
import { QuizFinish } from "../components/QuizFinish";
import { ShuffleCard } from "../components/ShuffleQuiz";

import { usePokeSWR } from "../hooks/usePokeSwr";

export const Quiz = () => {
  const { poke, pokeError } = usePokeSWR();
  const [cleared, setCleared] = useState(false);

  const [correctCount, setCorrectCount] = useState([]);
  const [randomQuestion, setRandomQuestion] = useState({
    right: 0,
    left: 0,
    selectPokeIndex: -1,
    quizImgUrl: "",
    prevQuizPokeArray: [],
  });

  const { right, left, selectPokeIndex, quizImgUrl, prevQuizPokeArray } =
    randomQuestion;

  const quizPokeArray = poke?.filter((p) => p.sprites.back_female !== null);

  const Randomizer = () => {
    const newQuizPokeArray =
      selectPokeIndex >= 0
        ? prevQuizPokeArray.filter((q, i) => i !== selectPokeIndex)
        : quizPokeArray;

    const selectPokeNum = Math.floor(Math.random() * newQuizPokeArray.length);
    const quizImgUrl = newQuizPokeArray[selectPokeNum].sprites;
    setRandomQuestion({
      right: Math.random(),
      left: Math.random(),
      selectPokeIndex: selectPokeNum,
      quizImgUrl: quizImgUrl,
      prevQuizPokeArray: newQuizPokeArray,
    });
  };

  const CorrectAnswer = () => {
    setCorrectCount([...correctCount, 1]);
    prevQuizPokeArray.length !== 1 ? Randomizer() : setCleared(true);
  };

  const InCorrectAnswer = () => {
    setCorrectCount([...correctCount, 0]);
    prevQuizPokeArray.length !== 1 ? Randomizer() : setCleared(true);
  };

  return cleared ? (
    <QuizFinish
      numCorrect={correctCount.filter((s) => s === 1).length}
      numQuestion={quizPokeArray.length}
    />
  ) : right > 0 ? (
    <ShuffleCard
      CorrectAnswer={CorrectAnswer}
      InCorrectAnswer={InCorrectAnswer}
      right={right}
      left={left}
      maleUrl={quizImgUrl.back_default}
      femaleUrl={quizImgUrl.back_female}
    />
  ) : (
    <Button
      onClick={Randomizer}
      variant="gradient"
      gradient={{ from: "yellow", to: "red" }}
      style={{ marginBottom: 30 }}
    >
      クイズスタート
    </Button>
  );
};

export default Quiz;
