import React from 'react';
import styled from 'styled-components';
import { TextStyle } from '../../types/TextProperties';
import { CharacterPanel } from './CharacterPanel';
import { FillPanel } from './FillPanel';
import { StrokePanel } from './StrokePanel';
import { ShadowPanel } from './ShadowPanel';
import { BlurPanel } from './BlurPanel';

const PanelContainer = styled.div`
  height: 100%;
  overflow-y: auto;
`;

interface StylePanelProps {
    style: TextStyle;
    onStyleChange: (style: TextStyle) => void;
}

export const StylePanel: React.FC<StylePanelProps> = ({ style, onStyleChange }) => {
    const handleCharacterChange = (character: TextStyle['character']) => {
        onStyleChange({ ...style, character });
    };

    const handleFillChange = (fill: TextStyle['fill']) => {
        onStyleChange({ ...style, fill });
    };

    const handleStrokeChange = (stroke: TextStyle['stroke']) => {
        onStyleChange({ ...style, stroke });
    };

    const handleShadowChange = (shadow: TextStyle['shadow']) => {
        onStyleChange({ ...style, shadow });
    };

    const handleBlurChange = (blur: TextStyle['blur']) => {
        onStyleChange({ ...style, blur });
    };

    return (
        <PanelContainer>
            <CharacterPanel
                properties={style.character}
                onChange={handleCharacterChange}
            />
            <FillPanel
                properties={style.fill}
                onChange={handleFillChange}
            />
            <StrokePanel
                properties={style.stroke}
                onChange={handleStrokeChange}
            />
            <ShadowPanel
                properties={style.shadow}
                onChange={handleShadowChange}
            />
            <BlurPanel
                properties={style.blur}
                onChange={handleBlurChange}
            />
        </PanelContainer>
    );
}; 