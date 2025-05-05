import React, { useState } from 'react';
import styled from 'styled-components';

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  text-align: left;
  cursor: pointer;
`;

const DropdownList = styled.ul<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  display: ${props => props.isOpen ? 'block' : 'none'};
  margin: 0;
  padding: 0;
  list-style: none;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const DropdownItem = styled.li`
  padding: 8px;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;

interface DropDownMenuProps {
    items: Array<{ value: string; label: string }>;
    selectedItem: string;
    onSelect: (value: string) => void;
}

export const DropDownMenu: React.FC<DropDownMenuProps> = ({
    items,
    selectedItem,
    onSelect
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (value: string) => {
        onSelect(value);
        setIsOpen(false);
    };

    const selectedLabel = items.find(item => item.value === selectedItem)?.label || selectedItem;

    return (
        <DropdownContainer>
            <DropdownButton onClick={() => setIsOpen(!isOpen)}>
                {selectedLabel}
            </DropdownButton>
            <DropdownList isOpen={isOpen}>
                {items.map(item => (
                    <DropdownItem
                        key={item.value}
                        onClick={() => handleSelect(item.value)}
                    >
                        {item.label}
                    </DropdownItem>
                ))}
            </DropdownList>
        </DropdownContainer>
    );
};
