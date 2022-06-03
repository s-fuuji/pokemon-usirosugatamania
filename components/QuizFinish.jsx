import { Button } from "@mantine/core";
import { useDispatch } from "react-redux";
import { triedQuizCount } from "../slicer/slicer";

export const QuizFinish = ({ numCorrect, numQuestion }) => {
  const dispatch = useDispatch();
  const resultSave = (version) => {
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
        onClick={() => resultSave("red")}
        variant="gradient"
        gradient={{ from: "yellow", to: "red" }}
        style={{ marginBottom: 30 }}
      >
        もう一度
      </Button>
    </div>
  );
};
