import { Dispatch, SetStateAction } from "react";

export type setBoolean = Dispatch<SetStateAction<boolean>>

type end = setBoolean
type start = setBoolean;
export const PhaseChange = (end: end, start: start) => {
    end(false);
    start(true);
}
