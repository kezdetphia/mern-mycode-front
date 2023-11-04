import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// Custom Hooks

import { useAuthContext } from "../hooks/useAuthContext";
import { useCodesContext } from "../hooks/useCodesContext";
// Packages

import Editor from "@monaco-editor/react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { BsFillTrashFill } from "react-icons/bs";

const CodeDetail = () => {
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

  return (
    <main className=" bg-backg flex">
      <div className="Editor w-3/4 border border-lightpink shadow-lg ">
        {code ? (
          <>
            <div className="TitleBar flex justify-between items-center border border-lightpink shadow-lg text-gray-400 sm:py-2 ">
              <div>
                <span className=" sm:ml-3">{code.language}</span>
                <span className=" sm:ml-3">{code.title}</span>
              </div>
              <div>
                <span className=" sm:mr-3">
                  {formatDistanceToNow(new Date(code.createdAt), {
                    addSuffix: true,
                  })}
                </span>
                <button className="sm:mr-3" onClick={handleClick}>
                  <BsFillTrashFill />{" "}
                </button>
              </div>
            </div>

            <Editor
              className="h-screen"
              theme="vs-dark"
              path={code.title}
              defaultLanguage={code.language}
              defaultValue={code.code}
            />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div className="description w-1/4   border border-lightpink shadow-lg  ">
        {code ? 


        <div className="text-gray-400 sm:m-2">
          {code.description}
          </div> 




        :
         <p>Loading...</p>}
      </div>
    </main>
  );
};

export default CodeDetail;
