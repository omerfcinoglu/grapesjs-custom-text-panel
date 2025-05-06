import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ComponentStyles } from '../../types/ComponentStyles';
import { CharacterPanel } from './CharacterPanel';
import { FillPanel } from './FillPanel';
import { StrokePanel } from './StrokePanel';
import { ShadowPanel } from './ShadowPanel';
import { BlurPanel } from './BlurPanel';
import { AppearancePanel } from './AppearancePanel';

const PanelContainer = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #ddd;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 14px;
  color: #333;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 18px;
  padding: 0 8px;
  
  &:hover {
    color: #333;
  }
`;

interface StylePanelProps {
    style: ComponentStyles;
    onStyleChange: (style: ComponentStyles) => void;
    componentId: string;
}

interface PanelVisibility {
    [componentId: string]: {
        stroke: boolean;
        shadow: boolean;
        blur: boolean;
        appearance: boolean;
    };
}

const panelVisibilityState: PanelVisibility = {};

export const StylePanel: React.FC<StylePanelProps> = ({ style, onStyleChange, componentId }) => {
    const [panelVisibility, setPanelVisibility] = useState({
        stroke: false,
        shadow: false,
        blur: false,
        appearance: false
    });

    useEffect(() => {
        if (panelVisibilityState[componentId]) {
            setPanelVisibility(panelVisibilityState[componentId]);
        } else {
            panelVisibilityState[componentId] = {
                stroke: false,
                shadow: false,
                blur: false,
                appearance: false
            };
        }
    }, [componentId]);

    const togglePanel = (panel: 'stroke' | 'shadow' | 'blur' | 'appearance') => {
        const newVisibility = {
            ...panelVisibility,
            [panel]: !panelVisibility[panel]
        };
        setPanelVisibility(newVisibility);
        panelVisibilityState[componentId] = newVisibility;
    };

    const handleCharacterChange = (character: ComponentStyles['text']['character']) => {
        onStyleChange({ ...style, text: { ...style.text, character } });
    };

    const handleFillChange = (fill: ComponentStyles['text']['fill']) => {
        onStyleChange({ ...style, text: { ...style.text, fill } });
    };

    const handleStrokeChange = (stroke: ComponentStyles['text']['stroke']) => {
        onStyleChange({ ...style, text: { ...style.text, stroke } });
    };

    const handleShadowChange = (shadow: ComponentStyles['text']['shadow']) => {
        onStyleChange({ ...style, text: { ...style.text, shadow } });
    };

    const handleBlurChange = (blur: ComponentStyles['text']['blur']) => {
        onStyleChange({ ...style, text: { ...style.text, blur } });
    };

    const handleAppearanceChange = (appearance: ComponentStyles['appearance']) => {
        onStyleChange({ ...style, appearance });
    };

    return (
        <PanelContainer>
            <CharacterPanel
                properties={style.text.character}
                onChange={handleCharacterChange}
            />
            <FillPanel
                properties={style.text.fill}
                onChange={handleFillChange}
            />
            <div>
                <PanelHeader>
                    <Title>Stroke Properties</Title>
                    <ToggleButton onClick={() => togglePanel('stroke')}>
                        {panelVisibility.stroke ? '−' : '+'}
                    </ToggleButton>
                </PanelHeader>
                {panelVisibility.stroke && (
                    <StrokePanel
                        properties={style.text.stroke}
                        onChange={handleStrokeChange}
                        onToggle={() => togglePanel('stroke')}
                        isVisible={panelVisibility.stroke}
                    />
                )}
            </div>
            <div>
                <PanelHeader>
                    <Title>Shadow Properties</Title>
                    <ToggleButton onClick={() => togglePanel('shadow')}>
                        {panelVisibility.shadow ? '−' : '+'}
                    </ToggleButton>
                </PanelHeader>
                {panelVisibility.shadow && (
                    <ShadowPanel
                        properties={style.text.shadow}
                        onChange={handleShadowChange}
                        onToggle={() => togglePanel('shadow')}
                        isVisible={panelVisibility.shadow}
                    />
                )}
            </div>
            <div>
                <PanelHeader>
                    <Title>Blur Properties</Title>
                    <ToggleButton onClick={() => togglePanel('blur')}>
                        {panelVisibility.blur ? '−' : '+'}
                    </ToggleButton>
                </PanelHeader>
                {panelVisibility.blur && (
                    <BlurPanel
                        properties={style.text.blur}
                        onChange={handleBlurChange}
                        onToggle={() => togglePanel('blur')}
                        isVisible={panelVisibility.blur}
                    />
                )}
            </div>
            <div>
                <PanelHeader>
                    <Title>Appearance Properties</Title>
                    <ToggleButton onClick={() => togglePanel('appearance')}>
                        {panelVisibility.appearance ? '−' : '+'}
                    </ToggleButton>
                </PanelHeader>
                {panelVisibility.appearance && (
                    <AppearancePanel
                        properties={style.appearance}
                        onChange={handleAppearanceChange}
                    />
                )}
            </div>
        </PanelContainer>
    );
}; 