import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ChromePicker } from 'react-color';
import { useColorPicker } from '../../../hook/useColorPicker';

const ColorButton = styled.button<{ color: string }>`
  width: 32px;
  height: 32px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: ${props => props.color};
  cursor: pointer;
  position: relative;
`;

const ColorPickerContainer = styled.div`
  position: relative;
`;

const PopoverContainer = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  z-index: 1000;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

interface ColorPickerProps {
    value: string;
    onChange: (color: string) => void;
    options?: {
        allowGradient?: boolean;
        defaultMode?: 'solid' | 'gradient';
    };
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
    value,
    onChange,
    options = {}
}) => {
    const {
        color,
        isOpen,
        handleColorChange,
        togglePicker
    } = useColorPicker(value, onChange, options);

    const pickerRef = useRef<HTMLDivElement>(null);

    // Dışarı tıklamayı yönet
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
                togglePicker();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, togglePicker]);

    return (
        <ColorPickerContainer>
            <ColorButton
                color={color}
                onClick={togglePicker}
            />
            {isOpen && (
                <>
                    <Overlay onClick={togglePicker} />
                    <PopoverContainer isOpen={isOpen} ref={pickerRef}>
                        <ChromePicker
                            color={color}
                            onChange={(colorResult) => {
                                handleColorChange(colorResult.hex);
                            }}
                        />
                    </PopoverContainer>
                </>
            )}
        </ColorPickerContainer>
    );
};
