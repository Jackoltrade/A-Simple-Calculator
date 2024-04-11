import { useState, createContext, useContext, ReactNode } from "react"

interface CalculationProviderProps {
    children: ReactNode
}

type UpdateFunctionType = (arg0: string, arg1?: string) => void;
type UpdateInputType = (arg0: string) => void;

const InputContext = createContext<string | undefined>(undefined);
const InputUpdateContext = createContext<UpdateInputType | undefined>(undefined);

const CalculationContext = createContext<string[] | undefined>(undefined);
const CalculationUpdateContext = createContext<UpdateFunctionType | undefined>(undefined);

const initCalculation: string[] = [];

export function CalculationProvider({ children }: CalculationProviderProps) {
    // create both input and calculation history context
    const [input, setInput] = useState("");
    const [calculation, setCalculation] = useState(initCalculation);

    // define the operation to update both input and calcualtion history
    const modifyInput = (newInput: string) => {
        setInput(newInput);
    }
    const modifyCalculation = (operationType: string, operation?: string) => {
        switch(operationType) {
            case "insert": 
                try {
                    if (operation) {
                        setCalculation(prevCal => ([...prevCal, operation]));
                        return;
                    }
                    throw("Wrong button operation!");
                } catch (error) {
                    console.log(error);
                }
                return;
            case "reset": setCalculation([]);
                return;
            default:
                console.log("Wrong button operation type!");           
        }
    }

    return (
        <CalculationContext.Provider value={calculation}>
            <CalculationUpdateContext.Provider value={modifyCalculation}>
                <InputContext.Provider value={input}>
                    <InputUpdateContext.Provider value={modifyInput}>
                        { children }
                    </InputUpdateContext.Provider>
                </InputContext.Provider>
            </CalculationUpdateContext.Provider>
        </CalculationContext.Provider>
    )
}

export function useInput() {
    return useContext(InputContext);
}
export function useInputUpdate() {
    return useContext(InputUpdateContext);
}

export function useCalculation() {
    return useContext(CalculationContext);
}
export function useCalculationUpdate() {
    return useContext(CalculationUpdateContext);
}