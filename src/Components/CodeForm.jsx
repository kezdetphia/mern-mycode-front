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
    language: "",
    code: "Your code is here",
  });

  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCode({ ...code, [name]: value });
  };

  const getEditorValue = async () => {
    const updatedCode = {
      ...code,
      code: editorRef.current.getValue(),
    };
    setCode(updatedCode);


    try {
      if (!user) {
        setError("You must be logged in");
        return;
      }
      const res = await fetch(
        "http://localhost:4000/api/codes",
        // `https://mern-code-back.onrender.com/api/codes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(updatedCode),
        }
      );
      const resJson = await res.json();


      if (!res.ok) {
        console.log('res not ok error')
        setError(resJson.error);
      }
      if (res.ok) {
        console.log("New code added", resJson);
        setError(null);
        dispatch({ type: "CREATE_CODE", payload: resJson });
        setCode({
          title: "",
          description: "",
          language: "",
          code: "Your code is here",
        });
      } else {
        console.error("Request failed with status: ", res.status);
      }
    } catch (err) {
      console.log("Error:", err);
    }

    console.log("Updated Code:", updatedCode);
  };

  return (
    <div>
      <div className="w-full h-full">
        <input
          name="language"
          placeholder="Language"
          value={code.language}
          onChange={handleInputChange}
        />
        <input
          name="title"
          placeholder="Name"
          value={code.title}
          onChange={handleInputChange}
        />
        <input
          name="description"
          placeholder="Description"
          value={code.description}
          onChange={handleInputChange}
        />

        <button onClick={() => setCode({ ...code, language: "html" })}>
          Switch to HTML
        </button>

        <button onClick={getEditorValue}>Save</button>

        <Editor
          height="400px"
          width="400px"
          theme="vs-dark"
          onMount={handleEditorDidMount}
          path={code.title}
          defaultLanguage={code.language}
          defaultValue={code.code}
        />
        {error && <div className="text-red-500">{error}</div>}
      </div>
    </div>
  );
};

export default CodeForm;
