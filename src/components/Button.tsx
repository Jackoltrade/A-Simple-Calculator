import { useInput, useInputUpdate, useCalculationUpdate } from "../providers/CalculationContext";

interface ButtonProps {
    type?: string;
    text?: string;
    isEqualPressed: boolean;
    setResult?: () => void;
    toggleIsEqualPressed: (value: boolean) => void;
}

export default function Button(props: ButtonProps) {
    const updateCalculation = useCalculationUpdate();
    const input = useInput();
    const updateInput = useInputUpdate();
    const isEqualPressed = props.isEqualPressed;
    const setResult = props.setResult;
    const toggleIsEqualPressed = props.toggleIsEqualPressed;

    // a delay function I copyed from Stack Overflow
    function timeout(delay: number) {
        return new Promise( res => setTimeout(res, delay) );
    }

    // when the operation buttons (+, -, *, /) clicked, it will...
    const handleCalculationButtons = async (operation: string) => {
        if (updateCalculation) {
            if (isEqualPressed) {
                updateCalculation("insert", operation);
                await timeout(500);
                toggleIsEqualPressed(false);
                return;
            }
            updateCalculation("insert", input);
            updateCalculation("insert", operation);
        }
    }

    const handleOnClick = () => {
        // if the button is reset input button, it will...
        if (props.text && props.text.toLowerCase() === "reset input") {
            updateInput && updateInput("");
            return;
        }
        if (updateCalculation) {
            // if the button is reset result button, it will...
            if (props.text && props.text.toLowerCase() === "reset result") {
                updateCalculation("reset");
                toggleIsEqualPressed(false);
                setResult && setResult();
                return;
            }
            // check if there's an input value in the text box, if not, the button click will be ignored
            if (!isEqualPressed && isNaN(parseFloat(input ?? "NaN"))) return;
            // update the calculation history with the input number and the operation (+, -, *, /)
            switch(props.type) {
                case "plus": 
                    handleCalculationButtons("+");
                    return;
                case "minus": 
                    handleCalculationButtons("-");
                    return;
                case "multiplication": 
                    handleCalculationButtons("*");
                    return;
                case "division": 
                    handleCalculationButtons("/");
                    return;
                case "equal": 
                    if (!isEqualPressed) {
                        updateCalculation("insert", input);
                        toggleIsEqualPressed(true);
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