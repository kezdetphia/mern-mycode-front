import React, { useRef, useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { useCodesContext } from "../hooks/useCodesContext";
import { useAuthContext } from "../hooks/useAuthContext";

const CodeForm = () => {
  const editorRef = useRef(null);

  // Destructure state variables directly
  const { dispatch } = useCodesContext();
  const { user } = useAuthContext();

  // State for code data and error message
  const [error, setError] = useState();
  const [code, setCode] = useState({
    title: "",
    description: "",
    language: "",
    code: "Your code is here",
  });

  // Function to handle editor mount
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  // Update editor size when the window is resized
  useEffect(() => {
    const handleResize = () => {
      if (editorRef.current) {
        const container = editorRef.current.getDomNode().parentElement;
        if (container) {
          // Calculate the available width and height within the container
          const availableWidth = container.clientWidth;
          const availableHeight = window.innerHeight - container.offsetTop; // You may adjust this calculation

          // Set the editor's dimensions
          editorRef.current.layout({
            width: availableWidth,
            height: availableHeight,
          });
        }
      }
    };

    // Attach the resize listener
    window.addEventListener("resize", handleResize);

    // Call it initially to set the correct size
    handleResize();

    // Clean up the listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Function to update code data when input fields change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCode({ ...code, [name]: value });
  };

  // Function to submit code
  const submitCode = async () => {
    try {
      if (!user) {
        setError("You must be logged in");
        return;
      }

      const updatedCode = {
        ...code,
        code: editorRef.current.getValue(),
      };

      const res = await fetch("http://localhost:4000/api/codes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(updatedCode),
      });
      const resJson = await res.json();

      if (!res.ok) {
        console.log("res not ok error");
        setError(resJson.error);
      } else {
        console.log("New code added", resJson);
        setError(null);
        dispatch({ type: "CREATE_CODE", payload: resJson });
        // Reset the code state to clear the input fields
        setCode({
          title: "",
          description: "",
          language: "",
          code: "",
        });
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };

  // Determine whether the user is logged in
  const isUserLoggedIn = !!user;

  const languages = [
    "Java",
    "PHP",
    "Python",
    "JavaScript",
    "C++",
    "C#",
    "Ruby",
    "Swift",
    "Go",
    "Kotlin",
    "Rust",
    "TypeScript",
    "Scala",
    "HTML/CSS",
    "SQL",
    "Bash/Shell scripting",
    "MATLAB",
    "R",
    "Perl",
    "Dart (for Flutter)",
    "Objective-C",
    "Assembly language",
    "COBOL",
    "Lua",
    "Groovy",
    "VHDL",
    "Ada",
    "Fortran",
    "Prolog",
    "Lisp",
  ];

  return (
    <div>
      <div className="w-full h-full">
        <label>Choose a language</label>
        <select
          name="language"
          // placeholder="Language"
          value={code.language}
          onChange={handleInputChange}
        >
          {languages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>

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

        {isUserLoggedIn && (
          <button
            className="bg-mygreen rounded-md px-2 py-1"
            onClick={submitCode}
          >
            Save
          </button>
        )}

        <div className="relative w-full h-screen">
          <Editor
           
            theme="vs-dark"
            onMount={handleEditorDidMount}
            path={code.title}
            defaultLanguage={code.language}
            defaultValue={code.code}
          />
        </div>
        {error && <div className="text-red-500">{error}</div>}
      </div>
    </div>
  );
};

export default CodeForm;
