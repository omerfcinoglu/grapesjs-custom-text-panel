import React from 'react';
import styled from 'styled-components';
import { DropDownMenu } from '../inputs/DropDownMenu';

const PropertyContainer = styled.div`
  margin-bottom: 12px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 4px;
  font-size: 12px;
  color: #666;
`;

interface FontFamilyProps {
    value: string;
    onChange: (value: string) => void;
}

const fontFamilyOptions = [
    { value: 'Arial', label: 'Arial' },
    { value: 'Helvetica', label: 'Helvetica' },
    { value: 'Times New Roman', label: 'Times New Roman' },
    { value: 'Georgia', label: 'Georgia' },
];

export const FontFamily: React.FC<FontFamilyProps> = ({ value, onChange }) => {
    return (
        <PropertyContainer>
            <Label>Font Family</Label>
            <DropDownMenu
                items={fontFamilyOptions}
                selectedItem={value}
                onSelect={onChange}
            />
        </PropertyContainer>
    );
}; 