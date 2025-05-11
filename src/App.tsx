import React from 'react';
import { Editor } from './components/Editor';
import 'grapesjs/dist/css/grapes.min.css';
import { CPicker } from './components/CPicker';

function App() {
  return (
    <div className="App">
      <CPicker />
      <Editor />
    </div>
  );
}

export default App;
