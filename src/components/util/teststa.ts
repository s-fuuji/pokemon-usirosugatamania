import { useState } from "react"

export const TestState = () => {
    const [tests, setTests] = useState(1)



    return { tests, setTests }
}