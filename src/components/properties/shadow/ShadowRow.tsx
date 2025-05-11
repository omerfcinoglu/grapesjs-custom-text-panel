import React from 'react';
import styled from 'styled-components';
import { ColorPicker } from '../inputs/ColorPicker';
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

const ShadowGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

interface ShadowValues {
    color: string;
    offsetX: number;
    offsetY: number;
    blur: number;
    opacity: number;
}

interface ShadowRowProps {
    values: ShadowValues;
    onChange: (values: Partial<ShadowValues>) => void;
}

export const ShadowRow: React.FC<ShadowRowProps> = ({ values, onChange }) => {
    const handleChange = (key: keyof ShadowValues, value: any) => {
        onChange({ [key]: value });
    };

    return (
        <PropertyContainer>
            <Label>Shadow</Label>
            <ShadowGrid>
                <div>
                    <Label>Color</Label>
                    <ColorPicker
                        value={values.color}
                        onChange={(value) => handleChange('color', value)}
                        options={{
                            allowGradient: false,
                        }}
                    />
                </div>
                <div>
                    <Label>Opacity</Label>
                    <NumericInput
                        value={values.opacity}
                        onChange={(value) => handleChange('opacity', value)}
                        options={{ min: 0, max: 1, step: 0.01 }}
                    />
                </div>
                <div>
                    <Label>X Offset</Label>
                    <NumericInput
                        value={values.offsetX}
                        onChange={(value) => handleChange('offsetX', value)}
                        options={{ min: -50, max: 50, step: 1 }}
                    />
                </div>
                <div>
                    <Label>Y Offset</Label>
                    <NumericInput
                        value={values.offsetY}
                        onChange={(value) => handleChange('offsetY', value)}
                        options={{ min: -50, max: 50, step: 1 }}
                    />
                </div>
                <div>
                    <Label>Blur</Label>
                    <NumericInput
                        value={values.blur}
                        onChange={(value) => handleChange('blur', value)}
                        options={{ min: 0, max: 50, step: 1 }}
                    />
                </div>
            </ShadowGrid>
        </PropertyContainer>
    );
}; 