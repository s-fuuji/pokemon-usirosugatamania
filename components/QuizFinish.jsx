import { Button } from "@mantine/core";
import { useContext, useState } from "react";
import { clearedQuizContext, setClearedQuizContext } from "../contexts/gotPoke";

export const QuizFinish = ({ numCorrect, numQuestion }) => {
  const setClearedQuiz = useContext(setClearedQuizContext);

  const resultSave = (version) => {
    setClearedQuiz({
      red: `${numCorrect} / ${numQuestion}問クリア`,
    });
  };

  return (
    <>
      <div>
        {numQuestion}問中{numCorrect}
        問正解！
      </div>
      <Button
        onClick={resultSave("red")}
        variant="gradient"
        gradient={{ from: "yellow", to: "red" }}
        style={{ marginBottom: 30 }}
      >
        もう一度
      </Button>
    </>
  );
};
