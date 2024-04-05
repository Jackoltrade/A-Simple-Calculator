import { useCalculationUpdate } from "../providers/CalculationContext";



interface ButtonProps {
    type?: string;
    text?: string;
}

export default function Button(props: ButtonProps) {
    const updateCalculation = useCalculationUpdate();

    const handleOnClick = () => {
        if (updateCalculation) {
            updateCalculation("NOONOONOOOOO"); 
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