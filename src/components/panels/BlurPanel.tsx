import React from 'react';
import styled from 'styled-components';
import { BlurProperties } from '../../types/TextProperties';
import { PropertyFactory } from '../properties/PropertyFactory';

const PanelContainer = styled.div`
  padding: 16px;
  border-bottom: 1px solid #ddd;
`;

interface BlurPanelProps {
    properties: BlurProperties;
    onChange: (properties: BlurProperties) => void;
    onToggle: () => void;
    isVisible: boolean;
}

export const BlurPanel: React.FC<BlurPanelProps> = ({
    properties,
    onChange
}) => {
    const handlePropertyChange = (key: keyof BlurProperties, value: any) => {
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
                    onChange={(value) => handlePropertyChange(key as keyof BlurProperties, value)}
                />
            ))}
        </PanelContainer>
    );
};
