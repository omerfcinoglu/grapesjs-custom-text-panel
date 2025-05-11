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

interface FontSizeProps {
    value: number;
    onChange: (value: number) => void;
}

export const FontSize: React.FC<FontSizeProps> = ({ value, onChange }) => {
    return (
        <PropertyContainer>
            <Label>Font Size</Label>
            <NumericInput
                value={value}
                onChange={onChange}
                options={{
                    min: 1,
                    max: 200,
                    step: 1
                }}
            />
        </PropertyContainer>
    );
}; 