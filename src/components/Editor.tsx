import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import grapesjs from 'grapesjs';
import { StylePanel } from './panels/StylePanel';
import { defaultTextStyle } from '../constants/defaultStyles';
import { useComponentSelection } from '../hook/useComponentSelection';
import { setupTextComponents } from '../utils/grapesjs-text-properties';

const EditorContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const GrapesContainer = styled.div`
  flex: 1;
`;

const CustomPanel = styled.div`
  width: 300px;
  background: #f5f5f5;
  border-left: 1px solid #ddd;
  overflow-y: auto;
`;

const BlocksPanel = styled.div`
  padding: 15px;
  border-bottom: 1px solid #ddd;
`;

const Button = styled.button`
  background: #4CAF50;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 5px;
  font-size: 14px;

  &:hover {
    background: #45a049;
  }
`;

const BlockButton = styled(Button)`
  background: #2196F3;
  width: 100%;
  margin-bottom: 10px;

  &:hover {
    background: #1976D2;
  }
`;

export const Editor: React.FC = () => {
    const editorRef = useRef<any>(null);
    const [editor, setEditor] = useState<any>(null);

    const {
        selectedComponent,
        updateComponentStyles,
        getSelectedComponentStyles
    } = useComponentSelection(editor);

    useEffect(() => {
        if (!editorRef.current) {
            const editor = grapesjs.init({
                container: '#gjs',
                height: '100%',
                storageManager: false,
                panels: { defaults: [] },
                styleManager: { sectors: [] },
            });

            editorRef.current = editor;
            setEditor(editor);
            setupTextComponents(editor);

            // İki farklı metin bileşeni oluştur
            const text1 = {
                type: 'text',
                content: 'test text - 1',
                style: {
                    padding: '10px',
                    margin: '10px',
                    'min-height': '50px',
                    'font-size': '72px',
                    'color': '#0000FF', // Mavi
                }
            };

            const text2 = {
                type: 'text',
                content: 'test text - 2',
                style: {
                    padding: '10px',
                    margin: '10px',
                    'min-height': '50px',
                    'font-size': '72px',
                    'color': '#FF0000', // Kırmızı
                }
            };

            // Bileşenleri ekle
            editor.addComponents([text1, text2]);

            // İlk komponenti seç
            const components = editor.getComponents();
            if (components.length > 0) {
                const firstComponent = components.at(0);
                if (firstComponent) {
                    editor.select(firstComponent);
                }
            }
        }
    }, []);

    // Stil değişikliklerini izle
    useEffect(() => {
        if (selectedComponent) {
            const styles = getSelectedComponentStyles();
            console.log('Component styles updated:', styles);
        }
    }, [selectedComponent, getSelectedComponentStyles]);

    const handleBuild = () => {
        if (editorRef.current) {
            const html = editorRef.current.getHtml();
            const css = editorRef.current.getCss();

            // HTML ve CSS'i birleştir
            const fullHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    ${css}
  </style>
</head>
<body>
  ${html}
</body>
</html>`;

            // Yeni pencerede aç
            const win = window.open('', '_blank');
            if (win) {
                win.document.write(fullHtml);
                win.document.close();
            }
        }
    };

    return (
        <EditorContainer>
            <GrapesContainer id="gjs" />
            <CustomPanel>
                <div style={{ padding: '15px' }}>
                    <Button onClick={handleBuild}>
                        Build HTML
                    </Button>
                </div>
                <BlocksPanel id="blocks">
                    <h3>Blocks</h3>
                    <BlockButton onClick={() => {
                        const content = {
                            type: 'text',
                            content: 'Insert your text here',
                            style: {
                                padding: '10px',
                                margin: '10px',
                                'min-height': '50px',
                                'border': '1px dashed #ccc',
                            }
                        };
                        editorRef.current?.addComponents([content]);
                    }}>
                        Add Text Block
                    </BlockButton>
                </BlocksPanel>
                {selectedComponent && (
                    <StylePanel
                        key={selectedComponent.getId()}
                        style={getSelectedComponentStyles()}
                        onStyleChange={updateComponentStyles}
                    />
                )}
            </CustomPanel>
        </EditorContainer>
    );
};