import React from 'react';
import styled from 'styled-components';
import { PropertyFactory } from '../properties/PropertyFactory';
import { ApperanceStyle } from '../../types/AppearanceProperties';

const PanelContainer = styled.div`
  padding: 16px;
  border-bottom: 1px solid #ddd;
`;

interface AppearancePanelProps {
    properties: ApperanceStyle;
    onChange: (properties: ApperanceStyle) => void;
}

export const AppearancePanel: React.FC<AppearancePanelProps> = ({
    properties,
    onChange
}) => {
    const handlePropertyChange = (key: keyof ApperanceStyle, value: any) => {
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
                    onChange={(value) => handlePropertyChange(key as keyof ApperanceStyle, value)}
                />
            ))}
        </PanelContainer>
    );
}; 