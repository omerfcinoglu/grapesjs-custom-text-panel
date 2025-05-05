import React, { memo } from 'react';
import styled from 'styled-components';
import { PropertyConfig } from '../../types/TextProperties';
import { ColorPicker } from './inputs/ColorPicker';
import { DropDownMenu } from './inputs/DropDownMenu';
import { RadioGroup } from './inputs/RadioGroup';
import { NumericInput } from './inputs/NumericInput';

const PropertyContainer = styled.div`
  margin-bottom: 12px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 4px;
  font-size: 12px;
  color: #666;
`;

interface PropertyFactoryProps {
    config: PropertyConfig;
    onChange: (value: any) => void;
}

export const PropertyFactory: React.FC<PropertyFactoryProps> = memo(({
    config,
    onChange
}) => {
    const renderInput = () => {
        switch (config.type) {
            case 'numeric':
                return (
                    <NumericInput
                        value={config.value}
                        onChange={onChange}
                        options={config.options}
                    />
                );
            case 'color':
                return (
                    <ColorPicker
                        value={config.value}
                        onChange={onChange}
                        options={config.options}
                    />
                );
            case 'dropdown':
                return (
                    <DropDownMenu
                        items={config.options?.items || []}
                        selectedItem={config.value}
                        onSelect={onChange}
                    />
                );
            case 'radio':
                return (
                    <RadioGroup
                        options={config.options?.items || []}
                        value={config.value}
                        onChange={onChange}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <PropertyContainer>
            <Label>{config.label}</Label>
            {renderInput()}
        </PropertyContainer>
    );
});
