// Hooks import
import {Link ,useNavigate } from 'react-router-dom'
// Context import
import { useCodesContext } from "../hooks/useCodesContext";
import { useAuthContext } from "../hooks/useAuthContext";
// Embedded code editor import
import Editor from "@monaco-editor/react";
// Icon import
import { BsFillTrashFill } from "react-icons/bs";
// Date format package
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const CodeInfo = ({ code }) => {
  console.log('CodeInfo.jsx render')
  const navigate = useNavigate();
  const { dispatch } = useCodesContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    // if no user don't even bother executing
    if (!user) return;
    // Try deleting the ID of code from database 
    try {
      console.log(code._id);
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_LIVE}/api/codes/${code._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(user.token);
      // If response 200, dispatch the DELETE useReducer function
      if (res.ok) {
        const resDatas = await res.json();
        dispatch({ type: "DELETE_CODE", payload: resDatas });
        console.log("New code deleted", resDatas);
        
        navigate("/");
      } else {
        console.error("Delete failed with status: ", res.statusText);
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const maxDescriptionLength = 30;
  const truncateDescription = (text) => {
    if (text.length <= maxDescriptionLength) {
      return text;
    }
    return text.slice(0, maxDescriptionLength) + " ...";
  };

  return (
    <div className="flex flex-col m-10 mx-5   ">
      <Link to={`/${code._id}`}>
        <div className=" transform scale-100 hover:scale-102 transition-transform duration-300 ease-in-out">
          <div className="w-full  bg-search text-gray-300 rounded-md flex flex-col">
            <div className="flex sm:flex-row flex-col py-2 justify-between">
              <div className="flex pl-3  sm:flex-row flex-col">
                <span>{code.language}</span>
                <span className="sm:pl-3">{code.title}</span>
              </div>

              <div className="flex justify-between ">
                <span className="text-gray-300 sm:pr-4 pl-3 sm:pl-0 ">
                  {formatDistanceToNow(new Date(code.createdAt), {
                    addSuffix: true,
                  })}
                </span>
                <button className="pr-4" onClick={handleClick}>
                  <BsFillTrashFill />
                </button>
              </div>
            </div>

            <p className="pl-3 pb-1">{truncateDescription(code.description)}</p>
          </div>

          <div className="  ">
            <Editor
              className="h-40   "
              theme="vs-dark"
              // onMount={handleEditorDidMount}
              path={code.title}
              defaultLanguage={code.language}
              defaultValue={code.code}
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CodeInfo;
