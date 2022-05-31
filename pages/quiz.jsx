import { QuizCard } from "../components/QuizCard";
import { usePokeSWR } from "../hooks/usePokeSwr";

export const Quiz = () => {
  const { poke, pokeError } = usePokeSWR();
  const quizPoke = poke?.filter((p) => p.sprites.back_female !== null);
  const quizPokeCount = quizPoke?.length;
  const i = quizPokeCount ? Math.floor(Math.random() * quizPokeCount) : null;

  let right = Math.random();
  let left = Math.random();

  const CorrectAnswer = () => {
    return <div>test</div>;
  };

  const InCorrectAnswer = () => {
    return <div>test2</div>;
  };

  return poke ? (
    right >= left ? (
      <>
        <QuizCard
          imgurl={quizPoke[1]?.sprites.back_female}
          onClick={CorrectAnswer}
        />
        <h1>test1</h1>
        <QuizCard
          imgurl={quizPoke[i]?.sprites.back_default}
          onClick={InCorrectAnswer}
        />
      </>
    ) : (
      <>
        <QuizCard
          imgurl={quizPoke[i]?.sprites.back_default}
          onClick={InCorrectAnswer}
        />
        <h1>test2</h1>
        <QuizCard
          imgurl={quizPoke[i]?.sprites.back_female}
          onClick={CorrectAnswer}
        />
      </>
    )
  ) : null;
};

export default Quiz;
