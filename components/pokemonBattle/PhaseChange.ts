import { Dispatch, SetStateAction } from "react";

export const PhaseChange = (end: Dispatch<SetStateAction<boolean>>, start: Dispatch<SetStateAction<boolean>>): void => {
    end(false);
    start(true);
}
