import React, { useState } from 'react';
import Button from '../button/button';
import Display from '../display/display';
import '../../assets/css/calculator.css';

const CalculatorMain = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [currentInput, setCurrentInput] = useState('');
  const [operator, setOperator] = useState('');

  const handleButtonClick = (label) => {
    console.log('Button clicked:', label);
    switch (label) {
      case 'C':
        // Clear the calculator
        setDisplayValue('0');
        setCurrentInput('');
        setOperator('');
        break;
      case '=':
        // Calculate the result
        calculateResult();
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        // Set the operator
        setOperator(label);
        setCurrentInput(currentInput + ' ' + label + ' ');
        break;
      default:
        // Update the current input
        setCurrentInput(currentInput + label);
        break;
    }
    console.log('Updated State:', {
      displayValue,
      currentInput,
      operator,
    });
  };

  const calculateResult = () => {
    console.log('Calculating result...');
    try {
      const calculate = new Function('return ' + currentInput);
      const result = calculate();
      setDisplayValue(result.toString());
      setCurrentInput(result.toString());
      setOperator('');
    } catch (error) {
      setDisplayValue('Error');
      setCurrentInput('');
      setOperator('');
    }
  };

  return (
    <div className="calculator">
      <Display value={displayValue} />
      <div className="buttons">
        {/* Numeric buttons */}
        {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((number) => (
          <Button key={number} label={number.toString()} onClick={handleButtonClick} />
        ))}
        {/* Operator buttons */}
        {['+', '-', '*', '/'].map((operator) => (
          <Button key={operator} label={operator} onClick={handleButtonClick} />
        ))}
        {/* Other buttons */}
        <Button label="C" onClick={handleButtonClick} />
        <Button label="=" onClick={handleButtonClick} />
      </div>
    </div>
  );
};

export default CalculatorMain;
