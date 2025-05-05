// src/components/properties/inputs/NumericInput.tsx
import React from 'react';
import styled from 'styled-components';
import { useNumericInput } from '../../../hook/useNumericInput';

const InputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 60px;
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const StepperContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 4px;
`;

const StepButton = styled.button`
  padding: 2px 4px;
  border: 1px solid #ddd;
  background: #fff;
  cursor: pointer;
  &:hover {
    background: #f5f5f5;
  }
`;

interface NumericInputProps {
    value: number;
    onChange: (value: number) => void;
    options?: {
        min?: number;
        max?: number;
        step?: number;
        unit?: string;
    };
}

export const NumericInput: React.FC<NumericInputProps> = ({
    value,
    onChange,
    options = {}
}) => {
    const {
        displayValue,
        handleChange,
        handleBlur,
        increment,
        decrement
    } = useNumericInput(value, onChange, options);

    return (
        <InputContainer>
            <Input
                type="text"
                value={displayValue}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <StepperContainer>
                <StepButton onClick={increment}>▲</StepButton>
                <StepButton onClick={decrement}>▼</StepButton>
            </StepperContainer>
        </InputContainer>
    );
};