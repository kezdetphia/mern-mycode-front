import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";

import { useCodesContext } from "../hooks/useCodesContext";
import { useAuthContext } from "../hooks/useAuthContext";

const CodeForm = () => {

  const { dispatch } = useCodesContext();
  const { user } = useAuthContext();
  const [error, setError] = useState("");
  const [code, setCode] = useState({
    title: "",
    description: "",
    language: "javascript", // Default language
    code: "Here is some JS text", // Default code
  });

  const editorRef = useRef(null);
  const file = {
    name: code.title,
    language: code.language,
    value: code.code,
  };

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  const getEditorValue =async ()=> {
    const updatedCode = {
      ...code,
      code: editorRef.current.getValue(),
    };
    setCode(updatedCode);

    //code
    try {


      if(!user) {
        setError('You must be logged in')
        return
      }
      
      const res = await fetch(
        "http://localhost:4000/api/code",
        // `https://mern-code-back.onrender.com/api/code`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${user.token}`,
          },
          body: JSON.stringify(code),
        }
      );

      const resJson = await res.json();

      if (!res.ok) {
        setError(resJson.error);
        // setEmptyFields(resJson.emptyFields);
      }

      if (res.ok) {
        
        console.log("new code added", resJson);

        setError(null);
        dispatch({ type: "CREATE_CODE", payload: resJson });
      } else {
        console.error("Request failed with status: ", res.status);
      }
    } catch (err) {
      console.log("Error:", err);
    }

    //code

    console.log("Updated Code:", updatedCode);
  }

  return (
    <div>
      <div className="w-full h-full">
        <button onClick={() => setCode({ ...code, language: "html" })}>
          Switch to HTML
        </button>
        <button onClick={() => setCode({ ...code, language: "javascript" })}>
          Switch to JavaScript
        </button>
        <button onClick={() => getEditorValue()}>Get Value</button>
        File name: {file.name}
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
    </div>
  );
};

export default CodeForm;
