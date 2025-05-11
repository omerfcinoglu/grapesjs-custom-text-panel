import React from 'react';
import styled from 'styled-components';
import { RadioGroup } from '../inputs/RadioGroup';

const PropertyContainer = styled.div`
  margin-bottom: 12px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 4px;
  font-size: 12px;
  color: #666;
`;

type TextCaseValue = 'none' | 'uppercase' | 'lowercase' | 'capitalize';

interface TextCaseProps {
    value: TextCaseValue;
    onChange: (value: TextCaseValue) => void;
}

const caseOptions = [
    { value: 'none', label: 'None' },
    { value: 'uppercase', label: 'Uppercase' },
    { value: 'lowercase', label: 'Lowercase' },
    { value: 'capitalize', label: 'Capitalize' }
];

export const TextCase: React.FC<TextCaseProps> = ({ value, onChange }) => {
    return (
        <PropertyContainer>
            <Label>Text Case</Label>
            <RadioGroup
                options={caseOptions}
                value={value}
                onChange={onChange as (value: string) => void}
            />
        </PropertyContainer>
    );
}; 