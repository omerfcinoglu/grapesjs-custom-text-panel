import React from 'react';
import styled from 'styled-components';
import { StrokeRow } from '../../types/TextProperties';
import { PropertyFactory } from '../properties/PropertyFactory';

const PanelContainer = styled.div`
  padding: 16px;
  border-bottom: 1px solid #ddd;
`;

interface StrokePanelProps {
    properties: StrokeRow;
    onChange: (properties: StrokeRow) => void;
    onToggle: () => void;
    isVisible: boolean;
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