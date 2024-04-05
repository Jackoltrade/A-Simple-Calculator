import './App.css';
import CalculatorBody from './components/CalculatorBody';
import { CalculationProvider } from './providers/CalculationContext';

function App() {
  return (
    <div className="App">
      <div className="container">
        <CalculationProvider>
          <CalculatorBody></CalculatorBody>
        </CalculationProvider>
      </div>
    </div>
  );
}

export default App;
