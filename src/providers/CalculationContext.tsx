import { useState, createContext, useContext, ReactNode } from "react"

interface CalculationProviderProps {
    children: ReactNode
}

type UpdateFunctionType = (arg0: string) => void;

const CalculationContext = createContext<string[] | undefined>(undefined);
const CalculationUpdateContext = createContext<UpdateFunctionType | undefined>(undefined);

const initCalculation: string[] = [];

export function CalculationProvider({ children }: CalculationProviderProps) {
    const [calculation, setCalculation] = useState(initCalculation);
    const addCalculation = (operation: string) => {
        setCalculation([...calculation, operation]);
    }

    return (
        <CalculationContext.Provider value={calculation}>
            <CalculationUpdateContext.Provider value={addCalculation}>
                { children }
            </CalculationUpdateContext.Provider>
        </CalculationContext.Provider>
    )
}

export function useCalculation() {
    return useContext(CalculationContext);
}

export function useCalculationUpdate() {
    return useContext(CalculationUpdateContext);
}