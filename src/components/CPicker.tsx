import React, { useState } from 'react'
import ColorPicker from 'react-best-gradient-color-picker'

export function CPicker() {
  const [color, setColor] = useState('rgba(255,255,255,1)');

  return <ColorPicker value={color} onChange={setColor} />
}