import React from 'react';
import styled from 'styled-components';
import { NumericInput } from '../inputs/NumericInput';

const PropertyContainer = styled.div`
  margin-bottom: 12px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 4px;
  font-size: 12px;
  color: #666;
`;

interface FontWeightProps {
    value: number;
    onChange: (value: number) => void;
}

export const FontWeight: React.FC<FontWeightProps> = ({ value, onChange }) => {
    return (
        <PropertyContainer>
            <Label>Font Weight</Label>
            <NumericInput
                value={value}
                onChange={onChange}
                options={{
                    min: 100,
                    max: 900,
                    step: 100
                }}
            />
        </PropertyContainer>
    );
}; 