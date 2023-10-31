import Editor from '@monaco-editor/react'
import { useState, useRef } from 'react';


const EditorPage = () => {

    const files = {
      "script.js": {
        name: "script.js",
        language: "javascript",
        value: "Here is some JS text",
      },
      "index.html": {
        name: "index.html",
        language: "html",
        value: "Here is some HTML text",
      },
      "app.js": {
        name: "app.js",
        language: "javascript",
        value: "Here is some JS text",
      },
    };

  const editorRef = useRef(null)
  const [fileName, setFileName] = useState('script.js')
  const file = files[fileName]

  function handleEditorDidMount(editor, monaco){
    editorRef.current = editor
  }

  function getEditorValue(){
    alert(editorRef.current.getValue())
  }

  return (
    <div className="w-full h-full">
      <button onClick={() => setFileName("index.html")}>
        Switch to index.html
      </button>
      <button onClick={() => setFileName("app.js")}>Switch to app.js</button>
      <button onClick={()=>getEditorValue()}>Get Value</button>
      <Editor
        height="400px"
        width="400px"
        theme="vs-dark"
        onMount={handleEditorDidMount}
        path={file.name}
        defaultLanguage={file.language}
        defaultValue={file.value}
      />
    </div>
  );
};

export default EditorPage;