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

type TextAlignValue = 'left' | 'center' | 'right' | 'justify';

interface TextAlignProps {
    value: TextAlignValue;
    onChange: (value: TextAlignValue) => void;
}

const alignOptions = [
    { value: 'left', label: 'Left' },
    { value: 'center', label: 'Center' },
    { value: 'right', label: 'Right' },
    { value: 'justify', label: 'Justify' }
];

export const TextAlign: React.FC<TextAlignProps> = ({ value, onChange }) => {
    return (
        <PropertyContainer>
            <Label>Text Align</Label>
            <RadioGroup
                options={alignOptions}
                value={value}
                onChange={onChange as (value: string) => void}
            />
        </PropertyContainer>
    );
}; 