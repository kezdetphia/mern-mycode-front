import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate,  } from "react-router-dom";
// Custom Hooks

import { useAuthContext } from "../hooks/useAuthContext";
import { useCodesContext } from "../hooks/useCodesContext";
// Packages

import Editor from "@monaco-editor/react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { BsFillTrashFill } from "react-icons/bs";

const CodeDetail = () => {
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuthContext();
  const { dispatch } = useCodesContext();
  const [code, setCode] = useState(null);

  useEffect(() => {
    const fetchCodeDetails = async () => {
      if (!user) {
        // Handle the case when the user is not authenticated
        console.log("User is not authenticated");
        return;
      }

      try {
        const response = await fetch(`http://localhost:4000/api/codes/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (response.ok) {
          const codeData = await response.json();
          setCode(codeData);
        } else {
          console.log("Codedata not found! Statuscode:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching the the code data: ", error);
      }
    };
    fetchCodeDetails();
  }, [id, user, dispatch]);

  const handleClick = async () => {
    if (!user) {
      // Handle the case when the user is not authenticated
      console.log("User is not authenticated");
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/codes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.ok) {
        const responseCodes = await response.json();
        dispatch({ type: "DELETE_CODE", payload: responseCodes });
        console.log("New codedata deleted: ", responseCodes);
        // Redirect the user back to the HomeCode page
        navigate("/");
      } else {
        console.error("Delete failed with status: ", response.statusText);
      }
    } catch (err) {
      console.log("Error deleting codedata:", err);
    }
  };

  // Function to handle editor mount
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  // Update editor size when the window is resized
  // useEffect(() => {
  //   const handleResize = () => {
  //     if (editorRef.current) {
  //       const container = editorRef.current.getDomNode().parentElement;
  //       if (container) {
  //         // Calculate the available width and height within the container
  //         const availableWidth = container.clientWidth;
  //         const availableHeight = window.innerHeight - container.offsetTop; // You may adjust this calculation

  //         // Set the editor's dimensions
  //         editorRef.current.layout({
  //           width: availableWidth,
  //           height: availableHeight,
  //         });
  //       }
  //     }
  //   };

  //   // Attach the resize listener
  //   window.addEventListener("resize", handleResize);

  //   // Call it initially to set the correct size
  //   handleResize();

  //   // Clean up the listener when the component unmounts
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  return (
    <main className=" bg-backg flex sm:flex-row flex-col-reverse  sm:mx-0  overflow-scroll">
      <div className="Editor sm:w-3/4 w-full   ">
        {code ? (
          <>
            <div className="TitleBar flex justify-between items-center border border-lightpink shadow-lg text-gray-400 py-2 ">
              <div>
                <span className=" pl-3">{code.language}</span>
                <span className="pl-3">{code.title}</span>
              </div>
              <div>
                <span className="pr-3">
                  {formatDistanceToNow(new Date(code.createdAt), {
                    addSuffix: true,
                  })}
                </span>
                <button className="pr-3" onClick={handleClick}>
                  <BsFillTrashFill />{" "}
                </button>
              </div>
            </div>
            <div className="flex w-full h-screen ">
              <Editor
                className="h-full"
                theme="vs-dark"
                path={code.title}
                defaultLanguage={code.language}
                defaultValue={code.code}
              />
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div className="description sm:w-1/4 w-full border border-lightpink sm:border-transparent  ">
        {code ? (
          <div className="text-gray-400 p-3 text-start">{code.description}</div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </main>
  );
};

export default CodeDetail;
