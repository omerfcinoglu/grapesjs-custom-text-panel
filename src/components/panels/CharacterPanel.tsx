import React from 'react';
import styled from 'styled-components';
import { CharacterProperties } from '../../types/TextProperties';
import { PropertyFactory } from '../properties/PropertyFactory';

const PanelContainer = styled.div`
  padding: 16px;
  border-bottom: 1px solid #ddd;
`;

const Title = styled.h3`
  margin: 0 0 16px;
  font-size: 14px;
  color: #333;
`;

interface CharacterPanelProps {
    properties: CharacterProperties;
    onChange: (properties: CharacterProperties) => void;
}

export const CharacterPanel: React.FC<CharacterPanelProps> = ({
    properties,
    onChange
}) => {
    const handlePropertyChange = (key: keyof CharacterProperties, value: any) => {
        onChange({
            ...properties,
            [key]: {
                ...properties[key],
                value
            }
        });
    };

    return (
        <PanelContainer>
            <Title>Character Properties</Title>
            {Object.entries(properties).map(([key, config]) => (
                <PropertyFactory
                    key={key}
                    config={config}
                    onChange={(value) => handlePropertyChange(key as keyof CharacterProperties, value)}
                />
            ))}
        </PanelContainer>
    );
}; 