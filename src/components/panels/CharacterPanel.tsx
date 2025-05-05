import React from 'react';
import styled from 'styled-components';
import { CharacterProperties } from '../../types/TextProperties';

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

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

interface CharacterPanelProps {
    properties: CharacterProperties;
    onChange: (properties: CharacterProperties) => void;
}

export const CharacterPanel: React.FC<CharacterPanelProps> = ({
    properties,
    onChange,
}) => {
    const handleChange = (field: keyof CharacterProperties, value: string) => {
        onChange({
            ...properties,
            [field]: value,
        });
    };

    return (
        <PanelContainer>
            <h3>Character Properties</h3>

            <InputGroup>
                <Label>Font Size</Label>
                <Input
                    type="text"
                    value={properties.fontSize}
                    onChange={(e) => handleChange('fontSize', e.target.value)}
                    placeholder="e.g., 16px, 1.2em"
                />
            </InputGroup>

            <InputGroup>
                <Label>Font Weight</Label>
                <Select
                    value={properties.fontWeight}
                    onChange={(e) => handleChange('fontWeight', e.target.value)}
                >
                    <option value="normal">Normal</option>
                    <option value="bold">Bold</option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="300">300</option>
                    <option value="400">400</option>
                    <option value="500">500</option>
                    <option value="600">600</option>
                    <option value="700">700</option>
                    <option value="800">800</option>
                    <option value="900">900</option>
                </Select>
            </InputGroup>

            <InputGroup>
                <Label>Font Family</Label>
                <Select
                    value={properties.fontFamily}
                    onChange={(e) => handleChange('fontFamily', e.target.value)}
                >
                    <option value="Arial">Arial</option>
                    <option value="Helvetica">Helvetica</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Verdana">Verdana</option>
                    <option value="monospace">Monospace</option>
                </Select>
            </InputGroup>
        </PanelContainer>
    );
}; 