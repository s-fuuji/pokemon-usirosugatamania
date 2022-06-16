import { Paper, Text } from "@mantine/core";
import { useState } from "react"

export const DiceRollEffect = () => {
    const [count, setCount] = useState(1);

    const start = setInterval(() => { setCount(Math.floor(Math.random() * 6 + 1)) }, 100);
    const end = () => { clearInterval(start) }
    setTimeout(end, 2000);

    console.log(count);


    return <div><Paper shadow="xs" p="md">
        <Text>{count}</Text>
    </Paper></div>
}