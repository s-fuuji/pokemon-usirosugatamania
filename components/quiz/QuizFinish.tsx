import { Button } from "@mantine/core";
import { useDispatch } from "react-redux";
import { triedQuizCount } from "../../slicer/triedQuizSlicer";
import React from 'react'

type Props = {
  numCorrect: number,
  numQuestion: number
}

export const QuizFinish: React.FC<Props> = (
  { numCorrect, numQuestion }) => {
  const dispatch = useDispatch();
  const resultSave = () => {
    dispatch(triedQuizCount({ numCorrect, numQuestion }));
  };

  return (
    <div className="mt-24 text-center ">
      <p className=" text-5xl text-red-800">
        {numQuestion}問中{numCorrect}
        問正解！
      </p>
      <Button
        className="h-28 text-5xl rounded-full px-11"
        onClick={() => resultSave()}
        variant="gradient"
        gradient={{ from: "yellow", to: "red" }}
        style={{ marginBottom: 30 }}
      >
        結果を保存
      </Button>
      <Button
        className="h-28 text-5xl rounded-full px-11"
        onClick={() => window.location.reload()}
        variant="gradient"
        gradient={{ from: "yellow", to: "red" }}
        style={{ marginBottom: 30 }}
      >
        もう一度
      </Button>
    </div>
  );
};
