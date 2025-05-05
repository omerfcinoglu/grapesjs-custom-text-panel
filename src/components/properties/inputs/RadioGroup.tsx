import React from 'react';
import styled from 'styled-components';

const RadioContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;

const RadioInput = styled.input`
  cursor: pointer;
`;

interface RadioGroupProps {
    options: Array<{ value: string; label: string }>;
    value: string;
    onChange: (value: string) => void;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
    options,
    value,
    onChange
}) => {
    return (
        <RadioContainer>
            {options.map(option => (
                <RadioLabel key={option.value}>
                    <RadioInput
                        type="radio"
                        checked={value === option.value}
                        onChange={() => onChange(option.value)}
                    />
                    {option.label}
                </RadioLabel>
            ))}
        </RadioContainer>
    );
};
