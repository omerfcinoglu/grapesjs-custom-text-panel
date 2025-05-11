import React from 'react';
import styled from 'styled-components';
import { ComponentStyles } from '../../types/StyleProperties';
import { styleRegistry } from '../../registry/StyleRegistry';

const PanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
`;

const CategoryTabs = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  background: #fff;
  position: sticky;
  top: 0;
`;

interface TabProps {
    active: boolean;
}

const Tab = styled.button<TabProps>`
  padding: 12px 16px;
  border: none;
  background: none;
  cursor: pointer;
  border-bottom: 2px solid ${props => props.active ? '#2196F3' : 'transparent'};
  color: ${props => props.active ? '#2196F3' : '#666'};
  font-weight: ${props => props.active ? '600' : '400'};
  
  &:hover {
    background: #f5f5f5;
  }
`;

interface StylePanelManagerProps {
    styles: ComponentStyles;
    onStyleChange: (categoryId: string, key: string, value: any) => void;
}

export const StylePanelManager: React.FC<StylePanelManagerProps> = ({
    styles,
    onStyleChange
}) => {
    const [activeCategory, setActiveCategory] = React.useState<string>('');
    const categories = styleRegistry.getAllCategories();

    React.useEffect(() => {
        if (categories.length > 0 && !activeCategory) {
            setActiveCategory(categories[0].id);
        }
    }, [categories, activeCategory]);

    const activePanel = activeCategory ? styleRegistry.getPanel(activeCategory) : null;

    return (
        <PanelContainer>
            <CategoryTabs>
                {categories.map(category => (
                    <Tab
                        key={category.id}
                        active={category.id === activeCategory}
                        onClick={() => setActiveCategory(category.id)}
                    >
                        {category.icon && <span className="material-icons">{category.icon}</span>}
                        {category.label}
                    </Tab>
                ))}
            </CategoryTabs>

            {activePanel && (
                <activePanel.component
                    properties={styles.categories[activeCategory] || {}}
                    onChange={(key, value) => onStyleChange(activeCategory, key, value)}
                />
            )}
        </PanelContainer>
    );
}; 