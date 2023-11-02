import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCodesContext } from "../hooks/useCodesContext";
import Editor from "@monaco-editor/react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import { BsFillTrashFill } from "react-icons/bs";

import { useNavigate } from "react-router-dom";


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

        console.log(user.token);

        if (response.ok) {
          const codeData = await response.json();
          setCode(codeData);
        } else {
          console.log('code not found');
          // Handle error when code is not found
        }
      } catch (error) {
        console.error("Erro fetching code: ", error)
      }
    };

    fetchCodeDetails();
  }, [id, user.token, dispatch]);


  const handleClick = async () => {
    if (!user) {
      // Handle the case when the user is not authenticated
      console.log("User is not authenticated");
      return;
    }

    try {
      console.log(code._id);
      const res = await fetch(`http://localhost:4000/api/codes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      console.log(user.token);

      if (res.ok) {
        const resDatas = await res.json();
        dispatch({ type: "DELETE_CODE", payload: resDatas });
        console.log("New code deleted", resDatas);

        // Redirect the user back to the HomeCode page
        navigate("/");
      } else {
        console.error("Delete failed with status: ", res.statusText);
      }
    } catch (err) {
      console.log("Error deleting code:", err);
    }
  };

  return (
    <div>
      {code ? (
        <div className=" h-screen m-10">
          <div className="w-full  bg-search text-gray-300 rounded-md">
            <div className="flex py-2 justify between">
              <div className="flex pl-3 ">
                <span>{code.language}</span>
                <span className="">{code.title}</span>
              </div>

              <div className="flex ">
                <span className="text-gray-300 pr-4">
                  {formatDistanceToNow(new Date(code.createdAt), {
                    addSuffix: true,
                  })}
                </span>
                <button className="pr-4" onClick={handleClick}>
                  <BsFillTrashFill />
                </button>
              </div>
            </div>

            <p className="pl-3 pb-1">{code.description}</p>
          </div>

          <div className="  ">
            <Editor
              className="h-[600px]   "
              theme="vs-dark"
              path={code.title}
              defaultLanguage={code.language}
              defaultValue={code.code}
            />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CodeDetail;
