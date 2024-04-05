import Display from "./Display"
import Button from "./Button"
import { useCalculation } from "../providers/CalculationContext";

export default function CalculatorBody() {
    const calculationSet = useCalculation();
    
    console.log(calculationSet);
    
    return (
        <div className="body">
            <div className="content">
                <section className="display">
                    <Display></Display>
                </section>
                <section className="buttons">
                    <div>
                        <Button text="Reset input"></Button>
                        <Button type="equal"></Button>
                    </div>
                    <div>
                        <Button type="plus"></Button>
                        <Button type="minus"></Button>
                    </div>
                    <div>
                        <Button type="multiplication"></Button>
                        <Button type="division"></Button>         
                    </div>
                    <div>
                        <Button text="Reset result"></Button>
                    </div>
                </section>
            </div>
        </div>
    )
}