import { BsFillTrashFill } from "react-icons/bs";
import { useCodesContext } from "../hooks/useCodesContext";
import { useAuthContext } from "../hooks/useAuthContext";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

import Editor from "@monaco-editor/react";
import { useState, useRef } from "react";



const CodeDetails = ({ code }) => {
  const { dispatch } = useCodesContext();
  const { user } = useAuthContext();

  const [codeValue, setCodeValue] = useState([])
    const [error, setError] = useState("");

  const handleClick = async () => {
    // if no user don't even bother executing
    if (!user) return;

    try {
      console.log(code._id);
      // `https://mern-code-back.onrender.com/api/code/${code._id}`,
      const res = await fetch(
        `http://localhost:4000/api/codes/${code._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
        console.log(user.token)
      if (res.ok) {
        const resDatas = await res.json();
        console.log('thisis the id', resDatas)
        dispatch({ type: "DELETE_CODE", payload: resDatas });
        console.log("New code deleted", resDatas);
      } else {
        console.error(
          "Delete failed with status: ",
          res.status,
          res.statusText
        );
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };


  // editor setup
  const [codeEdit, setCodeEdit] = useState({
    title: code.title,
    description: code.description,
    language: code.language,
    code: code.code,
  });

  const editorRef = useRef(null);

  function handleEditorDidMount(editorEdit, monaco) {
    editorRef.current = editorEdit;
  }

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setCodeEdit({ ...code, [name]: value });
  // };

  // const getEditorValue = async () => {
  //   const codeEdit = {
  //     ...code,
  //     code: editorRef.current.getValue(),
  //   };
  //   setCodeEdit(codeEdit);

    // try {
    //   if (!user) {
    //     setError("You must be logged in");
    //     return;
    //   }
    //   const res = await fetch(
    //     "http://localhost:4000/api/codes",
    //     // `https://mern-code-back.onrender.com/api/codes`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${user.token}`,
    //       },
    //       body: JSON.stringify(codeEdit),
    //     }
    //   );
    //   const resJson = await res.json();

    //   if (!res.ok) {
    //     console.log("res not ok error");
    //     setError(resJson.error);
    //   }
    //   if (res.ok) {
    //     console.log("New code added", resJson);
    //     setError(null);
    //     dispatch({ type: "CREATE_CODE", payload: resJson });
    //   } else {
    //     console.error("Request failed with status: ", res.status);
    //   }
    // } catch (err) {
    //   console.log("Error:", err);
    // }

  //   console.log("Updated Code:", codeEdit);
  // };


  return (
    <div className="flex flex-col px-5 w-full transform scale-100 hover:scale-105 transition-transform duration-300 ease-in-out">
      <div className="flex bg-cardbg mb-3 rounded-md">
        <div className="px-8 my-5 w-full ">
          <div className="flex justify-between w-full ">
            <h4 className="text-secondary font-bold pb-3 pr-3">{code.title}</h4>
            <button onClick={handleClick}>
              <BsFillTrashFill />
            </button>
          </div>
          
        <Editor
          height="400px"
          width="400px"
          theme="vs-dark"
          onMount={handleEditorDidMount}
          path={code.title}
          defaultLanguage={code.language}
          defaultValue={code.code}
        />
        </div>
      </div> 
    </div>
  );
};

export default CodeDetails;
