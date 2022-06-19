import { Button } from "@mantine/core";
import { useEffect, useState } from "react";

export const EndPhase = ({ playersStatus }) => {
    const [isWin, setIsWin] = useState(false);
    useEffect(() => {
        playersStatus.plyerHp >= playersStatus.rivalHP && setIsWin(true);
    }, [])

    return (
        <div className="flex items-center justify-center">
            <Button className="h-96 w-96" variant="gradient" gradient={{ from: 'orange', to: 'red', deg: 35 }}>
                <p className="text-8xl">{isWin ? "勝利！" : "敗北..."}</p>
            </Button>
        </div>
    )
};