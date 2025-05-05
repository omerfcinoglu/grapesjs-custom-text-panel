import React from 'react';
import styled from 'styled-components';
import { StrokeRow } from '../../types/TextProperties';
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

interface StrokePanelProps {
    properties: StrokeRow;
    onChange: (properties: StrokeRow) => void;
}

export const StrokePanel: React.FC<StrokePanelProps> = ({
    properties,
    onChange
}) => {
    const handlePropertyChange = (key: keyof StrokeRow, value: any) => {
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
            <Title>Stroke Properties</Title>
            {Object.entries(properties).map(([key, config]) => (
                <PropertyFactory
                    key={key}
                    config={config}
                    onChange={(value) => handlePropertyChange(key as keyof StrokeRow, value)}
                />
            ))}
        </PanelContainer>
    );
}; 