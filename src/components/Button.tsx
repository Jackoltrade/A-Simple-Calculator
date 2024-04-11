import { useCalculationUpdate } from "../providers/CalculationContext";
import { useInput, useInputUpdate } from "../providers/CalculationContext"

interface ButtonProps {
    type?: string;
    text?: string;
}

export default function Button(props: ButtonProps) {
    const updateCalculation = useCalculationUpdate();
    const input = useInput();
    const updateInput = useInputUpdate();
    const resetInput= () => {
        updateInput && updateInput("");
    }

    const handleOnClick = () => {
        if (props.text && props.text.toLowerCase() === "reset input") {
            resetInput();
            return;
        }
        if (updateCalculation) {
            if (props.text && props.text.toLowerCase() === "reset result") {
                updateCalculation("reset")
                return;
            }
            if (isNaN(parseFloat(input ?? "0"))) return;
            switch(props.type) {
                case "plus": 
                    if (input) {
                        updateCalculation("insert", input);
                        updateCalculation("insert", "+");
                        resetInput();
                    }
                    return;
                case "minus": 
                    if (input) {
                        updateCalculation("insert", input);
                        updateCalculation("insert", "-");
                        resetInput();
                    }
                    return;
                case "multiplication": 
                    if (input) {
                        updateCalculation("insert", input);
                        updateCalculation("insert", "*");
                        resetInput();
                    }
                        return;
                case "division": 
                    if (input) {
                        updateCalculation("insert", input);
                        updateCalculation("insert", "/");
                        resetInput();
                    }
                    return;
                default: return;
            }
        }
    }

    return (
        <button onClick={handleOnClick}>
            {
                (() => {
                    if (props.text) {
                        return props.text
                    }
                    switch(props.type) {
                        case "plus": return <span>&#43;</span>;
                        case "minus": return <span>&#8722;</span>;
                        case "multiplication": return <span>&#215;</span>;
                        case "division": return <span>&#247;</span>;
                        case "equal": return <span>&#61;</span>;
                        default: return null;
                    }
                })()
            }
        </button>
    )
}