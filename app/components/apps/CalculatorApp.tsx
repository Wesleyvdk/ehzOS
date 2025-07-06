import React, { useState } from 'react';

export default function CalculatorApp() {
    const [display, setDisplay] = useState('0');
    const [previousValue, setPreviousValue] = useState<number | null>(null);
    const [operation, setOperation] = useState<string | null>(null);
    const [waitingForNewValue, setWaitingForNewValue] = useState(false);

    const inputNumber = (num: string) => {
        if (waitingForNewValue) {
            setDisplay(num);
            setWaitingForNewValue(false);
        } else {
            setDisplay(display === '0' ? num : display + num);
        }
    };

    const inputOperation = (nextOperation: string) => {
        const inputValue = parseFloat(display);

        if (previousValue === null) {
            setPreviousValue(inputValue);
        } else if (operation) {
            const currentValue = previousValue || 0;
            const newValue = calculate(currentValue, inputValue, operation);

            setDisplay(String(newValue));
            setPreviousValue(newValue);
        }

        setWaitingForNewValue(true);
        setOperation(nextOperation);
    };

    const calculate = (firstValue: number, secondValue: number, operation: string) => {
        switch (operation) {
            case '+':
                return firstValue + secondValue;
            case '-':
                return firstValue - secondValue;
            case '×':
                return firstValue * secondValue;
            case '÷':
                return firstValue / secondValue;
            case '=':
                return secondValue;
            default:
                return secondValue;
        }
    };

    const performCalculation = () => {
        const inputValue = parseFloat(display);

        if (previousValue !== null && operation) {
            const newValue = calculate(previousValue, inputValue, operation);
            setDisplay(String(newValue));
            setPreviousValue(null);
            setOperation(null);
            setWaitingForNewValue(true);
        }
    };

    const clear = () => {
        setDisplay('0');
        setPreviousValue(null);
        setOperation(null);
        setWaitingForNewValue(false);
    };

    const clearEntry = () => {
        setDisplay('0');
    };

    const backspace = () => {
        if (display.length > 1) {
            setDisplay(display.slice(0, -1));
        } else {
            setDisplay('0');
        }
    };

    const toggleSign = () => {
        if (display !== '0') {
            setDisplay(display.startsWith('-') ? display.slice(1) : '-' + display);
        }
    };

    const percentage = () => {
        const value = parseFloat(display) / 100;
        setDisplay(String(value));
    };

    const decimal = () => {
        if (waitingForNewValue) {
            setDisplay('0.');
            setWaitingForNewValue(false);
        } else if (display.indexOf('.') === -1) {
            setDisplay(display + '.');
        }
    };

    const Button = ({ onClick, className = '', children, span = 1 }: {
        onClick: () => void;
        className?: string;
        children: React.ReactNode;
        span?: number;
    }) => {
        const baseClasses = "h-12 rounded border border-gray-600 font-medium text-base cursor-pointer transition-all duration-100 flex items-center justify-center hover:bg-gray-600";
        const typeClasses = className === 'operator' ? 'bg-blue-600 text-white hover:bg-blue-700' :
            className === 'equals' ? 'bg-blue-600 text-white hover:bg-blue-700 text-xl' :
                className === 'function' ? 'bg-gray-700 text-white hover:bg-gray-600' :
                    'bg-gray-800 text-white hover:bg-gray-700';

        return (
            <button
                onClick={onClick}
                className={`${baseClasses} ${typeClasses}`}
                style={{
                    gridColumn: span > 1 ? `span ${span}` : undefined,
                }}
            >
                {children}
            </button>
        );
    };

    return (
        <div className="w-full h-full p-5 bg-gray-900 text-white font-sans">
            {/* Display */}
            <div className="bg-gray-800 border border-gray-600 rounded-lg p-5 mb-5 text-right text-3xl font-light min-h-[60px] flex items-center justify-end break-all overflow-hidden">
                {display}
            </div>

            {/* Buttons Grid */}
            <div className="grid grid-cols-4 gap-2 h-[calc(100%-120px)]">
                {/* Row 1: Memory and Clear */}
                <Button onClick={percentage} className="function">%</Button>
                <Button onClick={clearEntry} className="function">CE</Button>
                <Button onClick={clear} className="function">C</Button>
                <Button onClick={backspace} className="function">⌫</Button>

                {/* Row 2: 1/x, x², √, ÷ */}
                <Button onClick={() => {
                    const value = 1 / parseFloat(display);
                    setDisplay(String(value));
                }} className="function">1/x</Button>
                <Button onClick={() => {
                    const value = Math.pow(parseFloat(display), 2);
                    setDisplay(String(value));
                }} className="function">x²</Button>
                <Button onClick={() => {
                    const value = Math.sqrt(parseFloat(display));
                    setDisplay(String(value));
                }} className="function">√x</Button>
                <Button onClick={() => inputOperation('÷')} className="operator">÷</Button>

                {/* Row 3: 7, 8, 9, × */}
                <Button onClick={() => inputNumber('7')}>7</Button>
                <Button onClick={() => inputNumber('8')}>8</Button>
                <Button onClick={() => inputNumber('9')}>9</Button>
                <Button onClick={() => inputOperation('×')} className="operator">×</Button>

                {/* Row 4: 4, 5, 6, - */}
                <Button onClick={() => inputNumber('4')}>4</Button>
                <Button onClick={() => inputNumber('5')}>5</Button>
                <Button onClick={() => inputNumber('6')}>6</Button>
                <Button onClick={() => inputOperation('-')} className="operator">-</Button>

                {/* Row 5: 1, 2, 3, + */}
                <Button onClick={() => inputNumber('1')}>1</Button>
                <Button onClick={() => inputNumber('2')}>2</Button>
                <Button onClick={() => inputNumber('3')}>3</Button>
                <Button onClick={() => inputOperation('+')} className="operator">+</Button>

                {/* Row 6: ±, 0, ., = */}
                <Button onClick={toggleSign} className="function">±</Button>
                <Button onClick={() => inputNumber('0')}>0</Button>
                <Button onClick={decimal}>.</Button>
                <Button onClick={performCalculation} className="equals">=</Button>
            </div>
        </div>
    );
} 