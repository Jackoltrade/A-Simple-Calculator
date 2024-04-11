import { useInput, useInputUpdate } from "../providers/CalculationContext"
import React from "react";

export default function Display() {
    const input = useInput();
    const updateInput = useInputUpdate();
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateInput && updateInput(e.target.value);
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        (e.key === "e" || e.key === "E") && e.preventDefault();        
    }

    return (
        <input type="number" value={input} onChange={handleOnChange} onKeyDown={handleKeyDown}></input>
    )
}