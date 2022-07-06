import { Button, Paper } from '@mantine/core'
import { useDispatch } from 'react-redux'
import React from 'react'
import { setTriedQuizResullt } from '../../../../slicer/triedQuizSlicer'

type Props = {
  correctAnswersCount: number
  allQuestionNum: number
}

export const AfterClearQuiz: React.FC<Props> = ({
  correctAnswersCount,
  allQuestionNum,
}) => {
  const dispatch = useDispatch()
  const resultSave = (): void => {
    dispatch(setTriedQuizResullt({ correctAnswersCount, allQuestionNum }))
  }

  return (
    <div className="mt-24 text-center ">
      <div>
        <Button
          className="h-28 text-5xl rounded-full px-11"
          onClick={() => resultSave()}
          variant="gradient"
          gradient={{ from: 'yellow', to: 'red' }}
          style={{ marginBottom: 30 }}
        >
          結果を保存
        </Button>
        <Button
          className="h-28 text-5xl rounded-full px-11"
          onClick={() => window.location.reload()}
          variant="gradient"
          gradient={{ from: 'yellow', to: 'red' }}
          style={{ marginBottom: 30 }}
        >
          もう一度
        </Button>
      </div>
      <Paper className="inline-block bg-red-600 text-5xl text-white mt-20 p-5 rounded-2xl">
        {allQuestionNum}問中{correctAnswersCount}
        問正解！
      </Paper>
    </div>
  )
}
