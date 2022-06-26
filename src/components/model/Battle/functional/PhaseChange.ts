import { Dispatch, SetStateAction } from 'react'

export const PhaseChange = (
  phaseEnd: Dispatch<SetStateAction<boolean>>,
  phaseStart: Dispatch<SetStateAction<boolean>>
): void => {
  phaseEnd(false)
  phaseStart(true)
}
