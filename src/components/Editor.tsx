import React, { useEffect, useRef, useState } from 'react';
import grapesjs from 'grapesjs';
import type { Editor as GrapesEditor } from 'grapesjs';
import styled from 'styled-components';
import { TextStyle } from '../types/TextProperties';
import { StylePanel } from './panels/StylePanel';

const EditorContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const GrapesContainer = styled.div`
  flex: 1;
  position: relative;
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
    const editorRef = useRef<GrapesEditor | null>(null);
    const [selectedComponent, setSelectedComponent] = useState<any>(null);
    const [textStyle, setTextStyle] = useState<TextStyle>({
        character: {
            fontSize: '16px',
            fontWeight: 'normal',
            fontFamily: 'Arial',
        },
        fill: {
            color: '#000000',
            opacity: 1,
        },
        stroke: {
            width: 0,
            color: '#000000',
            opacity: 1,
        },
        shadow: {
            offsetX: 0,
            offsetY: 0,
            blur: 0,
            color: '#000000',
            opacity: 1,
        },
    });

    useEffect(() => {
        if (!editorRef.current) {
            editorRef.current = grapesjs.init({
                container: '#gjs',
                height: '100%',
                storageManager: false,
                panels: { defaults: [] },
                styleManager: { sectors: [] },
                blockManager: {
                    appendTo: '#blocks',
                },
                plugins: [],
            });

            // Text bloğunu tanımla
            editorRef.current.BlockManager.add('text-block', {
                label: 'Text Block',
                content: {
                    type: 'text',
                    content: 'Insert your text here',
                    style: {
                        padding: '10px',
                        margin: '10px',
                        'min-height': '50px',
                        'border': '1px dashed #ccc',
                    }
                }
            });

            editorRef.current.on('component:selected', (component) => {
                setSelectedComponent(component);
                if (component && component.is('text')) {
                    const style = component.getStyle();
                    setTextStyle({
                        character: {
                            fontSize: style['font-size'] || '16px',
                            fontWeight: style['font-weight'] || 'normal',
                            fontFamily: style['font-family'] || 'Arial',
                        },
                        fill: {
                            color: style['color'] || '#000000',
                            opacity: style['opacity'] ? parseFloat(style['opacity']) : 1,
                        },
                        stroke: {
                            width: style['-webkit-text-stroke-width'] ?
                                parseInt(style['-webkit-text-stroke-width']) : 0,
                            color: style['-webkit-text-stroke-color'] || '#000000',
                            opacity: 1,
                        },
                        shadow: {
                            offsetX: style['text-shadow'] ?
                                parseInt(style['text-shadow'].split('px')[0]) : 0,
                            offsetY: style['text-shadow'] ?
                                parseInt(style['text-shadow'].split('px')[1]) : 0,
                            blur: style['text-shadow'] ?
                                parseInt(style['text-shadow'].split('px')[2]) : 0,
                            color: style['text-shadow'] ?
                                style['text-shadow'].split(' ')[3] : '#000000',
                            opacity: 1,
                        },
                    });
                } else {
                    setSelectedComponent(null);
                    setTextStyle({
                        character: {
                            fontSize: '16px',
                            fontWeight: 'normal',
                            fontFamily: 'Arial',
                        },
                        fill: {
                            color: '#000000',
                            opacity: 1,
                        },
                        stroke: {
                            width: 0,
                            color: '#000000',
                            opacity: 1,
                        },
                        shadow: {
                            offsetX: 0,
                            offsetY: 0,
                            blur: 0,
                            color: '#000000',
                            opacity: 1,
                        },
                    });
                }
            });

            editorRef.current.on('component:deselected', () => {
                setSelectedComponent(null);
                setTextStyle({
                    character: {
                        fontSize: '16px',
                        fontWeight: 'normal',
                        fontFamily: 'Arial',
                    },
                    fill: {
                        color: '#000000',
                        opacity: 1,
                    },
                    stroke: {
                        width: 0,
                        color: '#000000',
                        opacity: 1,
                    },
                    shadow: {
                        offsetX: 0,
                        offsetY: 0,
                        blur: 0,
                        color: '#000000',
                        opacity: 1,
                    },
                });
            });
        }

        return () => {
            if (editorRef.current) {
                editorRef.current.destroy();
                editorRef.current = null;
            }
        };
    }, []);

    const handleStyleChange = (newStyle: TextStyle) => {
        setTextStyle(newStyle);
        if (selectedComponent && selectedComponent.is('text')) {
            const style = {
                'font-size': newStyle.character.fontSize,
                'font-weight': newStyle.character.fontWeight,
                'font-family': newStyle.character.fontFamily,
                'color': newStyle.fill.color,
                'opacity': newStyle.fill.opacity,
                '-webkit-text-stroke-width': `${newStyle.stroke.width}px`,
                '-webkit-text-stroke-color': newStyle.stroke.color,
                'text-shadow': `${newStyle.shadow.offsetX}px ${newStyle.shadow.offsetY}px ${newStyle.shadow.blur}px ${newStyle.shadow.color}`,
            };
            selectedComponent.setStyle(style);
        }
    };

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
                {selectedComponent && selectedComponent.is('text') && (
                    <StylePanel
                        style={textStyle}
                        onStyleChange={handleStyleChange}
                    />
                )}

            </CustomPanel>
        </EditorContainer>
    );
}