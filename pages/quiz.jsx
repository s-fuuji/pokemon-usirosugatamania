import { Button } from "@mantine/core";
import { useState } from "react";
import { QuizCard } from "../components/QuizCard";
import { usePokeSWR } from "../hooks/usePokeSwr";

export const Quiz = () => {
  const { poke, pokeError } = usePokeSWR();
  const [randomQuestion, setRandomQuestion] = useState({
    right: 0,
    left: 0,
    selectPokeIndex: -1,
    quizImgUrl: "",
    prevQuizPokeArray: [],
  });
  const right = randomQuestion.right;
  const left = randomQuestion.left;
  const selectPokeIndex = randomQuestion.selectPokeIndex;
  const quizImgUrl = randomQuestion.quizImgUrl;
  const prevQuizPokeArray = randomQuestion.prevQuizPokeArray;

  const quizPokeArray = poke?.filter((p) => p.sprites.back_female !== null);
  console.log(prevQuizPokeArray);
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
    Randomizer();
  };

  const InCorrectAnswer = () => {
    Randomizer();
  };

  return right > 0 ? (
    right >= left ? (
      <>
        <QuizCard imgurl={quizImgUrl.back_female} onClick={CorrectAnswer} />
        <h1>test1</h1>
        <QuizCard imgurl={quizImgUrl.back_default} onClick={InCorrectAnswer} />
      </>
    ) : (
      <>
        <QuizCard imgurl={quizImgUrl.back_default} onClick={InCorrectAnswer} />
        <h1>test2</h1>
        <QuizCard imgurl={quizImgUrl.back_female} onClick={CorrectAnswer} />
      </>
    )
  ) : (
    <Button
      onClick={Randomizer}
      variant="gradient"
      gradient={{ from: "yellow", to: "red" }}
      style={{ marginBottom: 30 }}
    >
      見極めスタート
    </Button>
  );
};

export default Quiz;
