import React from 'react';
import styled from 'styled-components';
import { StrokeProperties } from '../../types/TextProperties';

const PanelContainer = styled.div`
  padding: 15px;
  border-bottom: 1px solid #ddd;
`;

const InputGroup = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 12px;
  color: #666;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

interface StrokePanelProps {
    properties: StrokeProperties;
    onChange: (properties: StrokeProperties) => void;
}

export const StrokePanel: React.FC<StrokePanelProps> = ({
    properties,
    onChange,
}) => {
    const handleChange = (field: keyof StrokeProperties, value: string | number) => {
        onChange({
            ...properties,
            [field]: value,
        });
    };

    return (
        <PanelContainer>
            <h3>Stroke Properties</h3>

            <InputGroup>
                <Label>Width (px)</Label>
                <Input
                    type="number"
                    min="0"
                    max="10"
                    value={properties.width}
                    onChange={(e) => handleChange('width', parseInt(e.target.value))}
                />
            </InputGroup>

            <InputGroup>
                <Label>Color</Label>
                <Input
                    type="color"
                    value={properties.color}
                    onChange={(e) => handleChange('color', e.target.value)}
                />
            </InputGroup>

            <InputGroup>
                <Label>Opacity ({properties.opacity})</Label>
                <Input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={properties.opacity}
                    onChange={(e) => handleChange('opacity', parseFloat(e.target.value))}
                />
            </InputGroup>
        </PanelContainer>
    );
}; 