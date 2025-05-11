import React from 'react';
import styled from 'styled-components';
import { StylePanelProps } from '../../types/StyleProperties';
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

const PropertiesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export interface BaseStylePanelProps extends StylePanelProps {
    title: string;
}

export const BaseStylePanel = React.memo<BaseStylePanelProps>(({
    title,
    properties,
    onChange
}) => {
    return (
        <PanelContainer>
            <Title>{title}</Title>
            <PropertiesContainer>
                {Object.entries(properties).map(([key, config]) => (
                    <PropertyFactory
                        key={key}
                        config={config}
                        onChange={(value) => onChange(key, value)}
                    />
                ))}
            </PropertiesContainer>
        </PanelContainer>
    );
}); 