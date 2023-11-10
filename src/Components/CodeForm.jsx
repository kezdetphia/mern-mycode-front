import React, { useRef, useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { useCodesContext } from "../hooks/useCodesContext";
import { useAuthContext } from "../hooks/useAuthContext";

const CodeForm = () => {
  const editorRef = useRef(null);
  // Destructure state variables directly
  const { dispatch } = useCodesContext();
  const { user } = useAuthContext();

  // Determine whether the user is logged in
  const isUserLoggedIn = !!user;

  // State for code data and error message
  const [error, setError] = useState();
  const [code, setCode] = useState({
    title: "",
    description: "",
    language: "javascript",
    code: "Your code is here",
  });

  // Function to handle editor mount
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

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

      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_LIVE}/api/codes`,
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
        console.log("res not ok error");
        setError(resJson.error);
      } else {
        console.log("New code added", resJson);
        setError(null);
        dispatch({ type: "CREATE_CODE", payload: resJson });
      }
      // Reset the code state to clear the input fields
      setCode({
        title: "",
        description: "",
        language: "javascript",
        code: "",
    });
  } catch (err) {
    console.log("Error:", err);
  }
};

  const languages = [
    "javascript",
    "python",
    "Java",
    "C#",
    "C++",
    "TypeScript",
    "HTML/CSS",
    "Swift",
    "PHP",
    "Ruby",
    "Go",
    "Kotlin",
    "Rust",
    "Scala",
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
    <div className="sm:m-10 m-5 w-full bg-search rounded-lg p-3  ">
      <div className=" ">
        <div className="flex sm:flex-row flex-col space-y-2 ">
          <select
            className="bg-urllink text-gray-500 justify-center flex items-center py-2 rounded-lg pl-2 mt-2 w-full  "
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
            className="bg-urllink placeholder-gray-500  text-gray-400 rounded-lg pl-2 py-1 sm:ml-2 w-full"
            name="title"
            placeholder="Name"
            value={code.title}
            onChange={handleInputChange}
          />
          <input
            className="bg-urllink placeholder-gray-500  text-gray-400 rounded-lg pl-2 py-1 sm:ml-2 w-full "
            name="description"
            placeholder="Description"
            value={code.description}
            onChange={handleInputChange}
          />
        </div>
        {isUserLoggedIn && (
          <button
            className="bg-mygreen rounded-md px-2 py-1 mt-2  min-w-full"
            onClick={submitCode}
          >
            Save
          </button>
        )}

        <div className="flex   ">
          <Editor
            className="sm:h-[400px] md:h-[400px] xl:h-[750px] h-[150px]"
            name="code"
            value={code.code}
            theme="vs-dark"
            onMount={handleEditorDidMount}
            // path={code.title}
            defaultLanguage="javascript"
            // defaultValue={code.code}
            onChange={(newCode) => setCode({ ...code, code: newCode })}
          />
        </div>
        {error && <div className="text-red-500">{error}</div>}
      </div>
    </div>
  );
};

export default CodeForm;
