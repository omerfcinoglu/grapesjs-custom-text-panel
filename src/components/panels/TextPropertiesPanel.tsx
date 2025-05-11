import React from 'react';
import styled from 'styled-components';
import { FontFamily } from '../properties/text/FontFamily';
import { FontSize } from '../properties/text/FontSize';
import { FontWeight } from '../properties/text/FontWeight';
import { TextCase } from '../properties/text/TextCase';
import { TextAlign } from '../properties/text/TextAlign';
import { useTextStyles } from '../../hooks/useTextStyles';

const PanelContainer = styled.div`
  padding: 16px;
  border-bottom: 1px solid #ddd;
`;

const Title = styled.h3`
  margin: 0 0 16px;
  font-size: 14px;
  color: #333;
`;

const PropertiesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
`;

interface TextPropertiesPanelProps {
    component: any; // GrapesJS component
    onChange?: (styles: any) => void;
}

export const TextPropertiesPanel: React.FC<TextPropertiesPanelProps> = ({
    component,
    onChange
}) => {
    const { styles, updateStyle } = useTextStyles({
        component,
        onChange
    });

    if (!component) return null;

    return (
        <PanelContainer>
            <Title>Text Properties</Title>
            <PropertiesGrid>
                <FontFamily
                    value={styles.fontFamily}
                    onChange={(value) => updateStyle('fontFamily', value)}
                />
                <FontSize
                    value={styles.fontSize}
                    onChange={(value) => updateStyle('fontSize', value)}
                />
                <FontWeight
                    value={styles.fontWeight}
                    onChange={(value) => updateStyle('fontWeight', value)}
                />
                <TextCase
                    value={styles.textCase}
                    onChange={(value) => updateStyle('textCase', value)}
                />
                <TextAlign
                    value={styles.textAlign}
                    onChange={(value) => updateStyle('textAlign', value)}
                />
            </PropertiesGrid>
        </PanelContainer>
    );
}; 