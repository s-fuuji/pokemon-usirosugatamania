import { Button } from "@mantine/core";
import { useState } from "react";
import { QuizFinish } from "../components/QuizFinish";
import { ShuffleCard } from "../components/ShuffleQuiz";
import { usePokeSWR } from "../hooks/usePokeSwr";

export const Quiz = () => {
  const { poke, pokeError } = usePokeSWR();
  const [cleared, setCleared] = useState(false);

  const [correctCount, setCorrectCount] = useState([]);
  const [randomQuestion, setRandomQuestion] = useState({
    selectPokeIndex: -1,
    quizImgUrl: "",
    prevQuizPokeArray: [],
  });

  const { selectPokeIndex, quizImgUrl, prevQuizPokeArray } = randomQuestion;

  const quizPokeArray = poke?.filter((p) => p.sprites.back_female !== null);

  const Randomizer = () => {
    const newQuizPokeArray =
      selectPokeIndex >= 0
        ? prevQuizPokeArray.filter((q, i) => i !== selectPokeIndex)
        : quizPokeArray;

    const selectPokeNum = Math.floor(Math.random() * newQuizPokeArray?.length);
    const quizImgUrl = newQuizPokeArray[selectPokeNum].sprites;
    setRandomQuestion({
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
      //こうやって、やりたいことを認識するフェーズを日常生活につくる
      //もう一度を押した時の処理
      //ここも出来たら進行度stateにまとめる
      numCorrect={correctCount.filter((s) => s === 1).length}
      numQuestion={quizPokeArray.length}
    />
  ) : quizImgUrl !== "" ? (
    <ShuffleCard
      CorrectAnswer={CorrectAnswer}
      InCorrectAnswer={InCorrectAnswer}
      //shuffleの方で乱数にする huffleは乱数生成だけの役割

      //性別のurlとして、quiimgurlのまとめる
      maleUrl={quizImgUrl.back_default}
      femaleUrl={quizImgUrl.back_female}
      //クイズの進行状態としてまとめてオブジェクトにする
      numQuestion={quizPokeArray.length}
      numNowQuestion={correctCount.length + 1}
      //component もフォルダ分け
    />
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
