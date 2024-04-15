import Display from "./Display"
import Button from "./Button"
import { useCalculation, useInputUpdate } from "../providers/CalculationContext";
import { useState ,useEffect } from "react";

export default function CalculatorBody() {
    const calculationSet = useCalculation();
    const updateInput = useInputUpdate();
    const [result, setResult] = useState("0");
    const [isEqualPressed, setIsEqualPressed] = useState(false);

    const resetResult = () => {
        setResult("0");
    }

    const toggleIsEqualPressed = (value: boolean) => {
        setIsEqualPressed(value);
    }
    
    // perform calculation once the calculation history has new input
    useEffect(() => {
        console.log("history:", calculationSet);
        console.log("is equal pressed:", isEqualPressed);
        if (!calculationSet) return;
        // if the equal button is pressed after some previous calculation
        if (!isNaN(parseFloat(calculationSet.at(-1) ?? "NaN"))) {
            if (isEqualPressed && calculationSet.length >= 5) {
                setResult(doCalculate(calculationSet.at(-2), result, calculationSet.at(-1)));
                updateInput && updateInput("");
                return;
            }
            // if the equal button is pressed after some previous calculation
            if (isEqualPressed && calculationSet.length == 3) {
                setResult(doCalculate(calculationSet.at(-2), calculationSet.at(-3), calculationSet.at(-1)));
                updateInput && updateInput("");
                return;
            }
            return
        }
        // if it's not the first calculation, it will read the base value from previously calculated result
        if (!isEqualPressed && calculationSet.length >= 6) {
            setResult(doCalculate(calculationSet.at(-3), result, calculationSet.at(-2)));
            updateInput && updateInput("");
            return;
        }
        // if it's the first calculation, it will read the base value from first value of calculation history
        if (!isEqualPressed && calculationSet.length == 4) {
            setResult(doCalculate(calculationSet.at(-3), calculationSet.at(-4), calculationSet.at(-2)));
            updateInput && updateInput("");
            return;
        }
        updateInput && updateInput("");
    },[calculationSet])

    // the actual function to perform calculation
    const doCalculate = (operation?: string, first?: string, second?: string) => {
        const firstNum = parseFloat(first ?? "NaN");
        const secondNum = parseFloat(second ?? "NaN");
        if (operation && !isNaN(firstNum) && !isNaN(secondNum)) {
            switch(operation) {
                case "+": return (firstNum + secondNum).toString();
                case "-": return (firstNum - secondNum).toString();
                case "*": return (firstNum * secondNum).toString();
                case "/": return (firstNum / secondNum).toString();
                default: return "";
            }
        }
        return "";
    }
    
    return (
        <div className="body">
            <div className="content">
                <section className="display">
                    <summary>{result}</summary>
                    <Display></Display>
                </section>
                <section className="buttons">
                    <div>
                        <Button text="Reset input" isEqualPressed={isEqualPressed} toggleIsEqualPressed={toggleIsEqualPressed}></Button>
                        <Button type="equal" isEqualPressed={isEqualPressed} toggleIsEqualPressed={toggleIsEqualPressed}></Button>
                    </div>
                    <div>
                        <Button type="plus" isEqualPressed={isEqualPressed} toggleIsEqualPressed={toggleIsEqualPressed}></Button>
                        <Button type="minus" isEqualPressed={isEqualPressed} toggleIsEqualPressed={toggleIsEqualPressed}></Button>
                    </div>
                    <div>
                        <Button type="multiplication" isEqualPressed={isEqualPressed} toggleIsEqualPressed={toggleIsEqualPressed}></Button>
                        <Button type="division" isEqualPressed={isEqualPressed} toggleIsEqualPressed={toggleIsEqualPressed}></Button>         
                    </div>
                    <div>
                        <Button text="Reset result" isEqualPressed={isEqualPressed} setResult={resetResult} toggleIsEqualPressed={toggleIsEqualPressed}></Button>
                    </div>
                </section>
            </div>
        </div>
    )
}